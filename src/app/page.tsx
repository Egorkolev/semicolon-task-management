"use client";
import useUserId from "@/hooks/useUserId";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const userId = useUserId();
  router.replace(`/${userId}/overview`);
  return <></>;
};

export default Home;