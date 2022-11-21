import { Flex, Grid, Text, useBreakpointValue } from "@chakra-ui/react";
import { Logo } from "../assets/Logo";
import { CheckInButton } from "../components/Login/CheckInButton";
import { LoginForm } from "../components/Login/LoginForm";
import { LoginSidebar } from "../components/Login/LoginSidebar";

export default function Home() {
  const isTabletVersion = useBreakpointValue({ base: false, md: true });

  return (
    <Grid
      h="100vh"
      w="100vw"
      templateColumns={isTabletVersion ? "repeat(2, 1fr)" : "1fr"}
      overflow="hidden"
    >
      {isTabletVersion && <LoginSidebar />}

      <Flex flex="1" justifyContent="center" overflowY="auto" m="10px 0">
        <Flex w={["300px", "330px", "430px"]} h="720px" flexDir="column">
          <Flex w="100%" h="180px" justifyContent="center">
            <Logo />
          </Flex>

          {/* login form session */}
          <Flex flex="1" gap={2} flexDir="column">
            <Text fontSize={["1.8rem", "1.8rem", "2rem"]} fontWeight="500">
              Iniciar sesión
            </Text>

            <Text fontSize={["0.8rem", "0.8rem", "1rem"]}>
              ¡Bienvenido! Por favor ingresa tus datos.
            </Text>

            {/* Login form */}
            <LoginForm />
          </Flex>

          <CheckInButton />
        </Flex>
      </Flex>
    </Grid>
  );
}
