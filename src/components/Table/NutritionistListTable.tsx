import {
  Avatar,
  Divider,
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
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiPencilLine } from "react-icons/ri";
import * as yup from "yup";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { useToasts } from "../../hooks/useToasts";
import { api } from "../../services/apiClient";

type TableContentProps = {
  rutNutritionist?: string;
  name: string;
  lastName: string;
  state?: string;
  request?: boolean;
  email?: string;
  client: {
    rut: string;
    name: string;
    lastName: string;
    email: string;
    description?: string;
  };
};

type AppointmentData = {
  title: string;
  description: string;
};

const AppointmentSchema = yup.object().shape({
  title: yup.string().required("El asunto es requerido"),
  description: yup.string().required("La descripción es requerida"),
});

export function NutritionistListTable({
  rutNutritionist,
  name,
  lastName,
  request = false,
  email,
  client,
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
  const { toastSuccess, toastError } = useToasts();
  const router = useRouter();

  const onSubmit: SubmitHandler<AppointmentData> = async (data) => {
    try {
      const appointmentData = {
        title: data.title,
        description: data.description,
        nutritionistRut: rutNutritionist,
        client: {
          rut: client.rut,
          name: client.name,
          lastName: client.lastName,
          email: client.email,
          description: client.description,
        },
        state: false,
      };

      const response = await api.post("/api/appointments", appointmentData);

      router.push("/client/list");
      onClose();

      toastSuccess({ description: "Solicitud enviada" });
    } catch (error) {
      toastError({ description: "Error al enviar solicitud" });
    }
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
          <ModalContent bg="#302f2f">
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
                  <Text fontSize={"1.1rem"}>Rut:</Text>
                  <Text paddingLeft={1}>{rutNutritionist}</Text>
                </Flex>

                <Divider borderColor="#3d3d3d" />

                <Flex
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"}>Nombre:</Text>
                  <Text paddingLeft={1}>{name + " " + lastName}</Text>
                </Flex>

                <Divider borderColor="#3d3d3d" />

                <Flex
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"}>Email:</Text>
                  <Text paddingLeft={1}>{email}</Text>
                </Flex>

                <Divider borderColor="#3d3d3d" />

                <Flex
                  borderRadius={"5"}
                  flexDir={"column"}
                  flex="1"
                  paddingLeft={3}
                >
                  <Text fontSize={"1.1rem"}>Descripción</Text>
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
          <ModalContent bg="#302f2f">
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
