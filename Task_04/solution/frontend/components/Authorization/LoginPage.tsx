"use client";
import { useState } from "react";
import InputBlock from "./InputBlock";
import AuthService from "@/services/AuthService";
import authStore from "@/stores/AuthSore";
import UserType from "@/types/UserType";

export default function LoginPage() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (name: string, value: string) => {
    setUserData({ ...userData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const responce = await AuthService.login(userData);
      if (responce.status != 200) {
        setError("Ivalid credentionals");
        return;
      }
      authStore.login(responce.data as UserType)
    } catch {
      setError("Ivalid credentionals");
    }
  };

  return (
    <div className="container flex justify-center items-center m-auto">
      <form
        onSubmit={handleSubmit}
        className="p-10 m-auto mt-10 rounded-lg flex flex-col gap-3 justify-center items-center bg-main relative z-40 main-block"
      >
        <h3 className="text-3xl text-center font-extrabold animated-gradient">
          LOGIN
        </h3>
        <hr className="border border-secondary w-full mb-4" />
        <InputBlock
          header="Email"
          placeholder="Email"
          type="text"
          onChange={(val) => handleInputChange("username", val)}
        />
        <InputBlock
          header="Password"
          placeholder="Password"
          type="password"
          onChange={(val) => handleInputChange("password", val)}
        />
        <span className="text-red-500">{error}</span>
        <button
          type="submit"
          className="py-2 px-4 border border-secondary hover:border-green-500 w-fit h-fit rounded-md hover:scale-105 duration-500 mt-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}
