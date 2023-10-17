"use client";
import { observer } from "mobx-react";
import authStore from "@/stores/AuthSore";
import { useRouter } from "next/navigation";
import UsersService from "@/services/UsersService";

const AuthChecker = observer(({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  UsersService.getMe()
    .then((res) => {
      authStore.login(res.data);
    })
    .catch((err) => {});
  return <>{children}</>;
});
export default AuthChecker;
