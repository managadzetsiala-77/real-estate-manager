import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAppartmentById } from "../api/appartments";
import Button from "../components/Button";

export default function Detail() {
  const { id } = useParams();
  const { data: appartment } = useQuery({
    queryKey: ["appartment", id],
    queryFn: () => getAppartmentById(id),
  });
  console.log(appartment);

  return (
    <>
      <section className="flex text-[#808A93 gap-17 text-[#808A93] ">
        <div className="text-right font-normal font-['FiraGO']">
           <img className="w-209.75" src={appartment?.image} alt="appartment" />
        <p className="mt-2.75  font-normal font-['FiraGO'] ">გამოქვეყნების თარიღი {appartment?.created_at}</p>
        </div>
       
        <div>
          <div className="py-5.5 px-6.25">
            <h2 className="text-[#021526] text-[48px] mb-6 font-bold font-FiraGO">
              {appartment?.price} ₾
            </h2>
            <p className="flex items-center gap-2 text-base font-normal font-FiraGO   mt-1.75">
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
            <div className="flex flex-col items-start gap-4 mt-5">
              <span className="flex items-center gap-1.5">
                <img src="/images/v2.svg" alt="" />
                ფართი {appartment?.area} მ<sup>2</sup>
              </span>
              <span className="flex items-center gap-1.5">
                <img src="/images/bed.svg" alt="" />
                საძინებელი {appartment?.bedrooms}
              </span>

              <span className="flex items-center gap-1.5">
                <img src="/images/v3.svg" alt="" />
                საფოსტო ინდექსი {appartment?.zip_code}
              </span>

              <p className="mt-6">{appartment?.description}</p>
              <div className="w-125.75 py-6 px-5 border border-[#DBDBDB] rounded-lg mt-12">
                <div className="flex gap-3.5 items-center">
                  <img
                    className="w-18 h-18 rounded-[50%]"
                    src={appartment?.agent.avatar}
                    alt=""
                  />
                  <div>
                    <p className="text-[#021526]">
                      {appartment?.agent.name} {appartment?.agent.surname}
                    </p>
                    <p>აგენტი</p>
                  </div>
                </div>
                <p className="flex gap-1.25 mt-4 mb-1">
                  <img src="/images/Shape.svg" alt="" />
                  {appartment?.agent.email}
                </p>
                <p className="flex gap-1.25">
                  <img src="/images/phone.svg" alt="" />
                  {appartment?.agent.phone}
                </p>
              </div>
            </div>
            <Button >ლისტინგის წაშლა</Button>
          </div>
        </div>
      </section>
    </>
  );
}
