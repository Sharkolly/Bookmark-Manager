import { NextResponse } from "next/server";
import bookmarks from "@/json/bookmark.json";

export async function GET() {
  const bookmarks_data = bookmarks;
  return NextResponse.json(bookmarks_data);
}
