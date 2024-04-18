import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
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
import LayoutContent from "../layouts/layout-content";
import { Send2Icon } from "../components/icons";
import { BreadcrumbsMenu } from "../components";

const TABLE_HEAD = [
  "Code",
  "Item",
  "Item",
  "Status",
  "Fournisseurs",
  "Actions",
];

const TABLE_ROWS = [
  {
    name: "CD000000001",
    amount: "5,000",
    date: "Wed 1:00pm",
    status: "paid",
    account: "orange",
    expiry: "06/2026",
  },
  {
    name: "CD000000001",
    amount: "5,000",
    date: "Wed 1:00pm",
    status: "paid",
    account: "mtn",
    expiry: "06/2026",
  },
  {
    name: "CD000000001",
    amount: "3,400",
    date: "Mon 7:40pm",
    status: "pending",
    account: "mtn",
    expiry: "06/2026",
  },
  {
    name: "CD000000001",
    amount: "1,000",
    date: "Wed 5:00pm",
    status: "paid",
    account: "orange",
    expiry: "06/2026",
  },
  {
    name: "CD000000001",
    amount: "14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "orange",
    expiry: "06/2026",
  },
];

export function RequestsPage() {
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
              {TABLE_ROWS.map(
                ({ name, amount, date, status, account, expiry }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                            placeholder={""}
                          >
                            {name}
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
                          {amount}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          placeholder={""}
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={status}
                            color={
                              status === "paid"
                                ? "green"
                                : status === "pending"
                                ? "amber"
                                : "red"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                            <Avatar
                              src={
                                account === "mtn"
                                  ? "/assets/logos/mtn-logo.png"
                                  : "/assets/logos/om-logo.png"
                              }
                              placeholder={""}
                              size="xxl"
                              alt={account}
                              variant="square"
                              className="h-full w-full object-contain p-1"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal capitalize"
                              placeholder={""}
                            >
                              {account.split("-").join(" ")}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                              placeholder={""}
                            >
                              {expiry}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Supprimer la Demande">
                          <IconButton variant="text" placeholder={""}>
                            <TrashIcon className="h-4 w-4 text-red-400" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter
          placeholder={""}
          className="flex items-center justify-between border-t border-blue-gray-50 p-4"
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
  );
}
