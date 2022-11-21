import { Divider, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Logo } from "../assets/Logo";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { InputShowPassword } from "../components/InputShowPassword";
import { useToasts } from "../hooks/useToasts";

type SignInData = {
  email: string;
  password: string;
};

const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email("El formato debe ser email")
    .required("El email es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: yupResolver(SignInSchema),
  });

  const { toastError } = useToasts();

  const isTabletVersion = useBreakpointValue({ base: false, md: true });

  // const { signIn } = useContext(AuthContext);

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    try {
      // await signIn(data);
    } catch (err) {
      toastError({ description: "Usuario con estos datos no registrado" });
    }
  };

  return (
    <Flex h="100vh" w="100vw" flexDir="row" overflow="hidden">
      <Flex
        w="50%"
        h="100%"
        bgImage="url(/fruit.jpg)"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="70%"
        bgColor="#000000"
      >
        Hola
      </Flex>
      <Flex flex="1" bgColor="#2C2C2C" justifyContent="center" overflowY="auto">
        <Flex
          w={["330px", "430px", "430px"]}
          h="700px"
          m="40px 0"
          flexDir="column"
        >
          <Flex w="100%" h="180px" justifyContent="center">
            <Logo />
          </Flex>
          <Flex flex="1" bg="transparent" flexDir="column">
            <Text fontSize="2rem" fontWeight="500">
              Iniciar sesión
            </Text>
            <Text fontSize="1rem">
              ¡Bienvenido! Por favor ingresa tus datos.
            </Text>
            <Flex
              as="form"
              flexDir="column"
              h="100%"
              w="100%"
              justify="center"
              gap={4}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                idName="email"
                label="Correo electrónico"
                error={errors.email}
                {...register("email")}
              />
              <InputShowPassword
                idName="password"
                label="Contraseña"
                error={errors.password}
                {...register("password")}
              />

              <Text fontSize="0.8rem" color="gray.200" textAlign="end">
                ¿Olvidaste la contraseña?
              </Text>

              <Button
                mt={4}
                type="submit"
                name="Iniciar sesión"
                bg="#FFFFFF"
                borderColor="transparent"
                color="#000000"
                isLoading={isSubmitting}
              />
            </Flex>
          </Flex>
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
              isLoading={isSubmitting}
            />
            <Flex align="center">
              <Divider orientation="horizontal" color="#E0E0E0" />
              <Text
                fontSize="0.8rem"
                color="#E0E0E0"
                textAlign="center"
                p="0 8px"
              >
                O
              </Text>
              <Divider orientation="horizontal" color="#E0E0E0" />
            </Flex>
            <Button
              type="button"
              name="Iniciar sesión como nutricionista"
              bg="transparent"
              isLoading={isSubmitting}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
