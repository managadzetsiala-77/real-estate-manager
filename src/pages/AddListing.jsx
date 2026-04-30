import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { getRegions, getCities } from "../api/appartments";
import { useMemo } from "react";

function AddListing() {
  const schema = yup.object({});
  const {
    isPending: regionisPending,
    error: regionError,
    data: regions,
  } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });
  const {
    isPending: citiesIsPanding,
    error: citiesError,
    data: cities,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });
  // console.log(cities);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  function sabmitHandler(data) {
    console.log(data);
    reset();
  }
  const region = watch("region-id");

  const filteredCities = useMemo(() => {
    const selectedRegion = region !== "";

    if (selectedRegion) {
      return cities?.filter((city) => city.region_id == region);
    }
    return cities;
  }, [region, cities]);
  console.log(filteredCities);

  return (
    <>
      <div className="mt-15.5 bg-amber-300 flex flex-col items-center">
        <h2 className="text-[32px] font-medium text-[#021526]">
          ლისტინგის დამატება
        </h2>

        <form
          className="max-w-197.5 bg-blue-300"
          onSubmit={handleSubmit(sabmitHandler)}
        >
          <div>
            <h3 className="font-medium text-[16px] uppercase mb-2">
              გარიგების ტიპი
            </h3>
            <div className="flex gap-18 items-center mb-20">
              <label htmlFor="radio1" id="radio1">
                {" "}
                <input type="radio" value={0} {...register("is_rental")} />{" "}
                იყიდება
              </label>
              <label htmlFor="radio2" id="radio2">
                {" "}
                <input type="radio" value={1} {...register("is_rental")} />{" "}
                ქირავდება
              </label>
            </div>
            <h3 className="mb-5.5 font-medium">მდებარეობა</h3>
            <div className="flex gap-5">
              <div className="flex flex-col">
                <label htmlFor="address">მისამართი *</label>
                <input
                  className="border"
                  type="text"
                  id="address"
                  {...register("address")}
                />
                <p>✔️მინიმუმ ორი სიმბოლო</p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="zip_code">საფოსტო ინდექსი *</label>
                <input
                  className="border"
                  type="text"
                  id="zip_code"
                  {...register("zip_code")}
                />
                <p>✔️მხოლოდ რიცხვები</p>
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col">
                  <label htmlFor="region_id">რეგიონი</label>
                  <select
                    className="border"
                    id="region_id"
                    {...register("region-id")}
                  >
                    <option value="">აირჩიე რეგიონი</option>
                    {regions?.map((region) => {
                      return (
                        <option value={region.id} key={region.id}>
                          {region.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="city_id">ქალაქი</label>
                  <select
                    className="border"
                    id="city_id"
                    {...register("city_id")}
                  ></select>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddListing;
