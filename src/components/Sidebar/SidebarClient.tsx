import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { RiHome4Line, RiUserHeartFill } from "react-icons/ri";
import { Logo } from "../../assets/Logo";
import { ActiveLink } from "../ActiveLink";

export function SidebarClient() {
  const isWebVersion = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex
      position="sticky"
      top="0"
      h="100vh"
      w={["50px", "50px", "50px", "250px"]}
      bg="gray.800"
      flexDir="column"
    >
      <Flex p={2}>
        <Logo />
      </Flex>

      <ActiveLink href="/client/list">
        <Flex
          p={2}
          cursor="pointer"
          transition="0.2s filter"
          bg="gray.800"
          _hover={{ filter: "brightness(120%)" }}
          align="center"
          gap={2}
        >
          <RiHome4Line size="25px" />

          {isWebVersion && <Text fontSize="xl">Lista</Text>}
        </Flex>
      </ActiveLink>

      <ActiveLink href="/client/profile">
        <Flex
          p={2}
          cursor="pointer"
          transition="0.2s filter"
          bg="gray.800"
          _hover={{ filter: "brightness(120%)" }}
          align="center"
          gap={2}
        >
          <RiUserHeartFill size="25px" />
          {isWebVersion && <Text fontSize="xl">Perfil</Text>}
        </Flex>
      </ActiveLink>
    </Flex>
  );
}
