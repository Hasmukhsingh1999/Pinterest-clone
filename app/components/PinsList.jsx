"use client";
import React, { useEffect, useState } from "react";
import { getAll } from "@/services/unsplash.service";
import Link from "next/link";

const PinsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [hoveredIndex, sethoveredIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getAll();
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when data is loaded
      }
    };

    fetchData();
  }, []);

  const handleMouseEnter = (index) => {
    sethoveredIndex(index);
  };
  const handleMouseLeave = () => {
    sethoveredIndex(null);
  };

  return (
    <div>
      {loading ? (
        <div className="loader-container flex items-center justify-center w-screen h-screen">
          <div className="loader text-center">
            loading...
          </div>
        </div>
      ) : (
        <div className="md:mt-[7vw] mt-[30vw] px-2 md:px-5 columns-2 md:columns-3 lg:columns-4 mb-4 xl:columns-5 space-y-6 mx-auto">
          {data.map((image, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Link href={`/pin/${image.id}`}>
                <div className="relative before:absolute before:h-full before:w-full before:rounded-3xl before:z-10 cursor-pointer">
                  <img
                    src={image.urls.full}
                    alt={image.alt_description}
                    width={500}
                    height={500}
                    className="rounded-3xl cursor-pointer relative z-0"
                    onLoad={() => {
                      // Handle image loaded
                    }}
                  />
                </div>
              </Link>
              <div className="absolute z-10 top-2 left-2 text-white">
                <h2
                  className={`font-bold text-[15px] mb-1 mt-2 line-clamp-2 ${
                    hoveredIndex === index ? "" : "hidden"
                  }`}
                >
                  {image.user.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PinsList;

