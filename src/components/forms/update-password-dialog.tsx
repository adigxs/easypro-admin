import React from "react";
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
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { isNil } from "lodash";

import { useMutation } from "@tanstack/react-query";
import AlertNotification from "../alert-notification";
import { SpinnerLoader } from "../spinner-loader";
import { UserPasswordRequest } from "../../core/entities/user";
import { updateUserPassword } from "../../core/api/api";

interface UpdatePasswordDialogProps {
  userId: string;
  handleOpen: () => void;
  open: boolean;
}

export function UpdatePasswordDialog({
  userId,
  open,
  handleOpen,
}: UpdatePasswordDialogProps) {
  const [currentPassword, setCurrentPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);

  const { mutate: updateUserMutate, isPending } = useMutation({
    mutationFn: (updatePassword: UserPasswordRequest) => {
      return updateUserPassword(userId, updatePassword);
    },
    onSuccess(data) {
      //   if (data.status === 200) {
      //     toast("The password was changed successfully", { type: "success" });
      //     handleOpen();
      //   } else {
      //     setErrorMessage(data.message);
      //     setOpenAlert(true);
      //   }
    },
    onError(error) {},
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setOpenAlert(false);

    updateUserMutate({
      newPassword: newPassword,
      currentPassword: currentPassword,
    });
  };

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
        <form onSubmit={handleSubmit}>
          <Card className="mx-auto w-full max-w-[24rem]" placeholder={""}>
            <CardBody className="flex flex-col gap-4" placeholder={""}>
              <Typography variant="h4" color="blue-gray" placeholder={""}>
                Mettre a jour le mot de passe
              </Typography>

              <AlertNotification
                open={openAlert}
                handleOpen={() => setOpenAlert(!openAlert)}
                content={errorMessage}
                color={"red"}
                type={"danger"}
              >
                {" "}
              </AlertNotification>

              <Typography className="-mb-2" variant="h6" placeholder={""}>
                Ancien mot de passe
              </Typography>
              <Input
                label="Mot de password"
                size="lg"
                required
                disabled={isPending}
                onChange={(e) => setCurrentPassword(e.target.value)}
                crossOrigin=""
              />
              <Typography className="-mb-2" variant="h6" placeholder={""}>
                Nouveau mot de passe
              </Typography>
              <Input
                label="Mot de passe"
                size="lg"
                required
                disabled={isPending}
                onChange={(e) => setNewPassword(e.target.value)}
                crossOrigin=""
              />
            </CardBody>
            <CardFooter className="pt-0" placeholder={""}>
              <Button
                variant="gradient"
                color={"yellow"}
                fullWidth
                type="submit"
                placeholder={""}
              >
                {!isPending ? "Modifier" : <SpinnerLoader size="sm" />}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}
