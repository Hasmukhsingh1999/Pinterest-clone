"use client";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import Link from "next/link";
import axios from "axios";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const [hoveredIndex, sethoveredIndex] = useState(null);

  const searchTermChange = async (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (value.trim()) {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=pmsFQ2pLrzkSkMEMl615-XU2oZ9RT0yhsTPEVQDUPB8&per_page=10&query=${value}`
        );
        // Update the state with the actual images from the response.
        setSearchedItems(response.data.results);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Clear the search results when the input is empty
      setSearchedItems([]);
    }
  };

  const handleMouseEnter = (index) => {
    sethoveredIndex(index);
  };

  const handleMouseLeave = () => {
    sethoveredIndex(null);
  };

  return (
    <div className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <img src="/pinterest.png" alt="logo" className="h-8" />
          </Link>
          <div className="hidden md:flex space-x-2">
            <Link href={`/`}>
              <button className="bg-black text-white p-3 px-6 rounded-full font-semibold">
                Home
              </button>
            </Link>
            <Link href={`/`}>
              <button className="text-gray-700 hover-text-black p-3 px-6 rounded-full font-semibold">
                Explore
              </button>
            </Link>
            <button className="text-gray-700 hover-text-black p-3 px-6 rounded-full font-semibold">
              Create
            </button>
          </div>
        </div>
        <div className="w-1/2 md:w-[50%]">
          <div className="p-3 flex items-center bg-[#e9e9e9] rounded-full">
            <AiOutlineSearch className="text-gray-500" />
            <div className="w-full">
              <input
                type="search"
                name="search"
                id="search"
                value={searchTerm}
                onChange={searchTermChange}
                placeholder="Search"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <NotificationsIcon className="text-gray-700 hover-text-black text-2xl" />
          <MarkChatUnreadIcon className="text-gray-700 hover-text-black text-2xl" />
          <button className="font-semibold p-2 px-4 rounded-full md:visible hidden">
            Login
          </button>
        </div>
      </div>

      <div className="px-2 md:px-5 columns-2 md:columns-3 lg:columns-4 mb-4 xl:columns-5 space-y-6 mx-auto">
        {searchedItems.map((image, index) => (
          <div
            key={index}
            className=" relative"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={`/pin-details/${image.id}`}>
              <div className="relative before:absolute before:h-full before:w-full before:rounded-3xl before:z-10 cursor-pointer">
                <img
                  src={image.urls.full}
                  alt={image.alt_description}
                  width={500}
                  height={500}
                  className="rounded-3xl cursor-pointer relative z-0"
                />
              </div>
            </Link>
            <div className="absolute z-10 top-2 left-2 text-white">
              <h2
                className={`font-bold text-[15px] mb-1 mt-2 line-clamp-2 ${
                  hoveredIndex === index ? "" : "hidden"
                }`}
              >
                {" "}
                {image.user.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;

