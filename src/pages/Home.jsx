import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
  return (
    <>
      
<Link to={"/add"}>
<Button color={"orange"}>+ ლისტინგის დამატება</Button>
</Link>
     
      <Button color={"white"}>+ აგენტის დამატება</Button>
     
    </>
  );
}
