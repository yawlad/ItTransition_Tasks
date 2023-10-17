"use client";
import { useState } from "react";
import InputBlock from "./InputBlock";
import AuthService from "@/services/AuthService";
import UserType from "@/types/UserType";
import { useRouter } from "next/navigation";
import { AxiosError, AxiosResponse } from "axios";

export default function RegisterPage() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    password_repeat: "",
    first_name: "",
    last_name: "",
    position: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
    password_repeat: "",
    first_name: "",
    last_name: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setUserData({ ...userData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newValidationErrors = {
      email: validateEmail(userData.email) ? "" : "Enter correct email",
      password: userData.password ? "" : "Enter password",
      password_repeat:
        userData.password === userData.password_repeat
          ? ""
          : "Passwords don't match",
      first_name: userData.first_name ? "" : "Enter your firstname",
      last_name: userData.first_name ? "" : "Enter your lastname",
    };

    setValidationErrors(newValidationErrors);
    if (Object.values(newValidationErrors).some((error) => error !== ""))
      return;

    try {
      await AuthService.register(userData);
      router.replace("/login/")
      
    } catch (error: any) {
      if(error.response.status == 400){
        console.log(error)
        setValidationErrors({ ...validationErrors, email: "Email is Already Taken" });
      }
      
    }
  };

  return (
    <div className="container flex justify-center items-center m-auto">
      <form
        className="p-10 m-auto mt-10 rounded-lg flex flex-col gap-3 justify-center items-center bg-main relative z-40 main-block"
        onSubmit={handleSubmit}
      >
        <h3 className="text-3xl text-center font-extrabold animated-gradient">
          REGISTER
        </h3>
        <hr className="border border-secondary w-full mb-4" />
        <InputBlock
          header="* Email"
          placeholder="Email"
          type="text"
          onChange={(value) => handleInputChange("email", value)}
          error={validationErrors.email}
        />
        <InputBlock
          header="* Password"
          placeholder="Password"
          type="password"
          onChange={(value) => handleInputChange("password", value)}
          error={validationErrors.password}
        />
        <InputBlock
          header="* Repeat password"
          placeholder="Password"
          type="password"
          onChange={(value) => handleInputChange("password_repeat", value)}
          error={validationErrors.password_repeat}
        />
        <InputBlock
          header="* First Name"
          placeholder="First Name"
          type="text"
          onChange={(value) => handleInputChange("first_name", value)}
          error={validationErrors.first_name}
        />
        <InputBlock
          header="* Last Name"
          placeholder="Last Name"
          type="text"
          onChange={(value) => handleInputChange("last_name", value)}
          error={validationErrors.last_name}
        />
        <InputBlock
          header="Position"
          placeholder="Position"
          type="text"
          onChange={(value) => handleInputChange("position", value)}
        />
        <button
          type="submit"
          className="py-2 px-4 hover:border-green-500 standart-button"
        >
          Register
        </button>
      </form>
    </div>
  );
}
