import { RiBookMarkedLine } from "react-icons/ri";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-5 px-7">
      <a href={"/"}>
        <h1 className="text-2xl font-bold text-white">Book Self</h1>
      </a>
      <div>
        <a href="/library" className="flex items-center gap-2 text-base font-bold text-white">
          <RiBookMarkedLine className="text-xl" />
          <span>Library</span>
        </a>
      </div>
    </nav>
  );
};
