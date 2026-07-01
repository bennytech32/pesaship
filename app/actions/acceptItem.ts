'use server';

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/options";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';

export async function acceptItem(txId: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) throw new Error("User not found");

  const tx = await prisma.transaction.findUnique({ where: { id: txId } });
  if (!tx || tx.buyerId !== user.id) throw new Error("Only the buyer can accept the item.");
  if (tx.status !== "SHIPPED") throw new Error("Item has not been shipped yet.");

  // Update status to COMPLETED (Funds Released)
  await prisma.transaction.update({
    where: { id: txId },
    data: { status: "COMPLETED" }
  });

  revalidatePath('/dashboard');
  revalidatePath(`/deal/${txId}`);
  redirect(`/deal/${txId}`);
}