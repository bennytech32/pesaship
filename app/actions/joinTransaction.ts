"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function joinTransaction(transactionId: string) {
  try {
    // 1. Hakikisha mnunuzi amefanya login
    const session = await auth();
    if (!session || !session.user?.email) {
      return { success: false, error: "You must be logged in to accept this escrow deal." };
    }

    // 2. Tafuta huyu mnunuzi kwenye kanzidata wetu
    const buyerUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!buyerUser) {
      return { success: false, error: "User account not found." };
    }

    // Usalama: Mnunuzi asiruhusiwe kujiunga kama yeye ni Seller
    if (buyerUser.role !== "BUYER") {
      return { success: false, error: "Only accounts registered as BUYERS can secure escrow deals." };
    }

    // 3. Vuta muamala wenyewe kuona kama upo na hauna mnunuzi mwingine tayari
    const existingTx = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!existingTx) {
      return { success: false, error: "This transaction link is invalid or has expired." };
    }

    if (existingTx.buyerId) {
      return { success: false, error: "This deal has already been secured by another buyer." };
    }

    // Usalama zaidi: Muuzaji asijiunge kwenye deal lake mwenyewe
    if (existingTx.sellerId === buyerUser.id) {
      return { success: false, error: "You cannot join your own escrow transaction." };
    }

    // 4. Update muamala: Unganisha mnunuzi (buyerId)
    await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        buyerId: buyerUser.id,
        status: "AWAITING_PAYMENT", // Badilisha kwenda hatua ya kusubiri malipo
      },
    });

    revalidatePath(`/tx/${transactionId}`);
    revalidatePath("/dashboard/buyer");

    return { success: true, message: "Successfully joined the escrow deal!" };

  } catch (error: any) {
    console.error("JOIN TRANSACTION ERROR:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}