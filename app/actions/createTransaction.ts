'use server';

import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth"; 
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

/**
 * Creates a new Escrow Transaction in Neon Postgres
 * and redirects the user to their Dashboard.
 */
export async function createTransaction(formData: FormData) {
  // 1. Get current session
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    throw new Error("You must be logged in to create a transaction.");
  }

  // 2. Extract and Validate Form Data
  const userId = (session.user as any).id;
  const description = formData.get('description') as string;
  const rawAmount = formData.get('amount') as string;
  const role = formData.get('role') as string;

  if (!description || !rawAmount || !role) {
    throw new Error("Please fill in all fields.");
  }

  const amount = parseFloat(rawAmount);
  
  // 3. Fee Calculation (2.5% as per PesaShip landing page)
  const fee = amount * 0.025;
  
  // Rule: If Buyer creates, they pay the fee on top. 
  // If Seller creates, the fee is deducted from what they eventually receive.
  const total = role === 'buyer' ? amount + fee : amount;

  try {
    // 4. Save to Neon Database
    await prisma.transaction.create({
      data: {
        description,
        amount,
        fee,
        total,
        status: "PENDING",
        buyerId: role === 'buyer' ? userId : null,
        sellerId: role === 'seller' ? userId : null,
      }
    });

    // 5. Clear Cache so the Dashboard shows the new deal immediately
    revalidatePath('/dashboard');

  } catch (error) {
    console.error("Database Save Error:", error);
    // In a real app, you might return an error object here
    throw new Error("Failed to save transaction to database.");
  }

  // 6. Send them home
  redirect('/dashboard');
}