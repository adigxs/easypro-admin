import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  LockClosedIcon,
  PencilIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import LayoutContent from "../layouts/layout-content";
import { BreadcrumbsMenu } from "../components";
import { EditIcon, PeopleIcon } from "../components/icons";
import { SignUpDialog } from "../components/forms/sign-up-dialog";
import React from "react";
import { AgentPaginate, AgentUpdateRequest, User } from "../core/entities/user";
import { useQuery } from "@tanstack/react-query";
import { getAllAgents } from "../core/api/api";
import { isNil } from "lodash";
import { UpdatePasswordDialog } from "../components/forms/update-password-dialog";

const TABLE_HEAD = ["Nom & Email", "Télèphone", "TPI/TPGI", "Créer le", ""];

const TABLE_ROWS = [
  {
    img: "/logo512.png",
    name: "John Michael",
    email: "john@tim.com",
    job: "Douala",
    org: "Ndokoti",
    phone: "+237 655413390",
    date: "23/04/18",
  },
  {
    img: "/logo512.png",
    name: "Alexa Liras",
    email: "alexa@tim.com",
    job: "Douala",
    org: "Ndokoti",
    phone: "+237 655413390",
    date: "23/04/18",
  },
  {
    img: "/logo512.png",
    name: "Laurent Perrier",
    email: "laurent@tim.com",
    job: "Douala",
    org: "Ndokoti",
    phone: "+237 655413390",
    date: "19/09/17",
  },
  {
    img: "/logo512.png",
    name: "Michael Levi",
    email: "michael@tim.com",
    job: "Douala",
    org: "Ndokoti",
    phone: "+237 655413390",
    date: "24/12/08",
  },
  {
    img: "/logo512.png",
    name: "Richard Gran",
    email: "richard@tim.com",
    job: "Douala",
    org: "Ndokoti",
    phone: "+237 655413390",
    date: "04/10/21",
  },
];

export function AgentPage() {
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [openUpadeSignUp, setOpenUpdateSignUp] = React.useState(false);
  const [openUpadePassword, setOpenUpdatePassword] = React.useState(false);
  const [query, setQuery] = React.useState<string>("");
  const [user, setUser] = React.useState<User>();

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    refetch: refreshUsers,
    error,
  } = useQuery<AgentPaginate>({
    queryKey: ["all-agents", query],
    queryFn: () => getAllAgents(query),
  });

  const handleResponse = React.useCallback(() => {
    refreshUsers();
  }, [refreshUsers]);

  const handleUpdateResponse = React.useCallback(
    (user: AgentUpdateRequest) => {
      refreshUsers();
    },
    [refreshUsers]
  );

  const handleUpdate = React.useCallback((item: any) => {
    // setUser(item);
    setOpenUpdateSignUp(true);
  }, []);

  const handleUpdatePassword = React.useCallback((item: any) => {
    setUser(item);
    setOpenUpdatePassword(true);
  }, []);

  return (
    <>
      <LayoutContent>
        <BreadcrumbsMenu
          label="EasyPro Admin"
          name="Agents"
          path="/dashboard/agents"
        />
        <Card placeholder={""} className="shadow-none w-full">
          <CardHeader
            placeholder={""}
            floated={false}
            shadow={false}
            className="rounded-none"
          >
            <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="flex gap-x-2">
                  <PeopleIcon className="" />
                  <Typography placeholder={""} variant="h5" color="blue-gray">
                    Agents
                  </Typography>
                </div>
                <Typography
                  placeholder={""}
                  color="gray"
                  className="mt-1 font-normal"
                >
                  Consulter l'ensemble des agents
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <div className="w-full md:w-72">
                  <Input
                    label="Rechercher..."
                    crossOrigin={""}
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
                <Button
                  placeholder={""}
                  className="flex items-center gap-3"
                  size="sm"
                  color="green"
                  onClick={() => setOpenSignUp(true)}
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Ajouter
                  un agent
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody placeholder={""} className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        placeholder={""}
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((item, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={item.name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            placeholder={""}
                            src={item.img}
                            alt={item.name}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              placeholder={""}
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              placeholder={""}
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {item.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            placeholder={""}
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.phone}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            placeholder={""}
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.job}
                          </Typography>
                          <Typography
                            placeholder={""}
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {item.org}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <Typography
                          placeholder={""}
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Update Password">
                          <IconButton
                            variant="text"
                            onClick={() => handleUpdatePassword(item)}
                            placeholder={""}
                          >
                            <LockClosedIcon
                              className="h-6 w-6"
                              color="purple"
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Edit Agent">
                          <IconButton
                            color="blue"
                            placeholder={""}
                            variant="text"
                            onClick={() => handleUpdate(item)}
                          >
                            <EditIcon className="h-6 w-6 text-blue-400" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter
            placeholder={""}
            className="hidden md:flex items-center justify-between border-t border-blue-gray-50 p-4"
          >
            <Button placeholder={""} variant="outlined" size="sm">
              Precedent
            </Button>
            <div className="flex items-center gap-2">
              <IconButton placeholder={""} variant="outlined" size="sm">
                1
              </IconButton>
              <IconButton placeholder={""} variant="text" size="sm">
                2
              </IconButton>
              <IconButton placeholder={""} variant="text" size="sm">
                3
              </IconButton>
              <IconButton placeholder={""} variant="text" size="sm">
                ...
              </IconButton>
              <IconButton placeholder={""} variant="text" size="sm">
                8
              </IconButton>
              <IconButton placeholder={""} variant="text" size="sm">
                9
              </IconButton>
              <IconButton placeholder={""} variant="text" size="sm">
                10
              </IconButton>
            </div>
            <Button placeholder={""} variant="outlined" size="sm">
              Suivant
            </Button>
          </CardFooter>
        </Card>
      </LayoutContent>
      <SignUpDialog
        open={openSignUp}
        handleOpen={() => setOpenSignUp(!openSignUp)}
        dispatch={handleResponse}
        title="Créer un nouvel agent"
        description="Entrez les parametres de connexion de l'agent."
        action="add"
      />
      <SignUpDialog
        open={openUpadeSignUp}
        handleOpen={() => setOpenUpdateSignUp(!openUpadeSignUp)}
        dispatch={handleUpdateResponse}
        user={user}
        title="Mettre à jour cet agent"
        description="Mettez à jour votre nom complet et votre adresse e-mail."
        action="edit"
      />
      {!isNil(user) ? (
        <UpdatePasswordDialog
          userId={user.id!}
          open={openUpadePassword}
          handleOpen={() => setOpenUpdatePassword(!openUpadePassword)}
        />
      ) : (
        <></>
      )}
    </>
  );
}
