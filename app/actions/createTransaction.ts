"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTransaction(formData: FormData) {
  try {
    // 1. Hakikisha mtumiaji ameingia (Logged in)
    const session = await auth();
    if (!session || !session.user?.email) {
      return { success: false, error: "Tafadhali ingia kwenye akaunti kwanza (Login)." };
    }

    // 2. Mtafute muuzaji kwenye Neon DB
    const seller = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!seller || seller.role !== "SELLER") {
      return { success: false, error: "Akaunti za wauzaji pekee ndizo zinazoweza kutengeneza link ya malipo." };
    }

    // 3. Daka taarifa kutoka kwenye fomu ya /create
    const amountStr = formData.get("amount") as string;
    const description = formData.get("description") as string;
    // (Email ya mnunuzi tunaweza kuiacha kwa sasa, maana atajiunga kwa kubonyeza link)
    
    if (!amountStr || !description) {
      return { success: false, error: "Tafadhali jaza kiasi na maelezo ya biashara." };
    }

    const amount = parseFloat(amountStr);
    if (amount < 1000) {
      return { success: false, error: "Kiasi cha chini cha muamala ni TZS 1,000." };
    }

    // 4. Piga hesabu za makato (2.5% Escrow Fee)
    const fee = amount * 0.025; 
    const total = amount; 

    // 5. Tengeneza muamala kwenye kanzidata (Neon)
    const newTx = await prisma.transaction.create({
      data: {
        description,
        amount,
        fee,
        total,
        status: "AWAITING_PAYMENT",
        sellerId: seller.id,
        // MUHIMU SANA: Hatuweki buyerId hapa. Mnunuzi atajiunga akibonyeza link!
      }
    });

    // 6. Fanya refresh ya dashboard ili ionyeshe muamala mpya mara moja
    revalidatePath("/dashboard/seller");

    return { 
      success: true, 
      transactionId: newTx.id,
      message: "Link imetengenezwa kikamilifu!" 
    };

  } catch (error: any) {
    console.error("KOSA LA KUTENGENEZA MUAMALA:", error);
    return { 
      success: false, 
      error: "Kuna changamoto ya kimtandao. Tafadhali jaribu tena." 
    };
  }
}