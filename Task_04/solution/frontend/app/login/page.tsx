"use client";
import LoginPage from "@/components/Authorization/LoginPage";
import authStore from "@/stores/AuthSore";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = observer(() => {
  const router = useRouter();
  useEffect(() => {
    authStore.isAuthenticated ? router.replace("/") : "";
  }, [authStore.isAuthenticated]);
  return (
    <>
      <LoginPage />
    </>
  );
});
export default Login;
