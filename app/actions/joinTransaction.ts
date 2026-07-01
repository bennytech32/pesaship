"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function joinTransaction(transactionId: string) {
  // 1. Hakikisha mtu amefanya login
  const session = await auth();
  if (!session || !session.user?.email) {
    throw new Error("Tafadhali ingia kwenye akaunti yako (Login) kwanza.");
  }

  // 2. Tafuta huyu mtu kwenye kanzidata
  const buyerUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!buyerUser) {
    throw new Error("Akaunti yako haijapatikana kwenye mfumo.");
  }

  // USALAMA 1: Lazima awe Mnunuzi (BUYER)
  if (buyerUser.role !== "BUYER") {
    throw new Error("ZUIO: Akaunti yako ni ya MUUZAJI (SELLER). Kujiunga na kulipa, lazima utumie akaunti ya MNUNUZI (BUYER).");
  }

  // 3. Vuta muamala wenyewe
  const existingTx = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!existingTx) {
    throw new Error("Mwamala huu haupo au link imeshatumika.");
  }

  // USALAMA 2: Kama tayari una mnunuzi
  if (existingTx.buyerId) {
    throw new Error("Mwamala huu umeshachukuliwa na mnunuzi mwingine tayari.");
  }

  // USALAMA 3: Muuzaji asijiunge kwenye deal lake mwenyewe
  if (existingTx.sellerId === buyerUser.id) {
    throw new Error("ZUIO: Huwezi kujiunga kama mnunuzi kwenye mwamala wako mwenyewe ulioutengeneza!");
  }

  // 4. Update muamala: Unganisha mnunuzi na badili status
  await prisma.transaction.update({
    where: { id: transactionId },
    data: {
      buyerId: buyerUser.id,
      status: "AWAITING_PAYMENT", 
    },
  });

  // Safisha Cache zote
  revalidatePath(`/deal/${transactionId}`);
  revalidatePath(`/tx/${transactionId}`); // Nimeongeza na hii incase unatumia /tx/
  revalidatePath("/dashboard/buyer");

  // 5. MPELEKE KWENYE MALIPO MOJA KWA MOJA (Tumia /tx/ kama folda lako linaitwa tx)
  redirect(`/tx/${transactionId}`); 
}