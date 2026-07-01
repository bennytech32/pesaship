'use server';

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";
import { revalidatePath } from 'next/cache';

export async function approveKyc(userId: string) {
  const session = await getServerSession(authOptions);
  
  // Update the user's KYC status to APPROVED and verify them
  await prisma.user.update({
    where: { id: userId },
    data: { 
      kycStatus: 'APPROVED',
      isVerified: true 
    }
  });

  // Refresh the admin dashboard so the user disappears from the queue
  revalidatePath('/admin');
}