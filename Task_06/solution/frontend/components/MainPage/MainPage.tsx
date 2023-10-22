"use client";

import RoomsList from "../RoomsList/RoomsList";
import { useEffect } from "react";
import toolState from "@/stores/ToolsState";

const MainPage = () => {
  useEffect(() => {
    toolState.setTool(null);
  });
  return (
    <div>
      <RoomsList />
    </div>
  );
};
export default MainPage;
