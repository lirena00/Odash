import { GoogleIcon } from "@/components/Icons/GoogleIcon";

const Search = ({ theme }: { theme: string }) => {
  return (
    <div
      className={`widget-header w-full h-full flex gap-2 rounded-md ${
        theme === "dark"
          ? "dark"
          : theme === "light"
          ? "light"
          : "bg-accent text-solid-text"
      } `}
    >
      <div className="text-2xl grid place-items-center w-fit px-2 py-1">
        <GoogleIcon />
      </div>
      <input
        type="text"
        className={`w-full bg-transparent outline-none `}
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
