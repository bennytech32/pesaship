'use server';

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/options";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';

export async function rejectItem(txId: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) throw new Error("User not found");

  const tx = await prisma.transaction.findUnique({ where: { id: txId } });
  if (!tx || tx.buyerId !== user.id) throw new Error("Only the buyer can reject the item.");
  if (tx.status !== "SHIPPED") throw new Error("Item has not been shipped yet.");

  // Grab the reason the buyer typed into the form
  const reason = formData.get('rejectionReason') as string;
  if (!reason) throw new Error("A reason for rejection is required.");

  // Update status to REJECTED and save the reason for the Admin
  await prisma.transaction.update({
    where: { id: txId },
    data: { 
      status: "REJECTED",
      rejectionReason: reason
    }
  });

  revalidatePath('/dashboard');
  revalidatePath(`/deal/${txId}`);
  redirect(`/deal/${txId}`);
}