import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { ClipboardDocumentIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface ShowPasswordDialogProps {
  name: string;
  password: string;
  handleOpen: () => void;
  open: boolean;
}

export function ShowPasswordDialog({
  name,
  password,
  open,
  handleOpen,
}: ShowPasswordDialogProps) {
  const [copied, setCopied] = React.useState(false);
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
            <Typography
              variant="h4"
              className="text-sm font-light"
              color="blue-gray"
              placeholder={""}
            >
              Le mot de passe de{" "}
              <span className="text-base font-medium">{name}</span> est:
            </Typography>

            <div className="flex items-start justify-between w-full">
              <Typography className="-mb-2" variant="h6" placeholder={""}>
                {password}
              </Typography>
              <div className="relative">
                <CopyToClipboard text={password} onCopy={() => setCopied(true)}>
                  <ClipboardDocumentIcon className="h-6 w-6 cursor-pointer" />
                </CopyToClipboard>
                {copied ? (
                  <span className="absolute -left-2 font-normal text-red-500 text-sm">
                    Copied
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-5" placeholder={""}>
            <Button
              variant="gradient"
              color={"red"}
              fullWidth
              onClick={handleOpen}
              placeholder={""}
            >
              Quitter
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
