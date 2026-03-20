import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const flags = await prisma.flag.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(flags);
}

export async function POST(req: NextRequest) {
  const { name, initials, pattern } = await req.json();
  const flag = await prisma.flag.create({
    data: { name, initials, pattern },
  });

  return NextResponse.json(flag);
}
