import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // 1. Hakikisha mtumiaji amesha-login
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, error: "Tafadhali ingia kwenye akaunti kwanza. (Unauthorized)" },
        { status: 401 }
      );
    }

    // 2. Pokea Transaction ID kutoka kwenye Request Body
    const body = await req.json();
    const { transactionId } = body;

    if (!transactionId) {
      return NextResponse.json(
        { success: false, error: "Transaction ID inahitajika." },
        { status: 400 }
      );
    }

    // 3. Mtafute Mnunuzi kwenye Database
    const buyerUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!buyerUser) {
      return NextResponse.json(
        { success: false, error: "Akaunti yako haipatikani." },
        { status: 404 }
      );
    }

    // 4. Vuta taarifa za Muamala husika
    const tx = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!tx) {
      return NextResponse.json(
        { success: false, error: "Muamala huu haupatikani." },
        { status: 404 }
      );
    }

    // 5. Ulinzi: Hakikisha huyu ndiye mnunuzi halali aliyeunganishwa na muamala
    if (tx.buyerId !== buyerUser.id) {
      return NextResponse.json(
        { success: false, error: "Huna ruhusa ya kulipia muamala huu." },
        { status: 403 }
      );
    }

    // 6. Hakikisha muamala haujalipiwa tayari
    if (tx.status !== "AWAITING_PAYMENT") {
      return NextResponse.json(
        { success: false, error: "Muamala huu umeshalipiwa au umefungwa." },
        { status: 400 }
      );
    }

    // 7. FANYA MALIPO (Hapa ndipo API za Selcom/Mpesa zingeingia)
    // Kwa sasa tunafanya malipo yamefanikiwa na kubadili status kuwa PAID
    const updatedTx = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: "PAID",
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Malipo yamefanikiwa na pesa imewekwa PesaShip Escrow.",
        transaction: updatedTx
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("API ESCROW PAY ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Kuna tatizo la kimtandao (Server Error)." },
      { status: 500 }
    );
  }
}