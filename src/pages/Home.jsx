import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AgentModal from "../components/AgentModal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Link to={"/add"}>
        <Button color={"orange"}>+ ლისტინგის დამატება</Button>
      </Link>

      <Button color={"white"} hanleClick={() => setIsOpen((prev) => !prev)}>
        + აგენტის დამატება
      </Button>
      {isOpen ? <AgentModal setIsOpen={setIsOpen} /> : ""}
    </>
  );
}
