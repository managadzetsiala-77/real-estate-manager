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
  const [btnId, setBtnId] = useState(null);

  const [selectedRegions, setSelectedRegions] = useState([]);

  const [selectedPrice, setSelectedPrice] = useState({
    min: "",
    max: "",
  });

  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });

  const { data: appartments } = useQuery({
    queryKey: ["appartments"],
    queryFn: getAppartments,
  });

  const { register, handleSubmit, reset } = useForm();

  const filteredAppartments = useMemo(() => {
    const isRegionSelected = selectedRegions.length > 0;

    const isMinPriceSelected =
      selectedPrice?.min !== "";

    const isMaxPriceSelected =
      selectedPrice?.max !== "";

    return appartments?.filter((appartment) => {
      const appartmentPrice = Number(
        appartment?.price
      );

      const matchesRegion =
        !isRegionSelected ||
        selectedRegions.includes(
          appartment?.city?.region_id?.toString()
        );

      const matchesMinPrice =
        !isMinPriceSelected ||
        appartmentPrice >=
          Number(selectedPrice?.min);

      const matchesMaxPrice =
        !isMaxPriceSelected ||
        appartmentPrice <=
          Number(selectedPrice?.max);

      return (
        matchesRegion &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });
  }, [selectedRegions, selectedPrice, appartments]);

  function filterByRegion(data) {
    if (data.regions) {
      setSelectedRegions(data.regions);
    }

    setSelectedPrice({
      min: data.minPrice || "",
      max: data.maxPrice || "",
    });

    setBtnId(null);

    reset();
  }

  function handleFilterModal(id) {
    if (btnId === id) {
      return setBtnId(null);
    }

    setBtnId(id);
  }

  return (
    <>
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-40 pt-6 sm:pt-10 md:pt-14 lg:pt-18 flex flex-col items-center min-h-screen">
        <div className="p-5 border border-[#DBDBDB] rounded-lg w-183.75 mb-8 sm:mb-10 md:mb-12 mr-auto">
          <form
            onSubmit={handleSubmit(filterByRegion)}
            className="relative flex gap-6"
          >
            <button
              onClick={() => handleFilterModal(1)}
              type="button"
              className="flex items-center gap-1"
            >
              რეგიონი
            </button>

            <button
              onClick={() => handleFilterModal(2)}
              type="button"
              className="flex items-center gap-1"
            >
              საფასო კატეგორია
            </button>

            {btnId === 1 && (
              <div className="w-183.75 absolute p-6 bg-white z-10 rounded-lg border border-[#DBDBDB] shadow-xl top-15 -left-5.5 flex flex-col items-start">
                <h2 className="font-medium text-base">
                  რეგიონის მიხედვით
                </h2>

                <div className="flex flex-wrap gap-x-10 gap-y-4 justify-start mb-8 mt-6">
                  {regions?.map((region) => {
                    return (
                      <label
                        key={region.id}
                        htmlFor={region.name}
                        className="w-50 flex gap-2 text-[14px]"
                      >
                        <input
                          type="checkbox"
                          id={region.name}
                          value={region.id}
                          {...register("regions")}
                          className="w-5 h-5 accent-green-600"
                        />

                        {region.name}
                      </label>
                    );
                  })}
                </div>

                <div className="w-full text-right">
                  <Button
                    color="orange"
                    type="submit"
                  >
                    არჩევა
                  </Button>
                </div>
              </div>
            )}

            {btnId === 2 && (
              <div className="w-95.5 absolute p-6 bg-white z-10 rounded-lg border border-[#DBDBDB] shadow-xl top-15 -left-5.5 flex flex-col items-start">
                <h2 className="font-medium text-base mb-6">
                  ფასის მიხედვით
                </h2>

                <div className="flex w-full gap-3.75 mb-8">
                  <label className="border border-[#808A93] p-2.5 rounded mr-3.75 flex">
                    <input
                      type="text"
                      placeholder="დან"
                      {...register("minPrice")}
                      className="w-full outline-0"
                    />

                    ლ
                  </label>

                  <label className="border border-[#808A93] p-2.5 rounded flex">
                    <input
                      type="text"
                      placeholder="მდე"
                      {...register("maxPrice")}
                      className="w-full outline-0"
                    />

                    ლ
                  </label>
                </div>

                <div className="w-full text-right">
                  <Button
                    color="orange"
                    type="submit"
                  >
                    არჩევა
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 pb-12 sm:pb-16 md:pb-20">
          {filteredAppartments?.length > 0 ? (
            filteredAppartments?.map(
              (appartment) => {
                return (
                  <ListingCard
                    key={appartment.id}
                    appartment={appartment}
                  />
                );
              }
            )
          ) : (
            <p>
              აღნიშნული მონაცემებით
              განცხადება არ იძებნება
            </p>
          )}
        </section>

        {isOpen && (
          <AgentModal setIsOpen={setIsOpen} />
        )}
      </div>
    </>
  );
}