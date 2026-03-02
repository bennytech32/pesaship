import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth"; 

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { amount, description, role } = body; 
    const userId = (session.user as any).id; 

    const numericAmount = parseFloat(amount);
    const fee = numericAmount * 0.025;
    
    // If you are buying, you pay the fee. If you are selling, the fee is deducted from your payout.
    const total = role === 'buyer' ? numericAmount + fee : numericAmount - fee;

    const escrow = await prisma.transaction.create({
      data: {
        amount: numericAmount,
        fee,
        total,
        description,
        status: 'PENDING',
        // MAGIC HAPPENS HERE: Assign ID based on the role they picked
        buyerId: role === 'buyer' ? userId : null,
        sellerId: role === 'seller' ? userId : null,
      },
    });

    return NextResponse.json({ success: true, escrowId: escrow.id });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}