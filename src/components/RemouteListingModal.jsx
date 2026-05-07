import React from "react";
import Button from "./Button";

export default function RemouteListingModal({ onClose, onRemove }) {
  return (
    <>
      <div className="flex justify-center items-center absolute top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-sm">
        <div className="w-155.75 h-55.5 bg-white rounded-[10px]  flex flex-col items-center justify-center gap-9 relative">
          <img
            className="absolute top-1 right-3 cursor-pointer"
            src="/images/delete-circled-outline.svg"
            alt=""
            onClick={onClose}
          />
          <p>გსურთ წაშალოთ ლისტინგი?</p>
          <div className="flex gap-4 ">
            <Button color={"white"} hanleClick={onClose}>
              გაუქმება
            </Button>

            <Button color={"orange"} hanleClick={onRemove}>
              დადასტურება
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
