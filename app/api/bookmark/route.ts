import { NextResponse } from "next/server";
import bookmarks from "@/json/bookmark.json";

let bookmarks_data = bookmarks;

export async function GET() {
  return NextResponse.json(bookmarks_data);
}

export async function POST(req: Request) {
  const { title, description, datePosted, views, link, category } =
    await req.json();
  const new_bookmark: {
    id: number;
    title: string;
    description: string;
    datePosted: string;
    views: number;
    link: string;
    categories: string[];
    logo: string;
    tags: string[];
    pinned: boolean;
  } = {
    id: bookmarks_data.bookmarks.length + 1,
    title,
    description,
    datePosted,
    views,
    link,
    categories: [category],
    tags: [],
    logo: "https://cdn.simpleicons.org/smashingmagazine",
    pinned: false,
  };

  bookmarks_data = {
    bookmarks: [...bookmarks_data.bookmarks, new_bookmark],
  };

  return NextResponse.json({
    message: "new bookmark added",
    status: "successful",
    bookmark: bookmarks_data,
  });
}

export async function PATCH(req: Request) {
  const { id } = await req.json();

  const bookmarkToUpdate = bookmarks_data.bookmarks.map((bookmark) =>
    bookmark.id === id ? { ...bookmark, pinned: !bookmark.pinned } : bookmark,
  );

  bookmarks_data = {
    bookmarks: bookmarkToUpdate,
  };

  return NextResponse.json({
    message: "bookmark updated",
    status: "successful",
    bookmark: bookmarks_data,
  });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const deleteBookmark = bookmarks_data.bookmarks.filter(
    (bookmark) => bookmark.id !== id,
  );
  bookmarks_data = {
    bookmarks: deleteBookmark,
  };

  return NextResponse.json({
    message: "bookmark deleted",
    status: "successful",
    bookmark: bookmarks_data,
  });
}
