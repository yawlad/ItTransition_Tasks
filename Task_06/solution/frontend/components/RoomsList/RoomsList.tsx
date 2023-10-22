"use client";
import ImageService from "@/services/ImageService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MutableRefObject, useEffect, useRef, useState } from "react";

const RoomsList = () => {
  const router = useRouter();
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState("");
  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    ImageService.getImages().then((res) => {
      const data = res.data;
      setSessions(data);
    });
  });
  const createButtonHandler = () => {
    if (sessions.some((el) => el == nameRef.current.value)) {
      setError("Name is already exists");
      return;
    }
    router.push(nameRef.current.value);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="m-auto w-fit p-10 main-block-light rounded-md">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl">AvaibleBoards:</h3>
          <ul className="flex flex-col gap-2">
            {sessions.map((session) => {
              return (
                <li key={session}>
                  <Link href={session}>Room ({session})</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pt-4 w-full flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <input
              ref={nameRef}
              className={`rounded-full px-4 py-1 focus:outline-none text-main ${
                error ? "outline-red-500" : ""
              }`}
              type="text"
              placeholder="Room Name"
            />
            <span className="text-xs text-red-500">{error}</span>
          </div>

          <button
            onClick={createButtonHandler}
            className="standart-button w-full text-center"
          >
            Create new Room
          </button>
        </div>
      </div>
    </div>
  );
};
export default RoomsList;
