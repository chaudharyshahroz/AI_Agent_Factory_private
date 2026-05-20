import { NextResponse } from "next/server";
import { categoryCatalog } from "@/lib/categories/catalog";

export async function GET() {
  return NextResponse.json({ categories: categoryCatalog });
}
