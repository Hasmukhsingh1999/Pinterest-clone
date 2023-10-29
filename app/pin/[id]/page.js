"use client";
import { getOne } from "@/services/unsplash.service";
import React, { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { PiUploadSimpleBold } from "react-icons/pi";
import { LiaLinkSolid } from "react-icons/lia";

const page = ({ params }) => {
  const { id } = params;
  const [showDets, setshowDets] = useState(null);
  useEffect(() => {
    getOne(id)
      .then((data) => {
        setshowDets(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="relative  h-screen w-full flex items-center justify-center overflow-auto md:mt-[4vw] ">
      <div className="md:w-[60vw] md:h-[40vw] w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
        {showDets && (
          <div className="w-full h-full flex md:flex-row flex-col ">
            <div className="md:w-[50%] md:h-full h-[50%]">
              <img
                src={showDets.urls.small}
                alt={showDets.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-[50%] overflow-auto h-[50%]">
              <div className="h-[5vw] bg-white w-full sticky top-0 right-0  flex justify-between md:py-[1vw] md:px-[2vw] px-[5vw] py-[10vw] items-center">
                <div className="flex items-center gap-3">
                  <BsThreeDots className="md:text-xl text-2xl" />
                  <PiUploadSimpleBold className="md:text-xl text-2xl" />
                  <LiaLinkSolid className="md:text-xl text-2xl" />
                </div>
                <div>
                  <button className="md:px-[2vw] md:py-[1vw] px-[3vw] py-[2vw] bg-red-600 font-semibold text-sm text-white rounded-full">
                    Save
                  </button>
                </div>
              </div>
              <div className="flex flex-col md:px-[2vw] md:py-[3vw] px-[5vw]">
                <p className="text-sm text-neutral-600">
                  {showDets.user?.portfolio_url}
                </p>
                <h2 className="text-xl font-semibold">{showDets.user.name}</h2>
                <p className="text-sm text-neutral-600">
                  @{showDets.user?.social.instagram_username}
                </p>
                <div className="mt-3 flex md:gap-2 gap-3">
                  <img
                    src={showDets.user.profile_image.small}
                    alt={showDets.title}
                    className="w-[40px] h-[40px] object-cover rounded-full"
                  />
                  <div className="flex  flex-col ">
                    <p className="text-sm font-semibold">
                      {showDets.exif.model}
                    </p>
                    <p className="text-[12px]">follow</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Replace 'imageURL' with the actual property name for the image URL in your API response */}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
