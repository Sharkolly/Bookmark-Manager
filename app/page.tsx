"use client";
import Sidebar from "@/components/sidebar";
import Home from "@/components/home";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AddBookmark from "@/components/AddBookmark";
import { AllBookMarkType } from "@/types/app.types";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "home";

  const [allBookmarks, setAllBookmarks] = useState(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem("bookmarks");
    return stored ? JSON.parse(stored) : [];
  });
  const handleTabChange = (tab: string) => {
    router.push(`/?tab=${tab}`);
  };

  const [menu, setMenu] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [pinnedBookmarks, setPinnedBookmarks] = useState<
    AllBookMarkType[] | []
  >([]);

  return (
    <div className="flex justify-between">
      <Sidebar
        menu={menu}
        tags={tags}
        setTags={setTags}
        allBookmarks={allBookmarks}
        handleTabChange={handleTabChange}
        setAllBookmarks={setAllBookmarks}
        />
      {activeTab === "home" && (
        <Home
        menu={menu}
        setMenu={setMenu}
        tags={tags}
        handleTabChange={handleTabChange}
        setAllBookmarks={setAllBookmarks}
        allBookmarks={allBookmarks}
        pinnedBookmarks={pinnedBookmarks}
        setPinnedBookmarks={setPinnedBookmarks}
        />
      )}
      {activeTab === "pinned" && (
        <Home
        menu={menu}
        setMenu={setMenu}
        tags={tags}
        handleTabChange={handleTabChange}
        setAllBookmarks={setAllBookmarks}
        allBookmarks={allBookmarks}
        pinnedBookmarks={pinnedBookmarks}
        setPinnedBookmarks={setPinnedBookmarks}
        />
      )}

      {activeTab === "add-bookmark" && (
        <AddBookmark
          setAllBookmarks={setAllBookmarks}
          allBookmarks={allBookmarks}
        />
      )}
    </div>
  );
};

export default Page;
