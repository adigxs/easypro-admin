import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { TitleApp } from "../components";
import {
  Burger,
  ChevronDownIcon,
  LogoIcon,
  LogoutIcon,
  MessageIcon,
} from "../components/icons";
import { BellIcon } from "../components/icons/bell-icon";
import { Fragment } from "react";
import classNames from "classnames";
import { useAuthContext } from "../core/context/auth-context";

const user = {
  name: "Chelsea Hagon",
  email: "chelsea.hagon@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

interface HeaderProps {
  closeAside: () => void;
}

const userNavigation = [
  { name: "Votre Profil", href: "#" },
  // { name: "Parametres", href: "#" },
  { name: "Déconnexion", href: "#" },
];

export default function Header({ closeAside }: HeaderProps) {
  const { signOut } = useAuthContext();

  return (
    <header className="text-gray-600 body-font bg-white fixed w-full top-0 z-50">
      <div className="w-full flex flex-wrap px-4 py-2 flex-row justify-between items-center">
        <div className="flex items-center justify-center">
          <Burger
            className="block lg:hidden cursor-pointer"
            onClick={closeAside}
          />
          <Burger
            className="hidden lg:block cursor-pointer"
            onClick={closeAside}
          />
          <Link
            to={"/"}
            className="flex ml-3 title-font gap-x-2 justify-center font-medium items-center text-gray-900 mb-0"
          >
            <TitleApp size="lg" />
          </Link>
        </div>
        <div className="flex items-center">
          {/* <MessageIcon className="cursor-pointer" />
          <div className="relative cursor-pointer">
            <BellIcon />
            <hr className="absolute bg-red-500 w-1.5 h-1.5 rounded-full right-1 top-1" />
          </div> */}
          {/* Profile dropdown */}
          <div className="flex flex-row gap-x-2">
            {/* <LogoIcon className="h-8 w-8" /> */}
            <span className="text-base font-light font-amaranth ">
              Déconnexion
            </span>
            <LogoutIcon
              className="text-red-400 cursor-pointer"
              onClick={() => signOut()}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
