'use server';

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // <-- Njia sahihi tumeweka hapa
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';

export async function submitKyc(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.email) {
    throw new Error("Unauthorized: Tafadhali ingia kwenye akaunti kwanza.");
  }

  const nidaNumber = formData.get('nidaNumber') as string;

  if (!nidaNumber || nidaNumber.length < 10) {
    throw new Error("Namba ya NIDA sio sahihi. Tafadhali hakiki tena.");
  }

  // Tunamtafuta mtumiaji na kubadilisha hadhi yake kuwa PENDING (Inasubiri)
  await prisma.user.update({
    where: { email: session.user.email },
    data: { 
      nidaNumber: nidaNumber,
      kycStatus: 'PENDING' 
    }
  });

  // Tunasafisha cache ili mabadiliko yaonekane mara moja, kisha tunamrudisha Dashboard
  revalidatePath('/dashboard');
  revalidatePath('/admin');
  redirect('/dashboard');
}