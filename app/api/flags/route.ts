import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  return NextResponse.json(
    await prisma.flag.findMany({ orderBy: { createdAt: "desc" } }),
  );
}

export async function POST(req: Request) {
  const data = await req.json();
  const flag = await prisma.flag.create({ data });
  const flags = await prisma.flag.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ flag, flags });
}
