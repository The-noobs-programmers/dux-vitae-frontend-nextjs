import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { CatImage } from "../../../assets/Cat";
import { CreateClientForm } from "../../../components/CreateUser/CreateClientForm";

export default function CreateClient() {
  const isTabletVersion = useBreakpointValue({ base: false, md: true });

  return (
    <Flex w="100%" h="100%" align="top" justify="center" overflowX="hidden">
      <Flex w={["80%", "80%", "60%"]} mt="45px">
        <Flex w="100%" h="100%" gap={2} flexDir="column">
          <Text fontSize={["1.8rem", "1.8rem", "2rem"]} fontWeight="500">
            Crear cliente
          </Text>

          <Flex p="20px" w="100%" bg="#303030">
            {/* Create form */}
            <CreateClientForm />
            {isTabletVersion && (
              <Flex h="100%" w="50%" pl="20px">
                <CatImage />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
