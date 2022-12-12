import { Flex } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { InputShowPassword } from "../../components/Form/InputShowPassword";
import { useToasts } from "../../hooks/useToasts";
import { api } from "../../services/apiClient";

type SignInData = {
  rut: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  lastName: string;
};

const RegisterSchema = yup.object().shape({
  rut: yup
    .string()
    .required("El rut es requerido")
    .matches(/^[0-9]{7,8}-[0-9Kk]$/g, "El rut debe ser valido"),
  email: yup
    .string()
    .email("El formato debe ser email")
    .required("El email es requerido"),
  name: yup
    .string()
    .required("El nombre es requerido")
    .matches(/^[a-zA-Z\s]+$/g, "El nombre solo puede contener letras"),
  lastName: yup
    .string()
    .required("El apellido es requerido")
    .matches(/^[a-zA-Z\s]+$/g, "El apellido solo puede contener letras"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&_*-]).{8,}$/g,
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minuscula, un numero y un carácter especial"
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "Las contraseñas no coinciden"),
});

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: yupResolver(RegisterSchema),
  });

  const { toastSuccess, toastError } = useToasts();
  const router = useRouter();

  let Fn = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut: function (rutCompleto: string) {
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
      var tmp = rutCompleto.split("-");
      var digv = tmp[1];
      var rut = tmp[0];
      if (digv == "K") digv = "k";
      return Fn.dv(parseInt(rut)) == digv;
    },
    dv: function (T: number) {
      var M = 0,
        S = 1;
      for (; T; T = Math.floor(T / 10))
        S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
      return S ? S - 1 : "k";
    },
  };

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    if (Fn.validaRut(data.rut)) {
      const client = {
        rut: data.rut,
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: "client",
      };
      api
        .post("/api/users", client)
        .then((res) => {
          if (res.status === 200) {
            toastSuccess({
              description: "Registro exitoso, ya puede iniciar sesión sesión",
            });
            router.push("/");
          }
        })
        .catch((error) => {
          toastError({
            description: `No pudo lograrse el registro :(  ${error}`,
          });
        });
    } else {
      toastError({ description: "El rut no existe" });
    }
  };

  return (
    <Flex
      as="form"
      flexDir="column"
      h="100%"
      w="100%"
      onSubmit={handleSubmit(onSubmit)}
      gap={4}
      mb={!errors.email || !errors.password ? "0" : 4}
    >
      <Input
        type="text"
        idName="rut"
        label="Ingrese el rut (xxxxxxxx-x)"
        error={errors.rut}
        {...register("rut")}
      />

      <Input
        type="text"
        idName="name"
        label="Nombre"
        error={errors.name}
        {...register("name")}
      />
      <Input
        type="text"
        idName="lastName"
        label="Apellido"
        error={errors.lastName}
        {...register("lastName")}
      />

      <Input
        type="email"
        idName="email"
        label="Email"
        error={errors.email}
        {...register("email")}
      />
      <InputShowPassword
        idName="password"
        label="Contraseña"
        error={errors.password}
        {...register("password")}
      />

      <Input
        type="password"
        idName="passwordConfirmation"
        label="Confirmar contraseña"
        error={errors.passwordConfirmation}
        {...register("passwordConfirmation")}
      />

      <Button
        type="submit"
        name="Registrarse"
        bg="#FFFFFF"
        borderColor="transparent"
        color="#000000"
        isLoading={isSubmitting}
        size="lg"
        mb="10px"
      />
    </Flex>
  );
}
