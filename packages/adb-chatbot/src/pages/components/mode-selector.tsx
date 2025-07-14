import { ModeEnum } from "../../interface/ModeEnum";

export const ModeSelector = ({
  mode,
  setMode,
}: {
  mode: ModeEnum;
  setMode: (mode: ModeEnum) => void;
}) => {
  return (
    <span className="flex px-4 justify-center border rounded-2xl">
      <select
        name="narrate-options"
        id="narrate-options"
        className="border-none active:border-none active:border-0 active:border-transparent focus:outline-none focus:border-none cursor-pointer"
        value={mode}
        onChange={(e) => setMode(e.target.value as ModeEnum)}
      >
        {[...Object.values(ModeEnum)].map((option) => (
          <option className="dark:bg-gray-800" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </span>
  );
};
