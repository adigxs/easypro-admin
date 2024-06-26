import { useLocation } from "react-router-dom";
import {
  CoinIcon,
  GroupIcon,
  PeopleIcon,
  Profile2Icon,
  Send2Icon,
} from "../components/icons";
import classNames from "classnames";

const navigations = [
  {
    icon: GroupIcon,
    href: "/dashboard/admin",
    name: "Dashboard",
  },
  {
    icon: Send2Icon,
    href: "/dashboard/requests-started",
    name: "Demandes Créées",
  },
  {
    icon: Send2Icon,
    href: "/dashboard/requests",
    name: "Demandes Traitées",
  },
  {
    icon: CoinIcon,
    href: "/dashboard/compta",
    name: "Comptabilité",
  },
  {
    icon: PeopleIcon,
    href: "/dashboard/agents",
    name: "Agents",
  },
  // { icon: Profile2Icon, href: "/dashboard/users", name: "Utilisateurs" },
];

interface AsideProps {
  close: boolean;
}

export default function Aside({ close }: AsideProps) {
  const location = useLocation();
  return (
    <aside
      className={classNames(
        { "hidden ": close },
        { "md:flex ": !close },
        "hidden transition-all duration-700 ease-in-out w-[24%] lg:w-[8%] xl:w-[8%] h-96 fixed bg-white px-2 rounded-lg py-2 left-4 inset-0 my-auto flex-col justify-between top-0 z-20"
      )}
    >
      <div className=" rounded-md grid grid-cols-1 divide-y w-full gap-y-2 h-full relative">
        {navigations.map((item, key) => {
          return (
            <a
              key={key}
              href={item.href}
              className={classNames(
                { "bg-primary-100": location.pathname === item.href },
                "flex flex-col justify-center items-center group hover:bg-primary-100/80 cursor-pointer rounded-xs"
              )}
            >
              <item.icon
                className={classNames(
                  { "text-white": location.pathname === item.href },
                  "group-hover:text-white"
                )}
              />
              <span
                className={classNames(
                  { "text-white": location.pathname === item.href },
                  "group-hover:text-white text-center"
                )}
              >
                {item.name}
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
