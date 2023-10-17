import Link from "next/link";

export default function NonAuthHeaderPart() {
    return (
      <div className="flex gap-4 items-center justify-center">
        <Link href={"/login"} className="standart-button font-semibold hover:border-white">
          Login
        </Link>
        <Link href={"/register"} className="standart-button font-semibold hover:border-white">
          Register
        </Link>
      </div>
    );
  }
  