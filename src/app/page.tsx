"use client";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const user = useUserInfo();
  

  useEffect(() => {
    router.push(`/${user?.userId}/overview`);
  }, [router, user?.userId]);
  
  return <></>;
};

export default Home;