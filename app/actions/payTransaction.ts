"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function payTransaction(transactionId: string) {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return { success: false, error: "Tafadhali ingia kwenye akaunti." };
    }

    const buyerUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!buyerUser) return { success: false, error: "Akaunti haipatikani." };

    const tx = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!tx) return { success: false, error: "Muamala haupo." };

    // Hakikisha huyu ndiye mnunuzi halali wa huu muamala
    if (tx.buyerId !== buyerUser.id) {
      return { success: false, error: "Huna ruhusa ya kulipia muamala huu." };
    }

    if (tx.status !== "AWAITING_PAYMENT") {
      return { success: false, error: "Muamala huu tayari umeshalipiwa au umekamilika." };
    }

    // UPDATE DATABASE: Badilisha status kuwa "PAID" (Pesa Zimefungwa Escrow)
    await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: "PAID",
      },
    });

    // Fanya refresh ya ukurasa huu na dashboard
    revalidatePath(`/tx/${transactionId}`);
    revalidatePath("/dashboard/buyer");
    revalidatePath("/dashboard/seller");

    return { success: true, message: "Malipo yamefanikiwa! Pesa zipo salama." };

  } catch (error) {
    console.error("PAYMENT ERROR:", error);
    return { success: false, error: "Kuna shida ya kimtandao wakati wa malipo." };
  }
}