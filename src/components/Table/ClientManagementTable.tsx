import {
  Avatar,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import * as yup from "yup";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import { InputShowPassword } from "../Form/InputShowPassword";

type ClientData = {
  rut: string;
  email: string;
  name: string;
  lastName: string;
  created_at: Date;
};

type TableContentProps = {
  rut: string;
  name: string;
  lastName: string;
  email: string;
  created_at: Date;
  deleteClient: (rut: string) => void;
};

type UpdateData = {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  name?: string;
  lastName?: string;
};

const updateSchema = yup.object().shape({
  email: yup
    .string()
    .email("El formato debe ser email")
    .required("El email es requerido"),
  name: yup
    .string()
    .required("El nombre es requerido")
    .matches(/^[a-zA-Z\s]+$/g, "El nombre solo puede contener letras"),
  lastName: yup
    .string()
    .required("El apellido es requerido")
    .matches(/^[a-zA-Z\s]+$/g, "El apellido solo puede contener letras"),
  // password: yup.string(),
  // passwordConfirmation: yup
  //   .string()
  //   .oneOf([null, yup.ref("password")], "Las contraseñas no coinciden"),
});

export function ClientManagementTable({
  rut,
  name,
  lastName,
  email,
  created_at,
  deleteClient,
}: TableContentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateData>({
    resolver: yupResolver(updateSchema),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [handleModal, setHandleModal] = useState("profile");

  const currentUser = {
    rut,
    name,
    lastName,
    email,
    created_at,
  };

  const onSubmit: SubmitHandler<UpdateData> = async (data) => {
    // api
    //   .put(`/clients/${currentClient.rut}`, data)
    //   .then((data) => {
    //     if (data.status === 200) {
    //       toastSuccess({ description: "Cliente editado con éxito" });
    //       Router.reload();
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <>
      <Tr>
        <Td>{rut}</Td>
        <Td>{name} </Td>
        <Td>{lastName}</Td>

        <Td display="flex" alignItems={"center"} justifyContent="flex-end">
          <Button
            name="Perfil"
            type="button"
            onClick={() => {
              setHandleModal("profile");
              onOpen();
            }}
            bg="#2e2e2e"
            size="sm"
          />
        </Td>
        <Td>
          <Flex gap={5} justify="flex-end">
            <Flex
              _hover={{
                opacity: 0.8,
              }}
            >
              <MdEdit
                size="25px"
                cursor="pointer"
                onClick={() => {
                  setHandleModal("edit");
                  onOpen();
                }}
              />
            </Flex>
            <Flex
              _hover={{
                opacity: 0.8,
              }}
            >
              <RiDeleteBinLine
                size="25px"
                cursor="pointer"
                onClick={() => {
                  deleteClient(rut);
                }}
              />
            </Flex>
          </Flex>
        </Td>
      </Tr>

      {handleModal === "profile" ? (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="gray.800">
            <ModalHeader>
              <Flex align={"center"} gap={3}>
                <Avatar name={name + " " + lastName} />
                Perfil de {name}
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody gap={2}>
              <Flex flexDir={"column"} flex="1" gap={3}>
                <Flex
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"} fontWeight={"bold"}>
                    Rut:
                  </Text>
                  <Text paddingLeft={1}>{rut}</Text>
                </Flex>

                <Flex
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"} fontWeight={"bold"}>
                    Nombre:
                  </Text>
                  <Text paddingLeft={1}>{name + " " + lastName}</Text>
                </Flex>

                <Flex
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"} fontWeight={"bold"}>
                    Email:
                  </Text>
                  <Text paddingLeft={1}>{email}</Text>
                </Flex>

                <Flex
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"} fontWeight={"bold"}>
                    Descripción
                  </Text>
                  <Text paddingLeft={1}>Nada.</Text>
                </Flex>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                bg="#a70606"
                name="Cerrar"
                border={"none"}
                onClick={onClose}
                w="150px"
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="gray.800">
            <ModalHeader>Editar un cliente</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex
                as="form"
                id="clientForm"
                flexDir="column"
                h="100%"
                w="100%"
                gap={4}
                onSubmit={handleSubmit(onSubmit)}
                mb={!errors.email || !errors.password ? "0" : 4}
              >
                <Input
                  type={"text"}
                  idName="editName"
                  label="Nombre"
                  defaultValue={name}
                  error={errors.name}
                  {...register("name")}
                />
                <Input
                  type={"text"}
                  idName="editLastName"
                  label="Apellido"
                  defaultValue={lastName}
                  error={errors.lastName}
                  {...register("lastName")}
                />

                <Input
                  type="email"
                  idName="editEmail"
                  label="Email"
                  defaultValue={email}
                  error={errors.email}
                  {...register("email")}
                />
                <InputShowPassword
                  idName="editPassword"
                  label="Contraseña"
                  {...register("password")}
                />

                <Input
                  type="password"
                  idName="passwordConfirmation"
                  label="Confirmar contraseña"
                  error={errors.passwordConfirmation}
                  {...register("passwordConfirmation")}
                />
              </Flex>
            </ModalBody>

            <ModalFooter gap={3}>
              <Button
                type="reset"
                name="Cancelar"
                form="clientForm"
                bg="transparent"
                onClick={onClose}
              />
              <Button
                type="reset"
                name="Limpiar"
                form="clientForm"
                bg="transparent"
              />
              <Button
                type="submit"
                name="Editar"
                form="clientForm"
                borderColor="#02d102"
                bg="#2ea043"
                isLoading={isSubmitting}
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
