import Image from "next/image";
import Cat from "../../public/cat.svg";

export function CatImage() {
  return <Image src={Cat} alt="Cat" />;
}
