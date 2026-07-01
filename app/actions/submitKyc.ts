"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitKyc(formData: FormData) {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return { success: false, error: "Tafadhali ingia kwenye akaunti kwanza." };
    }

    const kycType = formData.get("kycType") as string;
    
    // Hapa kwenye mfumo halisi ungepokea mafaili (picha za NIDA/Leseni) 
    // na kuzi-upload kwenye AWS S3 au Cloudinary, kisha kuhifadhi link zake.
    // Kwa sasa tunasasisha status kwenye database kuwa PENDING.

    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        kycStatus: "PENDING", // Inasubiri admin apitishe
        // Unaweza kuongeza fields kwenye schema yako kama nidaNumber, tinNumber nk.
      }
    });

    revalidatePath("/dashboard/kyc");
    revalidatePath("/dashboard/seller");
    
    return { success: true, message: `Taarifa zako za ${kycType} zimepokelewa kikamilifu. Zinasubiri uhakiki.` };

  } catch (error) {
    console.error("KYC SUBMIT ERROR:", error);
    return { success: false, error: "Kuna changamoto ya kimtandao. Tafadhali jaribu tena." };
  }
}