import React from "react";
import { useNavigate } from "react-router-dom";

export default function listingCard({ appartment }) {
  // console.log(appartment?.image);
const navigate = useNavigate()

  return (
    <>
      <div onClick={() => navigate(`/detail/${appartment?.id}`)} className="tretch max-w-[384px] rounded-2xl border border-[#DBDBDB] overflow-hidden  gap-4  text=[#4E5C68] relative">
        <img className="h-76.75" src={appartment?.image} alt="" />
        <span className="w-24 p-1.5 left-5.75 top-5.75 absolute bg-slate-900/50 rounded-2xl  justify-center items-center gap-2.5 text-center text-white text-xs font-medium font-['FiraGO'] tracking-wide">
         {appartment?.is_rental ? "ქირავდება" : "იყიდება"}
        </span>
        <div className="py-5.5 px-6.25">
          <h2 className="text-[#021526] text-3xl font-bold font-FiraGO">
          {appartment?.price}
          </h2>
          <p className="flex items-center gap-2 text-base font-normal font-FiraGO text-[#021526] mt-1.75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="17"
              viewBox="0 0 14 17"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.05025 2.05025C4.78392 -0.683417 9.21608 -0.683418 11.9497 2.05025C14.6834 4.78392 14.6834 9.21608 11.9497 11.9497L7 16.8995L2.05025 11.9497C-0.683418 9.21608 -0.683418 4.78392 2.05025 2.05025ZM7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z"
                fill="#021526"
                fillOpacity="0.5"
              />
            </svg>
            {`${appartment?.city.name}, ${appartment?.address}`}
          </p>
          <div className="flex items-center gap-8 mt-5">
            <span className="flex items-center gap-1.5">
              <img src="/images/bed.svg" alt="" /> {appartment?.bedrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <img src="/images/v2.svg" alt="" /> {appartment?.area} მ<sup>2</sup>
            </span>
            <span className="flex items-center gap-1.5">
              <img src="/images/v3.svg" alt="" /> {appartment?.zip_code}
            </span>
            
          </div>
        </div>
      </div>
    </>
  );
}
