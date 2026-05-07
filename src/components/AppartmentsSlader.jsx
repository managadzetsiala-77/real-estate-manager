import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { getAppartments } from "../api/appartments";
import { useQuery } from "@tanstack/react-query";
import ListingCard from "./listingCard";

export default function AppartmentsSlader({ appartmentId, cityId }) {
  const { data: nearestAppartments } = useQuery({
    queryKey: ["Appartments"],
    queryFn: getAppartments,
  });

  const filteredAppartments = nearestAppartments?.filter((appartment) => {
    return appartment?.city?.id === cityId && appartment?.id !== appartmentId;
  });

  if (!filteredAppartments || filteredAppartments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No apartments available
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="w-full"
      >
        {filteredAppartments?.map((appartment) => {
          return (
            <SwiperSlide key={appartment.id} className="h-auto">
              <ListingCard appartment={appartment} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
