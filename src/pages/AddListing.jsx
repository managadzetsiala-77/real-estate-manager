import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRegions, getCities, createAppartment } from "../api/appartments";
import { useEffect, useMemo } from "react";
import { getAgents } from "../api/appartments";
import { Link } from "react-router-dom";
import Button from "../components/Button";


//validation form appartment form
const schema = yup.object({
  address: yup
    .string()
    .required("შევსება სავალდებულოა")
    .min(2, "მინიმუმ ორი სიმბოლო"),

  zip_code: yup
    .string()
    .required("შევსება სავალდებულოა")
    .matches(/^\d+$/, "მხოლოდ რიცხვები"),

  price: yup
    .string()
    .required("ფასი სავალდებულოა")
    .matches(/^\d+$/, "მხოლოდ რიცხვები"),
  area: yup
    .string()
    .required("შევსება სავალდებულოა")
    .matches(/^\d+$/, "მხოლოდ რიცხვები"),
  bedrooms: yup
    .string()
    .required("შევსება სავალდებულოა")
    .matches(/^\d+$/, "მხოლოდ რიცხვები"),
  description: yup
    .string()
    .required("შევსება სავალდებულოა")
    .min(5, "მინიმუმ ხუთი სიტყვა"),
  image: yup
    .mixed()
    .required("სურათის ატვირთვა სავალდებულოა")
    .test("fileType", "მხოლოდ სურათები (jpg, jpeg, png)", (value) => {
      if (!value || value.length === 0) {
        return false; // სურათი აუცილებელია
      }
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      return allowedTypes.includes(value[0].type);
    }),
  region_id: yup.string().required("აირჩიეთ რეგიონი"),
  city_id: yup.string().required("აირჩიეთ ქალაქი"),
  agent_id: yup.string().required("აირჩიეთ აგენტი"),
  is_rental: yup.string().required("აირჩიეთ გარიგების ტიპი"),
});

function AddListing() {
  //get regions data
  const {
    isPending: regionisPending,
    error: regionError,
    data: regions,
  } = useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });

  //get cities data
  const {
    isPending: citiesIsPanding,
    error: citiesError,
    data: cities,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });
  // console.log(cities);
  //get agents data
  const { data: agents } = useQuery({
    queryKey: ["agents"],
    queryFn: getAgents,
  });

  //create appartment
  const addListing = useMutation({
    mutationFn: (data) => createAppartment(data),
  });

  //react hook form to fill appartments form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { is_rental: "0" },
  });
  //watching inputfileds(region,city,image)
  const region = watch("region-id");
  const city = watch("city_id");
  const image = watch("image");

  //select correct region when city is olready selectsd
  useEffect(() => {
    if (city) {
      const selectedCity = cities?.find((item) => item.id == city);
      setValue("region_id", selectedCity.region_id);
    }
  }, [city, cities, setValue]);

  //select correct cities when regions is select
  const filteredCities = useMemo(() => {
    const selectedRegion = region !== "";

    if (selectedRegion) {
      return cities?.filter((city) => city.region_id == region);
    }
    return cities;
  }, [region, cities]);
  // console.log(filteredCities);
  //handle appartment form submit
  function sabmitHandler(data) {
    //format data in correct form
    const correctData = formatData(data);

    //send correct formated data in API
    addListing.mutate(correctData, {
      onSuccess: () => {
        reset();
      },
      onError: (err) => {
        console.error("Mutation error:", err);
      },
    });
  }
  return (
    <>
      <div className="mt-15.5  flex flex-col items-center">
        <h2 className="text-[32px] font-medium text-[#021526]">
          ლისტინგის დამატება
        </h2>

        <form className="max-w-197.5 " onSubmit={handleSubmit(sabmitHandler)}>
          <div>
            {/* start space to choose agriment type */}
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
            {/* end space to choose agriment type */}

            {/* starts space to choose location */}
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
                  <div className="flex items-center gap-1.75">
                  <img src="/images/vector.svg" alt="" />
                  <p className={`${errors.address && "text-red-500 "}`}>
                    {" "}
                    {errors.address
                      ? errors.address.message
                      : " მინიმუმ ორი სიმბოლო"}
                  </p>
                  </div>
                  
                </div>
                <div className="flex flex-col">
                  <label htmlFor="zip_code">საფოსტო ინდექსი *</label>
                  <input
                    className="border"
                    type="text"
                    id="zip_code"
                    {...register("zip_code")}
                  />
                  <div className="flex items-center gap-1.75">
                  <img src="/images/vector.svg" alt="" />
                  <p className={errors.zip_code && "text-red-500"}>
                    {" "}
                    {errors.zip_code
                      ? errors.zip_code.message
                      : "მხოლოდ რიცხვები "}
                  </p>
                  </div>
                  
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
                  <div className="flex items-center gap-1.75">
                  <img src="/images/vector.svg" alt="" />
                  <p className={errors.region_id && "text-red-500"}>
                    {errors.region_id
                      ? errors.region_id.message
                      : "რეგიონი აუცილებელია"}
                  </p>
                  </div>
                  
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
                  <div className="flex items-center gap-1.75">
                  <img src="/images/vector.svg" alt="" />
                  <p className={errors.city_id && "text-red-500"}>
                    {errors.city_id
                      ? errors.city_id.message
                      : "ქალაქი აუცილებელია"}
                  </p>
                  </div>
                 
                </div>
              </div>
            </div>
            {/* end space to choose location */}

            {/* start space to add appartment details */}
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
                  <div className="flex items-center gap-1.75">
                    <img src="/images/vector.svg" alt="" />
                    <p className={errors.price && "text-red-500"}>
                    {errors.price ? errors.price.message : "მხოლოდ რიცხვები"}
                  </p>
                  </div>
                 
                </label>

                <label className="flex flex-col " htmlFor="area">
                  ფართობი{" "}
                  <input
                    className="border"
                    type="text"
                    id="area"
                    {...register("area")}
                  />{" "}
                  <div className="flex items-center gap-1.75">
                    <img src="/images/vector.svg" alt="" />
                    <p className={errors.area && "text-red-500"}>
                    {errors.area ? errors.area.message : "მხოლოდ რიცხვები"}
                  </p>
                  </div>
                  
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
                <div className="flex items-center gap-1.75">
                  <img src="/images/vector.svg" alt="" />
                  <p className={errors.bedrooms && "text-red-500"}>
                  {errors.bedrooms
                    ? errors.bedrooms.message
                    : "მხოლოდ რიცხვები"}
                </p>
                </div>
               
              </label>
              <label htmlFor="description" className="flex flex-col  ">
                აღწერა *{" "}
                <textarea
                  id="description"
                  className="border "
                  {...register("description")}
                ></textarea>{" "}
                <div className="flex items-center gap-1.75">
                  <img src="/images/vector.svg" alt="" />
                  <p className={errors.description && "text-red-500"}>
                  {errors.description
                    ? errors.description.message
                    : "მინიმუმ ხუთი სიტყვა"}
                </p>
                </div>
                
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
              <div className="flex items-center gap-1.75 mt-1.75">
              <img src="/images/vector.svg" alt="" />
              <p className={errors.image && "text-red-500"}>
                {errors.image ? errors.image.message : "ფოტო აუცილებელია"}
              </p>
              </div>
             
            </div>
          </div>
          {/* end space to add appartment details */}

          {/* start space to achoose agent */}

          <div className="flex flex-col gap-2 items-start">
            <label htmlFor="agent_id">აირჩიე აგენტი</label>
            {/* <input type="text" className="border" {...register("agent_id")} /> */}
            <select name="" id="" className="border " {...register("agent_id")}>
              <option value="">აირჩიე</option>
              {agents?.map((agent) => {
                return (
                  <option
                    value={agent.id}
                    key={agent.id}
                  >{`${agent.name} ${agent.surname}`}</option>
                );
              })}
            </select>
            <div className="flex items-center gap-1.75">
              <img src="/images/vector.svg" alt="" />
              <p className={errors.agent_id && "text-red-500"}>
              {errors.agent_id ? errors.agent_id.message : "აგენტი აუცილებელია"}
            </p>
            </div>
            
          </div>
          {/* end space to achoose agent */}
         <div className="flex justify-end gap-3 mt-22.75">
         <Link
            to="/"
            className="inline-flex h-11.75 items-center justify-center rounded-[10px] border border-[#F93B1D] px-4 text-[16px] font-medium text-[#F93B1D] transition hover:bg-[#FFF1EE]"
          >
            გაუქმება
          </Link>
          <Button type="submit" color={"orange" } className="border mt-6">
            ლისტინგის დამატება
          </Button>
         </div>
        </form>
      </div>
    </>
  );
}

//format data in correct form
function formatData(data) {
  //create formData object to solve image uploude image correct format
  const formData = new FormData();
  //append form filed  values in form data object
  formData.append("region_id", +data.region_id);
  formData.append("city_id", +data.city_id);
  formData.append("price", +data.price);
  formData.append("address", data.address);
  formData.append("zip_code", data.zip_code);
  formData.append("description", data.description);
  formData.append("area", +data.area);
  formData.append("bedrooms", +data.bedrooms);
  formData.append("is_rental", +data.is_rental);
  formData.append("agent_id", +data.agent_id);
  formData.append("image", data.image[0]);

  return formData;
}

export default AddListing;
