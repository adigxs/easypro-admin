import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
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
import { isEmpty, isNil } from "lodash";
import { UpdatePasswordDialog } from "../components/forms/update-password-dialog";
import { SpinnerLoader } from "../components/spinner-loader";
import { PaginationCustom } from "../components/pagination-custom";

const TABLE_HEAD = ["Nom & Email", "Télèphone", "Région", "Créer le", ""];

export function AgentPage() {
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [openUpadeSignUp, setOpenUpdateSignUp] = React.useState(false);
  const [openUpadePassword, setOpenUpdatePassword] = React.useState(false);
  const [query, setQuery] = React.useState<string>("");
  const [agent, setAgent] = React.useState<User>();
  const [page, setPage] = React.useState<number>(1);

  const {
    data: agentsData,
    isLoading: isLoadingAgents,
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
    setAgent(item);
    setOpenUpdateSignUp(true);
  }, []);

  const handleChangePage = (item: number) => {
    console.log(item);
    setPage(item);
    setQuery(`?page=${item}`);
  };

  const handleUpdatePassword = React.useCallback((item: any) => {
    setAgent(item);
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
          {isLoadingAgents ? (
            <SpinnerLoader size="lg" />
          ) : (
            <CardBody placeholder={""} className="overflow-scroll px-0">
              {!isEmpty(agentsData) ? (
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
                    {agentsData?.results.map((item, index) => {
                      const isLast = index === agentsData?.results.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={item.id}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              {/* <Avatar
                              placeholder={""}
                              src={item.img}
                              alt={item.name}
                              size="sm"
                            /> */}
                              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-400 text-white">
                                {item.first_name?.slice(0, 1) +
                                  item.last_name.slice(0, 1)}
                              </div>
                              <div className="flex flex-col">
                                <Typography
                                  placeholder={""}
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {item.first_name + " " + item.last_name}
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
                                {item.region}
                              </Typography>
                              <Typography
                                placeholder={""}
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {item.court}
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
                              {item.createdAt}
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
              ) : (
                <span>Aucune Données</span>
              )}
            </CardBody>
          )}
          <CardFooter
            placeholder={""}
            className="hidden md:flex items-center justify-center border-t border-blue-gray-50 p-4"
          >
            <PaginationCustom
              prevPage={(index) => handleChangePage(index - 1)}
              nextPage={(index) => handleChangePage(index + 1)}
              changePage={handleChangePage}
              totalPages={Math.floor(agentsData?.count! / 10) + 1}
              page={page}
            />
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
        user={agent}
        title="Mettre à jour cet agent"
        description="Mettez à jour votre nom complet et votre adresse e-mail."
        action="edit"
      />
      {!isNil(agent) ? (
        <UpdatePasswordDialog
          userId={agent.id!}
          open={openUpadePassword}
          handleOpen={() => setOpenUpdatePassword(!openUpadePassword)}
        />
      ) : (
        <></>
      )}
    </>
  );
}
