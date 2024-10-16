"use client";
import useUserId from "@/hooks/useUserId";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const userId = useUserId();

  useEffect(() => {
    router.replace(`/${userId}/overview`);
  });
  
  return <></>;
};

export default Home;