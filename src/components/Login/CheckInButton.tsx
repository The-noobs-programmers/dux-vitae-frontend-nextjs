import { Divider, Flex, Text } from "@chakra-ui/react";
import Router from "next/router";
import { Button } from "../Form/Button";

export function CheckInButton() {
  function onClientRegisterPage() {
    Router.push("/register/client");
  }

  function onNutritionistRegisterPage() {
    Router.push("/register/nutritionist");
  }

  return (
    <Flex
      w="100%"
      h="150px"
      flexDir="column"
      justifyContent="flex-start"
      gap={4}
    >
      <Button
        type="button"
        name="Registrarse"
        bg="transparent"
        onClick={onClientRegisterPage}
      />

      <Flex align="center">
        <Divider orientation="horizontal" color="#E0E0E0" />
        <Text fontSize="0.8rem" color="#E0E0E0" textAlign="center" p="0 8px">
          O
        </Text>
        <Divider orientation="horizontal" color="#E0E0E0" />
      </Flex>

      <Button
        type="button"
        name="Registrarse como nutricionista"
        bg="transparent"
        onClick={onNutritionistRegisterPage}
      />
    </Flex>
  );
}
