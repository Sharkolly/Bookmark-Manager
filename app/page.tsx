'use client'
import Sidebar from "@/components/sidebar"
import Home from "@/components/home"
import {useState} from 'react'

const Page = () => {
  const [menu, setMenu] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  return (
    <div className="flex justify-between">
      <Sidebar menu={menu} tags={tags} setTags={setTags}  />
      <Home menu={menu} setMenu={setMenu} tags={tags} />
    </div>
  )
}

export default Page
