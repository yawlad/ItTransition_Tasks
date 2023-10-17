"use client";
import Logo from "./Logo";
import AuthHeaderPart from "./AuthHeaderPart";
import NonAuthHeaderPart from "./NonAuthHeaderPart";
import { observer } from "mobx-react";
import authStore from "@/stores/AuthSore";

const Header = observer(() => {
  return (
    <header className="relative z-50">
      <div className="container m-auto flex justify-between items-center p-4 pb-0 ">
        <Logo></Logo>
        {authStore.isAuthenticated ? (
          <AuthHeaderPart user={authStore.user} />
        ) : (
          <NonAuthHeaderPart />
        )}
      </div>
      <hr className="border-[#ffffff22]" />
    </header>
  );
});

export default Header;
