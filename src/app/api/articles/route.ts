import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const articles = db
    .prepare(
      `SELECT a.*, c.name as category_name, c.slug as category_slug
       FROM articles a JOIN article_categories c ON a.category_id = c.id
       WHERE a.is_published = 1 ORDER BY a.created_at DESC`
    )
    .all();
  return NextResponse.json(articles);
}
