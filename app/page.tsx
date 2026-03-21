'use client'
import Sidebar from "@/components/sidebar"
import Home from "@/components/home"
import {useState} from 'react'
import {useSearchParams, useRouter} from 'next/navigation';
import AddBookmark from "@/components/AddBookmark";


const Page = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "";

  const handleTabChange = (tab: string) => {
    router.push(`/?tab=${tab}`);
  }

  const [menu, setMenu] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  return (
    <div className="flex justify-between">
      <Sidebar menu={menu} tags={tags} setTags={setTags}  />
      <Home menu={menu} setMenu={setMenu} tags={tags} handleTabChange={handleTabChange} />
{/* 
      {activeTab === "home" && (
        <Home menu={menu} setMenu={setMenu} tags={tags} />
      )} */}
      {activeTab === 'add-bookmark' && <AddBookmark/>}

    </div>
  )
}

export default Page
