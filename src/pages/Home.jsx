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
      <div className="px-40 pt-18 flex flex-col items-center">
        <section className="flex justify-end w-full gap-4">
          <Link to={"/add"}>
            <Button color={"orange"}>+ ლისტინგის დამატება</Button>
          </Link>

          <Button color={"white"} hanleClick={() => setIsOpen((prev) => !prev)}>
            + აგენტის დამატება
          </Button>
        </section>

        <section className="pt-8 flex flex-wrap gap-5 justify-center">
          {appartments?.map((appartment) => {
            return <ListingCard key={appartment.id} appartment={appartment} />;
          })}
        </section>

        <div>
          <ListingCard />
        </div>

        {isOpen ? <AgentModal setIsOpen={setIsOpen} /> : ""}
      </div>
    </>
  );
}
