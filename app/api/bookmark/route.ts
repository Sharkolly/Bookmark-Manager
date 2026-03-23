import { NextResponse } from "next/server";
import bookmarks from "@/json/bookmark.json";

const bookmarks_data = bookmarks;

export async function GET() {
  return NextResponse.json(bookmarks_data);
}

export async function POST(req: Request, res: Response) {
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

  bookmarks_data.bookmarks.push(new_bookmark);
  console.log(bookmarks_data);
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

  return NextResponse.json({
    message: "bookmark updated",
    status: "successful",
    bookmark: bookmarkToUpdate,
  });
}


export async function DELETE (req:Request, res: Response) {
  const {id} = await req.json();

  const deleteBookamrk = bookmarks_data.bookmarks.filter((bookmark) => bookmark.id !== id);

  return NextResponse.json({
    message: "bookmark deleted",
    status: "successful",
    bookmark: deleteBookamrk,
  });

}