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
import { Button } from "../Form/Button";

type TableContentProps = {
  rut?: string;
  name?: string;
  lastName?: string;
  state?: string;
  email?: string;
};

export function ClientManagementTable({
  rut,
  name,
  lastName,
  state,
  email,
}: TableContentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(state);

  return (
    <>
      {!state ? null : (
        <Tr>
          <Td>{rut}</Td>
          <Td>{name} </Td>
          <Td>{lastName}</Td>
          {state === "true" ? null : <Td>Aceptado</Td>}

          <Td display="flex" alignItems={"center"} justifyContent="flex-end">
            <Button
              name="Perfil"
              type="button"
              onClick={() => {
                onOpen();
              }}
              bg="#2e2e2e"
              size="sm"
            />
          </Td>
        </Tr>
      )}

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
    </>
  );
}
