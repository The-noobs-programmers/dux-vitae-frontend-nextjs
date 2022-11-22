import { Flex, Grid, Text, useBreakpointValue } from "@chakra-ui/react";
import { Logo } from "../../assets/Logo";
import { MainSidebar } from "../../components/MainSidebar";
import { RegisterForm } from "../../components/Register/NutritionistRegisterForm";

export default function Register() {
  const isTabletVersion = useBreakpointValue({ base: false, md: true });

  return (
    <Grid
      h="100vh"
      w="100vw"
      templateColumns={isTabletVersion ? "repeat(2, 1fr)" : "1fr"}
      overflow="hidden"
    >
      {isTabletVersion && <MainSidebar />}

      <Flex flex="1" justifyContent="center" overflowY="auto" m="10px 0">
        <Flex
          w={["300px", "330px", "430px"]}
          minH="750px"
          maxH="900px"
          flexDir="column"
        >
          <Flex w="100%" h="180px" justifyContent="center">
            <Logo />
          </Flex>

          {/* register form session */}
          <Flex w="100%" h="100%" gap={2} flexDir="column">
            <Text fontSize={["1.8rem", "1.8rem", "2rem"]} fontWeight="500">
              Registrarse
            </Text>

            <Text fontSize={["0.8rem", "0.8rem", "1rem"]}>
              ¡Bienvenido! Por favor ingresa tus datos.
            </Text>

            {/* Register form */}
            <RegisterForm />
          </Flex>
        </Flex>
      </Flex>
    </Grid>
  );
}
