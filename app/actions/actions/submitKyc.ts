'use server';

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/options";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';

export async function submitKyc(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.email) {
    throw new Error("Unauthorized");
  }

  const nidaNumber = formData.get('nidaNumber') as string;

  if (!nidaNumber || nidaNumber.length < 10) {
    throw new Error("Invalid NIDA Number");
  }

  // Find the user and update their status to PENDING
  await prisma.user.update({
    where: { email: session.user.email },
    data: { 
      nidaNumber: nidaNumber,
      kycStatus: 'PENDING' 
    }
  });

  // Clear cache and send them back to the dashboard
  revalidatePath('/dashboard');
  revalidatePath('/admin');
  redirect('/dashboard');
}