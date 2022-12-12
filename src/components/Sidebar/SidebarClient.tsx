import { Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import {
  RiFileChartLine,
  RiFileList2Line,
  RiLogoutBoxLine,
  RiSendPlaneLine,
  RiUserFollowFill,
  RiUserHeartFill,
} from "react-icons/ri";
import { Logo } from "../../assets/Logo";
import { signOut, useAuth } from "../../context/AuthContext";
import { ActiveLink } from "../ActiveLink";
import CanSee from "../CanSee";

interface RoleProps {
  role: "admin" | "client" | "nutritionist";
}

export function SidebarClient() {
  const isWebVersion = useBreakpointValue({ base: false, lg: true });
  const [role, setRole] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (user.role === undefined) {
      const cookies = parseCookies();

      setRole(cookies.role);
    } else {
      setRole(user.role);
    }
  }, [user.role]);

  console.log(role);

  useEffect(() => {}, [role]);

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

      <CanSee role={role} roles="client">
        <ActiveLink href="/client/list">
          <Flex
            p={2}
            cursor="pointer"
            transition="0.2s filter"
            bg="gray.800"
            _hover={{ filter: "brightness(120%)" }}
            align="center"
            justify={isWebVersion ? "flex-start" : "center"}
            gap={2}
          >
            <RiFileList2Line size="25px" />

            {isWebVersion && <Text fontSize="xl">Lista</Text>}
          </Flex>
        </ActiveLink>
      </CanSee>

      <CanSee role={role} roles="client">
        <ActiveLink href="/client/profile">
          <Flex
            p={2}
            cursor="pointer"
            transition="0.2s filter"
            bg="gray.800"
            _hover={{ filter: "brightness(120%)" }}
            align="center"
            justify={isWebVersion ? "flex-start" : "center"}
            gap={2}
          >
            <RiUserHeartFill size="25px" />
            {isWebVersion && <Text fontSize="xl">Perfil</Text>}
          </Flex>
        </ActiveLink>
      </CanSee>

      <CanSee role={role} roles="admin">
        <ActiveLink href="/admin/dashboard">
          <Flex
            p={2}
            cursor="pointer"
            transition="0.2s filter"
            bg="gray.800"
            _hover={{ filter: "brightness(120%)" }}
            align="center"
            justify={isWebVersion ? "flex-start" : "center"}
            gap={2}
          >
            <RiFileChartLine size="25px" />

            {isWebVersion && <Text fontSize="xl">Dashboard</Text>}
          </Flex>
        </ActiveLink>
      </CanSee>

      <CanSee role={role} roles="admin">
        <ActiveLink href="/admin/client">
          <Flex
            p={2}
            cursor="pointer"
            transition="0.2s filter"
            bg="gray.800"
            _hover={{ filter: "brightness(120%)" }}
            align="center"
            justify={isWebVersion ? "flex-start" : "center"}
            gap={2}
          >
            <RiUserFollowFill size="25px" />

            {isWebVersion && <Text fontSize="xl">Clientes</Text>}
          </Flex>
        </ActiveLink>
      </CanSee>

      <CanSee role={role} roles="nutritionist">
        <ActiveLink href="/nutritionist/appointment">
          <Flex
            p={2}
            cursor="pointer"
            transition="0.2s filter"
            bg="gray.800"
            _hover={{ filter: "brightness(120%)" }}
            align="center"
            justify={isWebVersion ? "flex-start" : "center"}
            gap={2}
          >
            <RiSendPlaneLine size="25px" />

            {isWebVersion && <Text fontSize="xl">Solicitud</Text>}
          </Flex>
        </ActiveLink>
      </CanSee>

      <Flex
        p={2}
        cursor="pointer"
        transition="0.2s filter"
        bg="gray.800"
        _hover={{ filter: "brightness(120%)" }}
        align="center"
        justify={isWebVersion ? "flex-start" : "center"}
        gap={2}
        mt="auto"
        mb="20px"
        onClick={signOut}
      >
        <RiLogoutBoxLine size="25px" />

        {isWebVersion && <Text fontSize="xl">Cerrar sesión</Text>}
      </Flex>
    </Flex>
  );
}
