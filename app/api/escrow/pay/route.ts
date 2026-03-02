import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Fixed the typo here
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // 1. Check if user is logged in
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { transactionId } = await req.json();

    // 2. Find the transaction in Neon Database
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    // 3. Update status to 'PAID' (Simulating a successful payment)
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { status: "PAID" },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Payment successful. Funds are now locked in escrow.",
      transaction: updatedTransaction 
    });

  } catch (error) {
    console.error("Payment API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}