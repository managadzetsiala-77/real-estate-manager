import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AgentModal from "../components/AgentModal";
import ListingCard from "../components/listingCard";
import { getAppartments, getRegions } from "../api/appartments";
import { useForm } from "react-hook-form";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [openCheckBoxes, setOpenCheckBoxes] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });

  const { data: appartments } = useQuery({
    queryKey: ["appartments"],
    queryFn: getAppartments,
  });

  const { register, handleSubmit, reset } = useForm();
  const filterdAppartments = useMemo(() => {
    let isSelected = selectedRegions.length > 0;

    if (isSelected) {
      return appartments?.filter((appartment) => {
        return selectedRegions.includes(appartment?.city?.region_id.toString());
      });
    }

    return appartments;
  }, [selectedRegions, appartments]);

  function filterByRegion(data) {
    setSelectedRegions(data.regions);
    setOpenCheckBoxes((prev) => !prev);
    reset();
  }

  function handleCheckBoxes() {
    setOpenCheckBoxes((prev) => !prev);
  }

  return (
    <>
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-40 pt-6 sm:pt-10 md:pt-14 lg:pt-18 flex flex-col items-center min-h-screen">
        <div className="p-5 border border-[#DBDBDB] rounded-lg w-full max-w-183.75 mb-8 sm:mb-10 md:mb-12 mr-auto">
          <form onSubmit={handleSubmit(filterByRegion)} className="relative">
            <button
              onClick={handleCheckBoxes}
              type="button"
              className="flex gap-1 text-slate-900 text-base font-medium font-['FiraGO'] py-3.5 px-2"
            >
              რეგიონი <img src="/images/check.svg" alt="" />
            </button>
            {openCheckBoxes && (
              <div className="w-183.75 absolute p-6 bg-white z-10 rounded-lg border border-[#DBDBDB] shadow-xl top-15 -left-5.5 flex flex-col items-start">
                <h2 className="font-medium text-base ">რეგიონის მიხედვით</h2>
                <div className="flex flex-wrap gap-x-10 gap-y-4 justify-start mb-8 mt-6">

                {regions?.map((region) => {
                  return (
                    <label key={region.id} htmlFor={region.name} className="w-50 flex gap-2 text-[14px]">
                      {" "}
                      <input
                        type="checkbox"
                        id={region.name}
                        value={region.id}
                        {...register("regions")}
                        className="w-5 h-5 accent-green-600"
                      />{" "}
                      {region.name}
                    </label>
                  );
                })}

                </div>
               <div className="w-full text-right">
               <Button color="orange" type="submit" >
                არჩევა
                </Button>
               </div>
                
              </div>
            )}
          </form>
        </div>
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
          {filterdAppartments?.length > 0 ? (
            filterdAppartments?.map((appartment) => {
              return (
                <ListingCard key={appartment.id} appartment={appartment} />
              );
            })
          ) : (
            <p>აღნიშნული მონაცემებით განცხადება არ იძებნება</p>
          )}
        </section>

        {/* Agent Modal */}
        {isOpen && <AgentModal setIsOpen={setIsOpen} />}
      </div>
    </>
  );
}
