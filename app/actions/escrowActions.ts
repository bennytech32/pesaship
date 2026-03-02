'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// Action 1: Buyer makes the deposit
export async function markAsDeposited(transactionId: string) {
  try {
    await prisma.transaction.update({
      where: { id: transactionId },
      data: { status: 'DEPOSITED' }
    });
    
    // This tells Next.js to instantly refresh the dashboard to show the new status!
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error("Payment Error:", error);
    return { success: false };
  }
}