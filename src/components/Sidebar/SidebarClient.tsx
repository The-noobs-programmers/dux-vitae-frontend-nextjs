import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { RiFileList2Line, RiUserHeartFill } from "react-icons/ri";
import { Logo } from "../../assets/Logo";
import { ActiveLink } from "../ActiveLink";
import CanSee from "../CanSee";

export function SidebarClient() {
  const isWebVersion = useBreakpointValue({ base: false, lg: true });
  const user = ["admin", "client"];
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

      <CanSee roles="client" role="client">
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
            <RiFileList2Line size="25px" />

            {isWebVersion && <Text fontSize="xl">Lista</Text>}
          </Flex>
        </ActiveLink>
      </CanSee>

      <CanSee roles="client" role="client">
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
      </CanSee>

      <CanSee roles="admin" role="admin">
        <ActiveLink href="/admin/client">
          <Flex
            p={2}
            cursor="pointer"
            transition="0.2s filter"
            bg="gray.800"
            _hover={{ filter: "brightness(120%)" }}
            align="center"
            gap={2}
          >
            <RiFileList2Line size="25px" />

            {isWebVersion && <Text fontSize="xl">Clientes</Text>}
          </Flex>
        </ActiveLink>
      </CanSee>

      <CanSee roles="admin" role="admin">
        <ActiveLink href="/admin/dashboard">
          <Flex
            p={2}
            cursor="pointer"
            transition="0.2s filter"
            bg="gray.800"
            _hover={{ filter: "brightness(120%)" }}
            align="center"
            gap={2}
          >
            <RiFileList2Line size="25px" />

            {isWebVersion && <Text fontSize="xl">Dashboard</Text>}
          </Flex>
        </ActiveLink>
      </CanSee>

      <CanSee roles="nutritionist" role="nutritionist">
        <ActiveLink href="/nutritionist/appointment">
          <Flex
            p={2}
            cursor="pointer"
            transition="0.2s filter"
            bg="gray.800"
            _hover={{ filter: "brightness(120%)" }}
            align="center"
            gap={2}
          >
            <RiFileList2Line size="25px" />

            {isWebVersion && <Text fontSize="xl">Citas</Text>}
          </Flex>
        </ActiveLink>
      </CanSee>
    </Flex>
  );
}
