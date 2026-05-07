import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteAppartments, getAppartmentById } from "../api/appartments";
import Button from "../components/Button";
import RemouteListingModal from "../components/RemouteListingModal";
import { useState } from "react";
import AppartmentsSlader from "../components/AppartmentsSlader";

export default function Detail() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: appartment } = useQuery({
    queryKey: ["appartment", id],
    queryFn: () => getAppartmentById(id),
  });
  const mutation = useMutation({
    mutationFn: () => deleteAppartments(id),
  });

  function handleDelete() {
    mutation.mutate();
    navigate("/");
  }

  function handleClose() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      <div className="px-4 sm:px-6 md:px-8 lg:px-20 xl:px-40.5 pt-6 sm:pt-8 md:pt-10 pb-32 sm:pb-40 md:pb-57">
        <Link to="/" className="mt-4 sm:mt-5 mb-6 sm:mb-7 block w-fit">
          <img src="/images/arrow.svg" alt="back" />
        </Link>

        <section className="flex flex-col lg:flex-row text-[#808A93] gap-6 sm:gap-10 md:gap-17">
          {/* Image Section */}
          <div className="relative text-right font-normal font-['FiraGO'] w-full lg:w-auto">
            <span className="w-20 sm:w-24 p-1 sm:p-1.5 left-3 sm:left-5.75 top-3 sm:top-5.75 absolute bg-slate-900/50 rounded-2xl justify-center items-center gap-2.5 text-center text-white text-xs font-medium font-['FiraGO'] tracking-wide">
              {appartment?.is_rental ? "ქირავდება" : "იყიდება"}
            </span>
            <img
              className="w-full sm:w-auto sm:max-w-md lg:w-209.75"
              src={appartment?.image}
              alt="appartment"
            />
            <p className="mt-2 sm:mt-2.75 font-normal font-['FiraGO'] text-sm sm:text-base">
              გამოქვეყნების თარიღი{" "}
              {appartment?.created_at
                ?.split("T")[0]
                ?.split("-")
                ?.reverse()
                ?.join("/")}
            </p>
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-auto">
            <div className="py-4 sm:py-5.5 px-4 sm:px-6.25">
              <h2 className="text-[#021526] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] mb-4 sm:mb-6 font-bold font-['FiraGO']">
                {appartment?.price} ₾
              </h2>

              {/* Location */}
              <p className="flex items-center gap-2 text-sm sm:text-base font-normal font-['FiraGO'] mt-1.75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="17"
                  viewBox="0 0 14 17"
                  fill="none"
                  className="w-3 h-4 sm:w-3.5 sm:h-[17px]"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.05025 2.05025C4.78392 -0.683417 9.21608 -0.683418 11.9497 2.05025C14.6834 4.78392 14.6834 9.21608 11.9497 11.9497L7 16.8995L2.05025 11.9497C-0.683418 9.21608 -0.683418 4.78392 2.05025 2.05025ZM7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z"
                    fill="#021526"
                    fillOpacity="0.5"
                  />
                </svg>
                <span className="text-xs sm:text-sm md:text-base">
                  {`${appartment?.city.name}, ${appartment?.address}`}
                </span>
              </p>

              {/* Specifications */}
              <div className="flex flex-col items-start gap-3 sm:gap-4 mt-4 sm:mt-5 mb-4 sm:mb-5">
                <span className="flex items-center gap-1.5 text-sm sm:text-base">
                  <img src="/images/v2.svg" alt="" className="w-4 h-4" />
                  ფართი {appartment?.area} მ<sup>2</sup>
                </span>
                <span className="flex items-center gap-1.5 text-sm sm:text-base">
                  <img src="/images/bed.svg" alt="" className="w-4 h-4" />
                  საძინებელი {appartment?.bedrooms}
                </span>
                <span className="flex items-center gap-1.5 text-sm sm:text-base">
                  <img src="/images/v3.svg" alt="" className="w-4 h-4" />
                  საფოსტო ინდექსი {appartment?.zip_code}
                </span>

                {/* Description */}
                <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed">
                  {appartment?.description}
                </p>

                {/* Agent Card */}
                <div className="w-full sm:w-125.75 py-4 sm:py-6 px-4 sm:px-5 border border-[#DBDBDB] rounded-lg mt-8 sm:mt-12">
                  <div className="flex gap-2 sm:gap-3.5 items-center">
                    <img
                      className="w-14 h-14 sm:w-18 sm:h-18 rounded-full"
                      src={appartment?.agent.avatar}
                      alt="agent"
                    />
                    <div className="min-w-0">
                      <p className="text-[#021526] font-semibold text-sm sm:text-base truncate">
                        {appartment?.agent.name} {appartment?.agent.surname}
                      </p>
                      <p className="text-xs sm:text-sm text-[#808A93]">
                        აგენტი
                      </p>
                    </div>
                  </div>
                  <p className="flex gap-1.25 mt-3 sm:mt-4 mb-1 text-xs sm:text-sm break-all">
                    <img
                      src="/images/Shape.svg"
                      alt=""
                      className="w-4 h-4 flex-shrink-0"
                    />
                    {appartment?.agent.email}
                  </p>
                  <p className="flex gap-1.25 text-xs sm:text-sm">
                    <img
                      src="/images/phone.svg"
                      alt=""
                      className="w-4 h-4 flex-shrink-0"
                    />
                    {appartment?.agent.phone}
                  </p>
                </div>
              </div>

              {/* Delete Button */}
              <div className="mt-6 sm:mt-8">
                <Button hanleClick={handleClose}>ლისტინგის წაშლა</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Apartments Section */}
        <section className="mt-12 sm:mt-16 md:mt-20 lg:mt-16.75">
          <h2 className="text-2xl sm:text-3xl font-medium text-slate-900 mb-4 sm:mb-6">
            ბინები მსგავს ლოკაციაზე
          </h2>
          <div>
            <AppartmentsSlader
              appartmentId={appartment?.id}
              cityId={appartment?.city.id}
            />
          </div>
        </section>
      </div>

      {isOpen && (
        <RemouteListingModal onClose={handleClose} onRemove={handleDelete} />
      )}
    </>
  );
}
