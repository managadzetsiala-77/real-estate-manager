import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRegions, getCities, createAppartment } from "../api/appartments";
import { useEffect, useMemo, useState } from "react";

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
  const addListing = useMutation({
    mutationFn: (data) => createAppartment(data),
  });

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { is_rental: "0" },
  });

  function sabmitHandler(data) {
    const formData = new FormData();

    formData.append("region_id", +data.region_id);
    formData.append("city_id ", +data.city_id);
    formData.append("price ", +data.price);
    formData.append("address ", data.address);
    formData.append("zip_code ", data.zip_code);
    formData.append("description ", data.description);
    formData.append("area ", +data.area);
    formData.append("bedrooms ", +data.bedrooms);
    formData.append("is_rental ", +data.is_rental);
    formData.append("agent_id ", +data.agent_id);
    formData.append("image ", data.image[0]);

    addListing.mutate(formData);
    reset();
  }
  const region = watch("region-id");
  const city = watch("city_id");
  const image = watch("image");

  useEffect(() => {
    if (city) {
      const selectedCity = cities?.find((item) => item.id == city);
      setValue("region_id", selectedCity.region_id);
    }
  }, [city, cities, setValue]);

  const filteredCities = useMemo(() => {
    const selectedRegion = region !== "";

    if (selectedRegion) {
      return cities?.filter((city) => city.region_id == region);
    }
    return cities;
  }, [region, cities]);
  console.log(filteredCities);

  // const filteredRegion = useMemo(() => {
  //   const selectedCity = cities?.find((item) => item.id == city);
  //   const regionId = selectedCity?.region_id;

  //   if (selectedCity) {
  //     return regions?.filter((region) => region.id == regionId);
  //   }

  //   return regions;
  // }, [regions, city, cities]);
  return (
    <>
      <div className="mt-15.5 bg-amber-100 flex flex-col items-center">
        <h2 className="text-[32px] font-medium text-[#021526]">
          ლისტინგის დამატება
        </h2>

        <form
          className="max-w-197.5 bg-blue-100"
          onSubmit={handleSubmit(sabmitHandler)}
        >
          <div>
            <div>
              <h3 className="font-medium text-[16px] uppercase mb-2">
                გარიგების ტიპი
              </h3>
              <div className="flex gap-18 items-center mb-20">
                <label htmlFor="radio1" id="radio1">
                  {" "}
                  <input
                    type="radio"
                    value={0}
                    {...register("is_rental")}
                  />{" "}
                  იყიდება
                </label>
                <label htmlFor="radio2" id="radio2">
                  {" "}
                  <input
                    type="radio"
                    value={1}
                    {...register("is_rental")}
                  />{" "}
                  ქირავდება
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="mb-5.5 font-medium">მდებარეობა</h3>
              <div className=" flex gap-5">
                <div className="flex flex-col">
                  <label htmlFor="address">მისამართი *</label>
                  <input
                    className="border "
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
                  >
                    <option value="">აირიე ქალაქი</option>
                    {filteredCities?.map((city) => {
                      return (
                        <option value={city.id} key={city.id}>
                          {city.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <h3>ბინის დეტალები</h3>

              <div className="flex gap-5">
                <label htmlFor="price" className="flex flex-col ">
                  ფასი{" "}
                  <input
                    className="border"
                    type="text"
                    id="price"
                    {...register("price")}
                  />{" "}
                  <p>✔️მხოლოდ რიცხვები</p>
                </label>

                <label className="flex flex-col " htmlFor="area">
                  ფართობი{" "}
                  <input
                    className="border"
                    type="text"
                    id="area"
                    {...register("area")}
                  />{" "}
                  <p>✔️მხოლოდ რიცხვები</p>
                </label>
              </div>
              <label htmlFor="bedrooms" className="flex flex-col items-start ">
                საძინებლების რაოდენობა*{" "}
                <input
                  className="border"
                  type="text"
                  id="bedrooms"
                  {...register("bedrooms")}
                />{" "}
                <p>✔️მხოლოდ რიცხვები</p>
              </label>
              <label htmlFor="description" className="flex flex-col  ">
                აღწერა *{" "}
                <textarea
                  id="description"
                  className="border "
                  {...register("description")}
                ></textarea>{" "}
                <p>✔️მინიმუმ ხუთი სიტყვა</p>
              </label>

              <label htmlFor="image">ატვირთეთ ფოტო *</label>
              <div className="border border-dashed h-30 w-full flex justify-center items-center">
                {image?.[0] ? (
                  <img
                    className="w-[100px]"
                    src={URL.createObjectURL(image[0])}
                    alt="apartment picture"
                  />
                ) : (
                  <label htmlFor="image">
                    <img src="/images/plus-circle.svg" alt="" />
                  </label>
                )}

                <input type="file" hidden id="image" {...register("image")} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="agent_id">ჩაწერე აგენტის აიდი</label>
            <input type="text" className="border" {...register("agent_id")} />
          </div>
          <button type="submit" className="border mt-6">
            ლისტინგის დამატება
          </button>
        </form>
      </div>
    </>
  );
}

export default AddListing;
