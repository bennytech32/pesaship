'use server';

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/options";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';

export async function markAsShipped(txId: string) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  });

  if (!user) throw new Error("User not found");

  const tx = await prisma.transaction.findUnique({ where: { id: txId } });

  if (!tx) throw new Error("Transaction not found");
  if (tx.sellerId !== user.id) throw new Error("Only the Seller can update the shipping status.");
  if (tx.status !== "PAID") throw new Error("Cannot ship until the buyer has locked the funds in escrow.");

  // Update the transaction status to SHIPPED
  await prisma.transaction.update({
    where: { id: txId },
    data: { status: "SHIPPED" }
  });

  // Refresh the data and send the user back to the Deal page
  revalidatePath('/dashboard');
  revalidatePath(`/deal/${txId}`);
  redirect(`/deal/${txId}`);
}