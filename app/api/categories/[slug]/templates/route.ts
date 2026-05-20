import { NextResponse } from "next/server";
import { getCategory } from "@/lib/categories/catalog";

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
  return NextResponse.json({ templates: category.templates });
}
