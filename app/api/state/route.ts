import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  return NextResponse.json(
    await prisma.flag.findMany({ orderBy: { createdAt: "desc" } }),
  );
}

export async function POST(req: Request) {
  return NextResponse.json(
    await prisma.flag.create({ data: await req.json() }),
  );
}
