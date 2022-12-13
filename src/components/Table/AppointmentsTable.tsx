import {
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
  Textarea,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { MdOutlineHourglassBottom } from "react-icons/md";
import {
  RiCheckFill,
  RiDeleteBinLine,
  RiInformationLine,
} from "react-icons/ri";
import { useToasts } from "../../hooks/useToasts";
import { api } from "../../services/apiClient";
import { Button } from "../Form/Button";

type ClientAppointmentProps = {
  rut: string;
  email: string;
  name: string;
  lastName: string;
  description?: string;
};

type TableContentProps = {
  id: string;
  title: string;
  description: string;
  state: Boolean;
  createdAt: string;
  client: ClientAppointmentProps;
};

export function AppointmentsTable({
  id,
  title,
  description,
  state,
  createdAt,
  client,
}: TableContentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toastSuccess, toastError } = useToasts();
  const router = useRouter();

  async function changeAppointmentStatus() {
    try {
      let isState = !state;
      const response = await api.put(
        `/api/appointments/updateAppointmentState/${id}`,
        { state: isState }
      );

      if (isState) {
        toastSuccess({ description: "Solicitud aceptada" });
      } else {
        toastSuccess({ description: "Solicitud rechazada" });
      }

      router.push("/nutritionist/appointment");
    } catch (error) {
      toastError({ description: "Error al aceptar solicitud" });
    }
  }

  async function deleteAppointment() {
    try {
      const response = await api.delete(`/api/appointments/${id}`);

      toastSuccess({ description: "Se elimino correctamente" });

      router.push("/nutritionist/appointment");
    } catch (error) {
      toastError({ description: "Error al aceptar solicitud" });
    }
  }

  return (
    <>
      <Tr>
        <Td
          w="100px"
          align="center"
          bg={state ? "#2ea043" : "#a70606"}
          onClick={changeAppointmentStatus}
          cursor={!!state ? "default" : "pointer"}
        >
          <Flex w="100%" justify="center">
            {!!state ? (
              <RiCheckFill size="25px" />
            ) : (
              <MdOutlineHourglassBottom size="25px" />
            )}
          </Flex>
        </Td>
        <Td>{client.rut}</Td>
        <Td>{client.name + " " + client.lastName}</Td>
        <Td>{format(new Date(createdAt), "dd-MMM-yyyy")}</Td>
        <Td>
          <Flex gap={5}>
            <RiInformationLine size="25px" onClick={onOpen} cursor="pointer" />
            <RiDeleteBinLine
              size="25px"
              onClick={() => {
                deleteAppointment();
              }}
              cursor="pointer"
            />
          </Flex>
        </Td>
      </Tr>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalHeader>
            <Flex align={"center"} gap={3}>
              {/* <Avatar name={name + " " + lastName} /> */}
              Solicitud
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody gap={2}>
            <Flex borderRadius="5" flexDir={"column"} flex="1" gap={3}>
              <Text fontSize="1.1rem" fontWeight={"bold"}>
                Datos de la solicitud
              </Text>

              <Flex
                borderRadius={"5"}
                flexDir={"column"}
                flex="1"
                paddingLeft={3}
              >
                <Text fontSize={"1rem"} fontWeight={"bold"}>
                  {title}
                </Text>
                <Textarea
                  border={"none"}
                  disabled
                  value={description}
                ></Textarea>
              </Flex>
            </Flex>
            <Flex
              borderRadius={"5"}
              marginTop={4}
              flexDir={"column"}
              flex="1"
              gap={3}
            >
              <Text fontSize="1.1rem" fontWeight={"bold"}>
                Datos del cliente:
              </Text>
              <Flex
                borderRadius={"5"}
                flexDir={"column"}
                flex="1"
                paddingLeft={3}
              >
                <Text fontSize={"1rem"} fontWeight={"bold"}>
                  Rut:
                </Text>
                <Text paddingLeft={1}>{client.rut}</Text>
              </Flex>

              <Flex
                borderRadius={"5"}
                flexDir={"column"}
                flex="1"
                paddingLeft={3}
              >
                <Text fontSize={"1rem"} fontWeight={"bold"}>
                  Nombre:
                </Text>
                <Text paddingLeft={1}>
                  {client.name + " " + client.lastName}
                </Text>
              </Flex>

              <Flex
                borderRadius={"5"}
                flexDir={"column"}
                flex="1"
                paddingLeft={3}
              >
                <Text fontSize={"1rem"} fontWeight={"bold"}>
                  Email:
                </Text>
                <Text paddingLeft={1}>{client.email}</Text>
              </Flex>

              <Flex
                borderRadius={"5"}
                flexDir={"column"}
                flex="1"
                paddingLeft={3}
              >
                <Text fontSize={"1rem"} fontWeight={"bold"}>
                  Descripción
                </Text>
                <Text paddingLeft={1}>{client.description}</Text>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button
              name="Eliminar"
              onClick={() => {
                deleteAppointment();
                onClose();
              }}
              bg="transparent"
            />
            <Button
              name={state ? "Rechazar" : "Aceptar"}
              onClick={() => {
                changeAppointmentStatus();
                onClose();
              }}
              borderColor="#02d102"
              bg="#2ea043"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
