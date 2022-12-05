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
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { MdOutlineHourglassBottom } from "react-icons/md";
import {
  RiCheckFill,
  RiDeleteBinLine,
  RiInformationLine,
} from "react-icons/ri";
import { Button } from "../Form/Button";

type ClientAppointmentProps = {
  rut: string;
  email: string;
  name: string;
  lastName: string;
  created_at: string;
};

type TableContentProps = {
  id: string;
  title: string;
  description: string;
  state: Boolean;
  client: ClientAppointmentProps;
  rejectRequest: (id: string) => void;
  acceptRequest: (id: string) => void;
};

export function AppointmentsTable({
  id,
  title,
  description,
  state,
  client,
  rejectRequest,
  acceptRequest,
}: TableContentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [run, setRun] = useState("");

  useEffect(() => {
    const cookies = parseCookies(undefined);
    setRun(cookies["rut"]);
  }, []);

  return (
    <>
      <Tr>
        <Td
          w="100px"
          align="center"
          bg={state ? "#2ea043" : "#a70606"}
          onClick={() => {
            !!state ? null : acceptRequest(id);
          }}
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
        <Td>Kevin Cruz</Td>
        <Td>13/13/13</Td>
        <Td>
          <Flex gap={5}>
            <RiInformationLine size="25px" onClick={onOpen} cursor="pointer" />
            <RiDeleteBinLine
              size="25px"
              onClick={() => {
                rejectRequest(id);
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
                <Text paddingLeft={1}>Nada.</Text>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button
              name="Rechazar"
              onClick={() => {
                rejectRequest(id);
                onClose();
              }}
              bg="transparent"
            />
            <Button
              name="Aceptar"
              onClick={() => {
                acceptRequest(id);
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
