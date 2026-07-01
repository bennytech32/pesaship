'use server';

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";
import { revalidatePath } from 'next/cache';

export async function resolveDispute(txId: string, decision: 'REFUNDED' | 'COMPLETED') {
  const session = await getServerSession(authOptions);

  // Force the transaction status to the Admin's final decision
  await prisma.transaction.update({
    where: { id: txId },
    data: { status: decision }
  });

  // Refresh the dashboard to clear the queue
  revalidatePath('/admin');
}