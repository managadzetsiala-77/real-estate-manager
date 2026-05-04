import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { createAgent } from "../api/appartments";

const schema = yup.object({
  name: yup.string().required("სახელი აუცილებელია").min(2, "მინიმუმ 2 სიმბოლო"),
  surname: yup
    .string()
    .required("გვარი აუცილებელია")
    .min(2, "მინიმუმ 2 სიმბოლო"),
  email: yup
    .string()
    .required("ელ-ფოსტა აუცილებელია")
    .email("უნდა იყოს ვალიდური ელ-ფოსტა")
    .matches(/@redberry\.ge$/, "უნდა იყოს @redberry.ge ფოსტა"),
    phone: yup
    .string()
    .required("ტელეფონი აუცილებელია")
    .matches(/^5[0-9]{8}$/, "უნდა იწყებოდეს 5-ით და შეიცავდეს 9 ციფრს"),
  avatar: yup
    .mixed()
    .test("required", "ფოტო აუცილებელია", (value) => {
      return value && value.length > 0;
    })
    .test("fileType", "მხოლოდ სურათები დასაშვებია", (value) => {
      if (!value || value.length === 0) return false;
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      return allowedTypes.includes(value[0].type);
    }),
});

export default function AgentModal({ setIsOpen }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addAgent = useMutation({
    mutationFn: (data) => createAgent(data),
  });

  function submit(data) {
    const payLoad = formData(data);
    addAgent.mutate(payLoad, {
      onSuccess: () => {
        setIsOpen(false);
        reset();
      },
      onError: () => {
        console.error("Error creating agent");
      },
    });
  }

  const avatar = watch("avatar");

  return (
    <>
      <div className="flex justify-center items-center absolute top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.5)] backdrop-blur-sm">
        <div className="w-252.25 m-h-5 bg-white rounded-[10px] py-21.75 px-26.25">
          <form onSubmit={handleSubmit(submit)} className="flex flex-col">
            <h1 className="justify-start text-slate-900 text-3xl font-medium font-['FiraGO'] mb-15 text-center">
              აგენტის დამატება
            </h1>

            <div className="flex justify-between mb-7">
              <label className="flex flex-col items-start" htmlFor="name">
                სახელი *
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className={`border ${
                    errors.name ? "border-red-500" : "border-[#808A93]"
                  } w-[384px] rounded-md outline-0 my-1.25 p-2.5`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
                {!errors.name && (
                  <p className="font-normal text-sm mt-1">
                    ✔️ მინიმუმ ორი სიმბოლო
                  </p>
                )}
              </label>

              <label className="flex flex-col items-start" htmlFor="surname">
                გვარი *
                <input
                  type="text"
                  id="surname"
                  {...register("surname")}
                  className={`border ${
                    errors.surname ? "border-red-500" : "border-[#808A93]"
                  } w-[384px] rounded-md outline-0 my-1.25 p-2.5`}
                />
                {errors.surname && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.surname.message}
                  </p>
                )}
                {!errors.surname && (
                  <p className="font-normal text-sm mt-1">
                    ✔️ მინიმუმ ორი სიმბოლო
                  </p>
                )}
              </label>
            </div>

            <div className="flex justify-between mb-7">
              <label className="flex flex-col items-start" htmlFor="email">
                ელ-ფოსტა *
                <input
                  type="text"
                  id="email"
                  {...register("email")}
                  className={`border ${
                    errors.email ? "border-red-500" : "border-[#808A93]"
                  } w-[384px] rounded-md outline-0 my-1.25 p-2.5`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
                {!errors.email && (
                  <p className="font-normal text-sm mt-1">
                    ✔️ გამოიყენეთ @redberry.ge ფოსტა
                  </p>
                )}
              </label>

              <label className="flex flex-col items-start" htmlFor="phone">
                ტელეფონის ნომერი
                <input
                  type="text"
                  id="phone"
                  {...register("phone")}
                  className={`border ${
                    errors.phone ? "border-red-500" : "border-[#808A93]"
                  } w-[384px] rounded-md outline-0 my-1.25 p-2.5`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
                {!errors.phone && (
                  <p className="font-normal text-sm mt-1">
                    ✔️ გამოიყენეთ მხოლოდ ციფრები,უნდა იწყებოდეს "5" - ით და უნდა შედგებოდეს 9 ციფრისგან
                  </p>
                )}
              </label>
            </div>

            <div className="flex flex-col">
              <label htmlFor="avatar">ატვირთეთ ფოტო *</label>
              <div
                className={`border border-dashed h-30 w-full flex justify-center items-center ${
                  errors.avatar ? "border-red-500" : ""
                }`}
              >
                {avatar?.[0] ? (
                  <img
                    className="w-25"
                    src={URL.createObjectURL(avatar[0])}
                    alt="agent picture"
                  />
                ) : (
                  <label htmlFor="avatar">
                    <img src="/images/plus-circle.svg" alt="" />
                  </label>
                )}
                <input type="file" hidden id="avatar" {...register("avatar")} />
              </div>
              {errors.avatar && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.avatar.message}
                </p>
              )}
              {!errors.avatar && (
                <p className="font-normal text-sm mt-1">✔️ ფოტო აუცილებელია</p>
              )}
            </div>

            <div className="mt-22.75 text-right flex justify-end gap-3">
              <Button
                color="white"
                buttonType="reset"
                hanleClick={() => setIsOpen((prev) => !prev)}
              >
                გაუქმება
              </Button>
              <Button color="orange" type="submit">
                დაამატე აგენტი
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function formData(data) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("surname", data.surname);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("avatar", data.avatar[0]);
  return formData;
}
