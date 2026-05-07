import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AgentModal from "../components/AgentModal";
import ListingCard from "../components/listingCard";
import { getAppartments } from "../api/appartments";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: appartments } = useQuery({
    queryKey: ["appartments"],
    queryFn: getAppartments,
  });

  return (
    <>
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-40 pt-6 sm:pt-10 md:pt-14 lg:pt-18 flex flex-col items-center min-h-screen">
        {/* Header Section */}
        <section className="flex flex-col sm:flex-row justify-end w-full gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12">
          <Link to={"/add"} className="w-full sm:w-auto">
            <Button color={"orange"} className="w-full sm:w-auto">
              + ლისტინგის დამატება
            </Button>
          </Link>

          <Button
            color={"white"}
            hanleClick={() => setIsOpen((prev) => !prev)}
            className="w-full sm:w-auto"
          >
            + აგენტის დამატება
          </Button>
        </section>

        {/* Loading State */}
        {!appartments && (
          <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
            <p className="text-gray-500 text-sm sm:text-base">იტვირთება...</p>
          </div>
        )}

        {/* Empty State */}
        {appartments?.length === 0 && (
          <div className="flex justify-center items-center py-12 sm:py-16 md:py-20 w-full">
            <p className="text-gray-500 text-center text-sm sm:text-base">
              ლისტინგი არ მოიძებნა
            </p>
          </div>
        )}

        {/* Listings Grid */}
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 pb-12 sm:pb-16 md:pb-20">
          {appartments?.map((appartment) => {
            return <ListingCard key={appartment.id} appartment={appartment} />;
          })}
        </section>

        {/* Agent Modal */}
        {isOpen && <AgentModal setIsOpen={setIsOpen} />}
      </div>
    </>
  );
}
