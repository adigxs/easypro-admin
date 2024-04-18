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
import { isEmpty, isNil } from "lodash";

import { useMutation } from "@tanstack/react-query";
import AlertNotification from "../alert-notification";
import { SpinnerLoader } from "../spinner-loader";
import {
  actionsType,
  AgentRequest,
  AgentUpdateRequest,
  User,
} from "../../core/entities/user";
import { createAgent, updateAgent } from "../../core/api/api";

interface SignUpDialogProps {
  handleOpen: () => void;
  open: boolean;
  title: string;
  description: string;
  action: actionsType;
  user?: User | AgentRequest;
  dispatch?: (user: User | AgentUpdateRequest | any) => void;
}

export function SignUpDialog({
  open,
  title,
  description,
  action,
  user,
  handleOpen,
  dispatch,
}: SignUpDialogProps) {
  const [firstname, setFirstName] = React.useState<string>("");
  const [lastname, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);

  const { mutate: createUserMutate, isPending: createUserIsPending } =
    useMutation({
      mutationFn: (userRequest: AgentRequest) => {
        return createAgent(userRequest);
      },
      onSuccess(data) {
        if (!isNil(data.data)) {
          toast("User add", { type: "success" });
          const user = data.data as User;
          dispatch!(user);
          handleOpen();
        } else {
          setErrorMessage(data.message);
          setOpenAlert(true);
        }
      },
      onError(error) {},
    });

  const { mutate: updateUserMutate } = useMutation({
    mutationFn: (userUpdate: AgentUpdateRequest) => {
      return updateAgent(userUpdate.id!, userUpdate);
    },
    onSuccess(data) {
      //   if (!isNil(data.data)) {
      //     toast("User update", { type: "success" });
      //     const user = data.data as User;
      //     dispatch!(user);
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
    if (action === "add") {
      createUserMutate({
        firstname: firstname,
        lastname: lastname,
        username: `${lastname} ${firstname}`,
        email: email,
        password: password,
      });
    } else {
      updateUserMutate({
        id: user!.id,
        lastname: isEmpty(lastname) ? user!.lastname : lastname,
        firstname: isEmpty(firstname) ? user!.firstname : firstname,
        username:
          isEmpty(lastname) || isEmpty(firstname)
            ? `${user!.lastname} ${user!.firstname}`
            : `${lastname} ${firstname}`,
        email: isEmpty(email) ? user!.email : email,
      });
    }
  };

  const content = action === "add" ? "Créer" : "Mise à jour";

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
                {title}
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
                placeholder={""}
              >
                {description}
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
                Nom
              </Typography>
              <Input
                label="Nom"
                size="lg"
                required
                type="text"
                defaultValue={!isEmpty(user) ? user.username : ""}
                disabled={createUserIsPending}
                onChange={(e) => setLastName(e.target.value)}
                crossOrigin=""
              />
              <Typography className="-mb-2" variant="h6" placeholder={""}>
                Prénom
              </Typography>
              <Input
                label="Prénom"
                size="lg"
                required
                type="text"
                defaultValue={!isEmpty(user) ? user.username : ""}
                disabled={createUserIsPending}
                onChange={(e) => setFirstName(e.target.value)}
                crossOrigin=""
              />

              <Typography className="-mb-2" variant="h6" placeholder={""}>
                E-mail
              </Typography>
              <Input
                label="Email"
                size="lg"
                type="email"
                required
                defaultValue={!isEmpty(user) ? user.email : ""}
                disabled={createUserIsPending}
                onChange={(e) => setEmail(e.target.value)}
                crossOrigin=""
              />
              {action === "add" && (
                <>
                  <Typography className="-mb-2" variant="h6" placeholder={""}>
                    Mot de Passe
                  </Typography>
                  <Input
                    label="Mot de passe"
                    size="lg"
                    required
                    disabled={createUserIsPending}
                    onChange={(e) => setPassword(e.target.value)}
                    crossOrigin=""
                  />
                </>
              )}
            </CardBody>
            <CardFooter className="pt-0" placeholder={""}>
              <Button
                variant="gradient"
                color={action === "add" ? "green" : "yellow"}
                fullWidth
                type="submit"
                placeholder={""}
              >
                {!createUserIsPending ? content : <SpinnerLoader size="sm" />}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}
