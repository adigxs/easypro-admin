import { InformationCircleIcon } from "@heroicons/react/24/solid";

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
import { BreadcrumbsMenu, SelectedSearch } from "../components";
import { getAllRequests } from "../core/api/api";
import {
  RequestPaginate,
  RequestResponse,
} from "../core/entities/request.entities";
import React, { Fragment, useMemo } from "react";
import { SpinnerLoader } from "../components/spinner-loader";
import { PaginationCustom } from "../components/pagination-custom";
import { formatDate, formatHour } from "../utils/common";
import { RequestInfos } from "../components/request-infos";
import _, { isEmpty, trimEnd } from "lodash";
import {
  CheckIcon,
  ChevronUpDownIcon,
  FunnelIcon,
} from "@heroicons/react/20/solid";
import { Listbox, Popover, Transition } from "@headlessui/react";
import {
  centralFiles,
  formatToYYYYMMDD,
  getCourtByRegion,
  getDepartmentsByRegion,
  regionsDepartments,
  requestStatus,
} from "../utils/mocks";
import classNames from "classnames";

const TABLE_HEAD = [
  "Code",
  "Civilité",
  "Nom et Prénom",
  "Téléphone",
  // "Statut",
  "Heure",
  "Tribunal",
  "Commune de résidence",
  "Quantité d'ECJ",
  "Actions",
];

export function RequestsStartedPage() {
  const [query, setQuery] = React.useState<string>("");
  const [selected, setSelected] = React.useState<{
    value: string;
    name: string;
  }>();
  const [page, setPage] = React.useState<number | null>(1);
  const [request, setRequest] = React.useState<RequestResponse>();
  const [openInfoModal, setOpenInfoModal] = React.useState(false);
  const [region, setRegion] = React.useState<string>("");
  const [department, setDepartment] = React.useState<string>("");
  const [court, setCourt] = React.useState<string>("");
  const [centralFile, setCentralFile] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");
  const [departmentList, setDepartmentList] = React.useState<string[]>([]);
  const [courtList, setCourtList] = React.useState<string[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const {
    data: requestsData,
    isLoading: isLoadingRequests,
    error,
  } = useQuery<RequestPaginate>({
    queryKey: ["all-requests", query],
    queryFn: () => getAllRequests(`?status=STARTED&${query}`),
  });

  const handleChangePage = (item: number) => {
    setPage(item);
    setQuery((prevQuery) => `${prevQuery}&page=${item}`);
  };

  const handleSelectRequest = React.useCallback((item: RequestResponse) => {
    setRequest(item);
    setOpenInfoModal(true);
  }, []);

  const handleRegion = React.useCallback((item: string) => {
    setRegion(item);
    setDepartmentList(getDepartmentsByRegion(item));
    setCourtList(getCourtByRegion(item));
    setDepartment("");
    setCourt("");
    setCentralFile("");
    setStatus("");
    setStartDate("");
    setEndDate("");
  }, []);

  const handleSearch = () => {
    let queryParams = "";

    if (region) {
      queryParams += `region_name=${region}&`;
    }
    if (department !== "Sélectionner") {
      queryParams += `department_name=${department}&`;
    }
    if (court !== "Sélectionner") {
      queryParams += `court_name=${court}&`;
    }
    if (centralFile !== "Sélectionner") {
      queryParams += `central_file=${centralFile}&`;
    }
    if (startDate) {
      queryParams += `start_date=${startDate}&`;
    }
    if (endDate) {
      queryParams += `end_date=${endDate}&`;
    }
    if (status) {
      const statusValue = _.find(requestStatus, { name: status })?.value || "";
      queryParams += `status=${statusValue}&`;
    }

    setPage(1); // Reset to first page when performing a new search
    setQuery(queryParams.slice(0, -1)); // Remove the trailing '&'
  };

  const handleStartDateChange = (event: any) => {
    const formattedDate = formatToYYYYMMDD(event.target.value);
    setStartDate(formattedDate);
  };

  const handleEndDateChange = (event: any) => {
    const formattedDate = formatToYYYYMMDD(event.target.value);
    setEndDate(formattedDate);
  };

  const filterRequest = useMemo(() => {
    if (isEmpty(searchQuery)) {
      return requestsData?.results;
    }

    return requestsData?.results.filter((it: any) =>
      it.code.includes(searchQuery)
    );
  }, [requestsData, searchQuery]);

  return (
    <LayoutContent>
      <BreadcrumbsMenu
        label="EasyPro Admin"
        name="Demandes Créées"
        path="/dashboard/requests"
      />
      <Card placeholder={""} className=" shadow-none w-full">
        <CardHeader
          placeholder={""}
          floated={false}
          shadow={false}
          className="rounded-none mb-2"
          style={{ overflow: "unset" }}
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
                Consulter l'ensemble des demandes créées
              </Typography>
            </div>
          </div>
          <hr />
          <Typography
            placeholder={""}
            color="gray"
            className="font-semibold my-4"
          >
            Filtre de recherche
          </Typography>
          <div className="grid grid-cols-3 xl:grid-cols-5 w-full shrink-0 gap-2 md:w-max">
            <SelectedSearch
              label="Région"
              query={region}
              onSelectQuery={(item) => handleRegion(item)}
              items={_.map(regionsDepartments, "region")}
            />
            <SelectedSearch
              label="Département"
              query={department}
              onSelectQuery={(item) => setDepartment(item)}
              items={departmentList}
            />
            <SelectedSearch
              label="TPGI/TPI"
              query={court}
              onSelectQuery={(item) => setCourt(item)}
              items={courtList}
            />
            <SelectedSearch
              label="Fichier Central"
              query={centralFile}
              onSelectQuery={(item) => setCentralFile(item)}
              items={centralFiles()}
            />

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date de Début
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  onChange={(e) => handleStartDateChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date de Fin
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  onChange={(e) => handleEndDateChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 lg:flex-row items-center justify-between">
            <div className="flex flex-row w-96 gap-4 mt-4 justify-start">
              <Button
                color={"blue"}
                fullWidth
                placeholder={""}
                onClick={() => handleSearch()}
              >
                Appliquer
              </Button>
              <Button
                color={"red"}
                fullWidth
                placeholder={""}
                onClick={() => window.location.reload()}
              >
                Reset
              </Button>
            </div>
            <div>
              <input
                placeholder="Rechercher par code"
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus:outline-none block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </CardHeader>
        {isLoadingRequests ? (
          <SpinnerLoader size="lg" />
        ) : (
          <CardBody placeholder={""} className="overflow-scroll px-0 mt-2">
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
              {!isEmpty(filterRequest!) ? (
                <tbody>
                  {filterRequest!.length! > 0 ? (
                    filterRequest!.map((item, index) => {
                      const isLast = index === filterRequest!.length - 1;
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
                          {/* <td className={classes}>
                            <div className="w-max">
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={
                                  requestStatus.find(
                                    (it) => it.value === item.status
                                  )?.name!
                                }
                                color={"green"}
                              />
                            </div>
                          </td> */}
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              placeholder={""}
                            >
                              {formatHour(item.created_on)}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              placeholder={""}
                            >
                              {item.court}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              placeholder={""}
                            >
                              {item.user_residency_municipality}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                              placeholder={""}
                            >
                              {item.criminalRecordNumber}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Tooltip content="Plus d'infos">
                              <IconButton
                                onClick={() => handleSelectRequest(item)}
                                variant="text"
                                placeholder={""}
                                className=" z-10"
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
                    })
                  ) : (
                    <tr className="text-center">
                      <td colSpan={8}>Aucune données</td>{" "}
                    </tr>
                  )}{" "}
                </tbody>
              ) : (
                <></>
              )}
            </table>
            {isEmpty(requestsData?.results) ? (
              <div className="w-full">
                <p className="text-center w-full">Aucune données</p>
              </div>
            ) : (
              <></>
            )}
          </CardBody>
        )}
        <CardFooter
          placeholder={""}
          className="hidden md:flex items-center justify-center p-4"
        >
          <PaginationCustom
            prevPage={(index) => handleChangePage(index - 1)}
            nextPage={(index) => handleChangePage(index + 1)}
            changePage={handleChangePage}
            totalPages={Math.floor(requestsData?.count! / 10) + 1}
            page={page!}
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
