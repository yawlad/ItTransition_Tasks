"use client";
import MainPage from "@/components/Main/MainPage";
import { observer } from "mobx-react";
import { useEffect } from "react";
import authStore from "@/stores/AuthSore";
import { useRouter } from "next/navigation";

const Home = observer(() => {
  const router = useRouter();
  useEffect(() => {
    authStore.isAuthenticated ? "" : router.replace("/login/");
  }, [authStore.isAuthenticated]);
  return (
    <>
      <MainPage />
    </>
  );
});

export default Home;
