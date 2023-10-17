"use client";
import RegisterPage from "@/components/Authorization/RegisterPage";
import authStore from "@/stores/AuthSore";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Register = observer(() => {
  const router = useRouter();
  useEffect(() => {
    authStore.isAuthenticated ? router.replace("/") : "";
  }, [authStore.isAuthenticated]);
  return (
    <>
      <RegisterPage />
    </>
  );
});

export default Register;
