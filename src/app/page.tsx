import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
const HomePage = async () => {
  const user = await getCurrentUser();
  console.log(user);
  return (
    <div>
      HomePage
      {user && <p>Welcome, {user.name}</p>}
    </div>
  );
};
export default HomePage;
