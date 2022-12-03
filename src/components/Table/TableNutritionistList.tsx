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
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiPencilLine } from "react-icons/ri";
import * as yup from "yup";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { useToasts } from "../../hooks/useToasts";

type TableContentProps = {
  rutNutritionist?: string;
  name?: string;
  lastName?: string;
  state?: string;
  request?: boolean;
  email?: string;
  onReloadPage: (data: any) => void;
};

type AppointmentData = {
  title: string;
  description: string;
};

const AppointmentSchema = yup.object().shape({
  title: yup.string().required("El asunto es requerido"),
  description: yup.string().required("La descripción es requerida"),
});

export function TableNutritionistList({
  rutNutritionist,
  name,
  lastName,
  state,
  request = false,
  email,
  onReloadPage,
}: TableContentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentData>({
    resolver: yupResolver(AppointmentSchema),
  });

  const [buttonComponent, setButtonComponent] = useState<string>("profile");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [run, setRun] = useState("");
  const { toastSuccess, toastError } = useToasts();

  useEffect(() => {
    const cookies = parseCookies(undefined);
    setRun(cookies["rut"]);
  }, []);

  const onSubmit: SubmitHandler<AppointmentData> = async ({
    title,
    description,
  }) => {
    const data = {
      title,
      description,
      nutritionistRut: rutNutritionist,
      clientRut: run,
    };

    onReloadPage(data);
  };

  return (
    <>
      <Tr>
        <Td>{rutNutritionist}</Td>
        <Td>{name} </Td>
        <Td>{lastName}</Td>

        <Td>
          <Button
            name="Perfil"
            type="button"
            onClick={() => {
              setButtonComponent("profile"), onOpen();
            }}
            bg="#2C2C2C"
            size="sm"
          />
        </Td>
        <Td>
          <Button
            name={request ? "Solicitado" : "Solicitar"}
            disabled={request}
            type="button"
            onClick={() => {
              setButtonComponent("appointment"), onOpen();
            }}
            leftIcon={<RiPencilLine />}
            bg="#3a025d"
            borderColor="#60039a"
            size="sm"
          />
        </Td>
      </Tr>

      {buttonComponent === "profile" ? (
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
                  <Text paddingLeft={1}>{rutNutritionist}</Text>
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
            <ModalHeader> Solicitar cita </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Flex
                as="form"
                id="appointmentForm"
                flexDir="column"
                onSubmit={handleSubmit(onSubmit)}
                gap={4}
              >
                <Input
                  type="text"
                  idName="title"
                  label="Ingrese el asunto"
                  error={errors.title}
                  {...register("title")}
                />
                <Input
                  type="text"
                  idName="description"
                  label="Ingrese la descripción"
                  error={errors.description}
                  {...register("description")}
                />
              </Flex>
            </ModalBody>

            <ModalFooter gap={3}>
              <Button name="cancelar" onClick={onClose} bg="transparent" />
              <Button
                type="submit"
                form="appointmentForm"
                name="enviar"
                borderColor="#02d102"
                bg="#2ea043"
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
