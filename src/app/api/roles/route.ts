import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const roles = db
    .prepare(
      `SELECT r.*, t.name as team_name, t.color as team_color
       FROM roles r JOIN teams t ON r.team_id = t.id
       WHERE r.is_active = 1 ORDER BY r.sort_order`
    )
    .all();
  return NextResponse.json(roles);
}
