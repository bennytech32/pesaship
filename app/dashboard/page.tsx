import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DashboardRouter() {
  const session = await auth();
  
  if (!session || !session.user?.email) {
    redirect("/login");
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    redirect("/login");
  }

  // Peleka kila mtu kwenye chumba chake
  if (currentUser.role === "SELLER") {
    redirect("/dashboard/seller");
  } else {
    redirect("/dashboard/buyer");
  }
}