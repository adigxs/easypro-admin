import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { RequestResponse } from "../core/entities/request.entities";

interface RequestInfosProps {
  request: RequestResponse;
  handleOpen: () => void;
  open: boolean;
}

export function RequestInfos({ open, handleOpen, request }: RequestInfosProps) {
  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none relative"
        placeholder={""}
      >
        <div className="flex items-center gap-2 bg-gray-500 rounded-lg absolute right-0 -top-4 z-50">
          <IconButton
            variant="text"
            size="sm"
            onClick={handleOpen}
            placeholder={""}
          >
            <XMarkIcon color="white" className="h-6" />
          </IconButton>
        </div>
        <Card className="mx-auto w-full max-w-[24rem]" placeholder={""}>
          <CardBody className="flex flex-col gap-4" placeholder={""}>
            <Typography variant="h5" color="blue-gray" placeholder={""}>
              Requette: {request.code}
            </Typography>
            <hr />
            <Typography className="-mb-2" variant="h6" placeholder={""}>
              Civilité:{" "}
              <span className="font-semibold">{request.civility}</span>
            </Typography>
          </CardBody>
          <CardFooter className="pt-0" placeholder={""}>
            <Button
              variant="gradient"
              color={"blue"}
              fullWidth
              type="submit"
              placeholder={""}
              onClick={handleOpen}
            >
              Fermer
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
