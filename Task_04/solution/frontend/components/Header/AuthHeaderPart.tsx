"use client";

import AuthService from "@/services/AuthService";
import authStore from "@/stores/AuthSore";
import UserType from "@/types/UserType";

export default function AuthHeaderPart({ user }: { user: UserType | null }) {
  const handleLogout = async () => {
    try {
      await AuthService.logout();
      authStore.logout();
    } catch {}
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      <span className="text-4xl cursor-default animated-gradient">
        {user?.first_name}
      </span>
      <button
        onClick={handleLogout}
        className="standart-button font-semibold hover:border-red-600"
      >
        Logout
      </button>
    </div>
  );
}
