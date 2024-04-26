import {
  InformationCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";

import LayoutContent from "../layouts/layout-content";
import { Send2Icon } from "../components/icons";
import { BreadcrumbsMenu } from "../components";
import { getAllRequests } from "../core/api/api";
import {
  RequestPaginate,
  RequestResponse,
} from "../core/entities/request.entities";
import React from "react";
import { SpinnerLoader } from "../components/spinner-loader";
import { PaginationCustom } from "../components/pagination-custom";
import { formatDate } from "../utils/common";
import { RequestInfos } from "../components/request-infos";
import { isEmpty } from "lodash";

const TABLE_HEAD = [
  "Code",
  "Civilité",
  "Nom et Prénom",
  "Téléphone",
  "Statut",
  "Type d'usager",
  "Créer le",
  "Actions",
];

// const TABLE_ROWS = [
//   {
//     name: "CD000000001",
//     amount: "5,000",
//     date: "Wed 1:00pm",
//     status: "paid",
//     account: "orange",
//     expiry: "06/2026",
//   },
//   {
//     name: "CD000000001",
//     amount: "5,000",
//     date: "Wed 1:00pm",
//     status: "paid",
//     account: "mtn",
//     expiry: "06/2026",
//   },
//   {
//     name: "CD000000001",
//     amount: "3,400",
//     date: "Mon 7:40pm",
//     status: "pending",
//     account: "mtn",
//     expiry: "06/2026",
//   },
//   {
//     name: "CD000000001",
//     amount: "1,000",
//     date: "Wed 5:00pm",
//     status: "paid",
//     account: "orange",
//     expiry: "06/2026",
//   },
//   {
//     name: "CD000000001",
//     amount: "14,000",
//     date: "Wed 3:30am",
//     status: "cancelled",
//     account: "orange",
//     expiry: "06/2026",
//   },
// ];

export function RequestsPage() {
  const [query, setQuery] = React.useState<string>("");
  const [page, setPage] = React.useState<number>(1);
  const [request, setRequest] = React.useState<RequestResponse>();
  const [openInfoModal, setOpenInfoModal] = React.useState(false);

  const {
    data: requestsData,
    isLoading: isLoadingRequests,
    error,
  } = useQuery<RequestPaginate>({
    queryKey: ["all-requests", query],
    queryFn: () => getAllRequests(query),
  });

  const handleChangePage = (item: number) => {
    setPage(item);
    setQuery(`?page=${item}`);
  };

  const handleSelectRequest = React.useCallback((item: RequestResponse) => {
    setRequest(item);
    setOpenInfoModal(true);
  }, []);

  return (
    <LayoutContent>
      <BreadcrumbsMenu
        label="EasyPro Admin"
        name="Demandes"
        path="/dashboard/requests"
      />
      <Card placeholder={""} className=" shadow-none w-full">
        <CardHeader
          placeholder={""}
          floated={false}
          shadow={false}
          className="rounded-none"
        >
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="flex gap-x-2">
                <Send2Icon className="" />
                <Typography placeholder={""} variant="h5" color="blue-gray">
                  Demandes
                </Typography>
              </div>
              <Typography
                placeholder={""}
                color="gray"
                className="mt-1 font-normal"
              >
                Consulter l'ensemble des demandes
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Code, Region..."
                  crossOrigin={""}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        {isLoadingRequests ? (
          <SpinnerLoader size="lg" />
        ) : (
          <CardBody placeholder={""} className="overflow-scroll px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                        placeholder={""}
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {requestsData?.results.map((item, index) => {
                  const isLast = index === requestsData?.results.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={item.id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                            placeholder={""}
                          >
                            {item.code}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={""}
                        >
                          {item.civility}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={""}
                        >
                          {item.fullName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={""}
                        >
                          {item.phoneNumber}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={item.status}
                            color={"green"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={""}
                        >
                          {item.typeUser}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={""}
                        >
                          {formatDate(item.created_on)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Plus d'infos">
                          <IconButton
                            onClick={() => handleSelectRequest(item)}
                            variant="text"
                            placeholder={""}
                          >
                            <InformationCircleIcon className="h-8 w-8 text-blue-400" />
                          </IconButton>
                        </Tooltip>
                        {/* <Tooltip content="Supprimer la Demande">
                          <IconButton variant="text" placeholder={""}>
                            <TrashIcon className="h-4 w-4 text-red-400" />
                          </IconButton>
                        </Tooltip> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
            totalPages={Math.floor(requestsData?.count! / 10) + 1}
            page={page}
          />
        </CardFooter>
      </Card>
      {!isEmpty(request) ? (
        <RequestInfos
          request={request}
          handleOpen={() => setOpenInfoModal(!openInfoModal)}
          open={openInfoModal}
        />
      ) : (
        <></>
      )}
    </LayoutContent>
  );
}
