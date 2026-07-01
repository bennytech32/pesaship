import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; // Hapa ndipo penye siri ya kutoboa Railway!

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, password, phone, role } = body;

    // 1. Uhakiki (Validation) wa awali
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Tafadhali jaza taarifa zote muhimu (Jina, Email, Nywila)." },
        { status: 400 }
      );
    }

    // 2. Angalia kama mtumiaji yupo tayari kwenye mfumo
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Akaunti yenye email hii inatumika tayari. Tafadhali nenda kwenye Login." },
        { status: 409 }
      );
    }

    // 3. Ficha neno la siri (Hash password) salama kabisa
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Tengeneza mtumiaji mpya kwenye Database (Neon)
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone: phone || null,
        role: role || "BUYER", // 'BUYER' inakuwa default kama haijachaguliwa
      },
    });

    // 5. Tunaficha nywila isirudi kwenye majibu (Response) kwa usalama
    const { password: _, ...safeUser } = newUser;

    return NextResponse.json(
      { 
        success: true, 
        message: "Akaunti yako imetengenezwa kikamilifu!", 
        user: safeUser 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("REGISTER API ERROR:", error);
    return NextResponse.json(
      { success: false, error: "Kuna hitilafu kwenye server. Tafadhali jaribu tena baadaye." },
      { status: 500 }
    );
  }
}