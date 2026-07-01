"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function releaseFunds(transactionId: string) {
  try {
    const session = await auth();
    if (!session || !session.user?.email) return { success: false, error: "Unauthenticated" };

    const buyer = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!buyer || buyer.role !== "BUYER") return { success: false, error: "Unauthorized" };

    const tx = await prisma.transaction.findUnique({ where: { id: transactionId } });
    if (!tx || tx.buyerId !== buyer.id) return { success: false, error: "Transaction not found or unauthorized." };

    if (tx.status !== "PAID" && tx.status !== "SHIPPED") {
      return { success: false, error: "You can only release funds for active orders." };
    }

    // UPDATE: Pesa imeachiwa, muamala umekamilika!
    await prisma.transaction.update({
      where: { id: transactionId },
      data: { status: "COMPLETED" },
    });

    // Refresh kurasa zote za Mnunuzi na Muuzaji
    revalidatePath("/dashboard/buyer");
    revalidatePath("/dashboard/seller");

    return { success: true };
  } catch (error) {
    console.error("RELEASE FUNDS ERROR:", error);
    return { success: false, error: "Server error occurred." };
  }
}