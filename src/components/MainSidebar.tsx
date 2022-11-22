import { Flex, Text } from "@chakra-ui/react";

export function MainSidebar() {
  return (
    <Flex
      h="100%"
      w="100%"
      bgImage="url(/fruit.jpg)"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="70%"
      bgColor="#000000"
    >
      <Flex flex="1" justifyContent="center">
        <Flex w={["300px", "330px", "430px"]} flexDir="column" mt="100px">
          <Text fontSize={["2rem", "2rem", "2.2rem"]} fontWeight="700">
            Porque tu salud es lo primero.
          </Text>

          <Text fontSize={["0.8rem", "0.8rem", "1rem"]}>
            Tienes la oportunidad de mejorar tu salud y la de tu familia con
            profesionales de la salud.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
