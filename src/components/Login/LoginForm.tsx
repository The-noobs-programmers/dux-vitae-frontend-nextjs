import { Flex, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useToasts } from "../../hooks/useToasts";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import { InputShowPassword } from "../Form/InputShowPassword";

type SignInData = {
  email: string;
  password: string;
};

const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email("El formato debe ser email")
    .required("El email es requerido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&_*-]).{8,}$/g,
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minuscula, un número y un carácter especial"
    ),
});

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: yupResolver(SignInSchema),
  });

  const { toastError } = useToasts();

  // const { signIn } = useContext(AuthContext);

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    try {
      // await signIn(data);
      console.log(data);
    } catch (err) {
      toastError({ description: "Usuario con estos datos no registrado" });
    }
  };

  return (
    <Flex
      as="form"
      flexDir="column"
      h="100%"
      w="100%"
      justify="center"
      onSubmit={handleSubmit(onSubmit)}
      gap={4}
      mb={!errors.email || !errors.password ? "0" : 4}
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
        type="submit"
        name="Iniciar sesión"
        bg="#FFFFFF"
        borderColor="transparent"
        color="#000000"
        isLoading={isSubmitting}
      />
    </Flex>
  );
}
