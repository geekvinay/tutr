import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gray-300 h-screen w-screen flex items-center justify-center">
      <Link href={"/teacher"}>
        <Button className="bg-gray-600 mx-4 text-white hover:bg-gray-800">Teacher View</Button>
      </Link>
      <Link href={"/student"}>
        <Button className="bg-gray-600 mx-4 text-white hover:bg-gray-800">Student View</Button>
      </Link>
    </main>
  );
}
