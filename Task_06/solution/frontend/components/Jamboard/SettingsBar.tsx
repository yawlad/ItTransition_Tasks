"use client";
import toolState from "@/stores/ToolsState";

const SettingsBar = () => {
  return (
    <div className="relative z-50 flex gap-5 justify-center main-block p-2 border-t-gray-500 border-t-[1px]">
      <div className="flex gap-5">
        Line width:
        <input
          className="text-main"
          defaultValue={1}
          type="number"
          min={1}
          max={30}
          onChange={(e) => toolState.setLineWidth(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default SettingsBar;
