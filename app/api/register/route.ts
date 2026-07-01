import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Tumepokea phone hapa
    const { email, phone, password, role } = body;

    // 1. Hakikisha taarifa zote zimejazwa (Ikiwemo namba ya simu)
    if (!email || !phone || !password || !role) {
      return NextResponse.json(
        { error: "Please provide your email, phone number, password, and role." }, 
        { status: 400 }
      );
    }

    if (role !== "BUYER" && role !== "SELLER") {
      return NextResponse.json(
        { error: "Account role must be BUYER or SELLER." }, 
        { status: 400 }
      );
    }

    // 2. Angalia kama email tayari imeshasajiliwa
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already in use by another account." }, 
        { status: 400 }
      );
    }

    // 3. Angalia kama namba ya simu tayari imetumika
    const existingPhone = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingPhone) {
      return NextResponse.json(
        { error: "This phone number is already registered." }, 
        { status: 400 }
      );
    }

    // 4. Ficha Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Hifadhi Mtumiaji Mpya kwenye Neon DB
    const newUser = await prisma.user.create({
      data: {
        email,
        phone, // Inahifadhi namba ya simu
        password: hashedPassword,
        role,
      },
    });

    // 6. Ondoa password kwenye majibu kwa usalama
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { success: true, message: "Account created successfully!", user: userWithoutPassword }, 
      { status: 201 }
    );

  } catch (error: any) {
    console.error("REGISTRATION ERROR:", error);
    
    return NextResponse.json(
      { error: "Failed to register. The server encountered an issue." }, 
      { status: 500 }
    );
  }
}