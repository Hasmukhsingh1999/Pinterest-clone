"use client";
"use client";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <img src="/pinterest.png" alt="logo" className="h-8" />
          <div className="hidden md:flex space-x-2">
            <Link href={`/`}>
              <button className="bg-black text-white p-3 px-6 rounded-full font-semibold">
                Home
              </button>
            </Link>
            <Link href={`/`}>
              <button className="text-gray-700 hover:text-black p-3 px-6 rounded-full font-semibold">
                Explore
              </button>
            </Link>
            <button className="text-gray-700 hover:text-black p-3 px-6 rounded-full font-semibold">
              Create
            </button>
          </div>
        </div>
        <div className="w-1/2 md:w-[50%]">
          <div className="p-3 flex items-center bg-[#e9e9e9] rounded-full gap-2">
            <AiOutlineSearch className="text-gray-500" />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search"
              className="bg-transparent outline-none flex-grow"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <NotificationsIcon className="text-gray-700 hover:text-black text-2xl" />
          <MarkChatUnreadIcon className="text-gray-700 hover:text-black text-2xl" />

          <button className="font-semibold p-2 px-4 rounded-full">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

