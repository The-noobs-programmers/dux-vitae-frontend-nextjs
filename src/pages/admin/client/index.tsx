import {
  Flex,
  Input as ChakraInput,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiUserAddLine } from "react-icons/ri";
import * as yup from "yup";
import { Button } from "../../../components/Form/Button";
import { Input } from "../../../components/Form/Input";
import { InputShowPassword } from "../../../components/Form/InputShowPassword";
import { ClientManagementTable } from "../../../components/Table/ClientManagementTable";
import { useToasts } from "../../../hooks/useToasts";
import { api } from "../../../services/apiClient";

export type Client = {
  rut: string;
  email: string;
  name: string;
  lastName: string;
  created_at: Date;
};

type Clients = {
  clients: [Client];
};

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

export default function ClientTable({ clients }: Clients) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: yupResolver(RegisterSchema),
  });

  const router = useRouter();

  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const clientFiltered = useMemo(() => {
    const lowerCase = search.toLowerCase();

    return clients.filter((client) =>
      client.name.toLowerCase().includes(lowerCase)
    );
  }, [search, clients]);

  const { toastSuccess, toastError } = useToasts();

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

  function deleteClient(rut: string) {
    api
      .delete(`/api/users/deleteByRut/${rut}`)
      .then((data) => {
        if (data.status === 200) {
          toastSuccess({ description: "Cliente eliminado" });
          router.push("/admin/client");
        }
      })
      .catch((error) => {
        toastError({ description: `Error al eliminar cliente, ${error}}` });
      });
  }

  function editClientButton(clientData: Client) {
    onOpen();
  }

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    // if (Fn.validaRut(data.rut)) {
    //   api
    //     .post("/clients", data)
    //     .then((data) => {
    //       if (data.status === 200) {
    //         toastSuccess({
    //           description: "Registro exitoso, ya puede iniciar sesión sesión",
    //         });
    //         Router.push("/");
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // } else {
    //   toastError({ description: "El rut no existe" });
    // }
  };

  return (
    <Flex flex="1" align="top" justify="center" overflowX="hidden">
      <TableContainer w="80%" mt="45px">
        <Flex justify="space-between">
          <Flex flexDir="column">
            <Text mb="8px">Cliente:</Text>
            <ChakraInput
              // onChange={handleChange}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar"
              size="sm"
              w="30%"
              minW="200px"
            />
          </Flex>
          <Flex
            align="end"
            _hover={{
              opacity: 0.8,
            }}
          >
            <RiUserAddLine
              size="25px"
              cursor="pointer"
              onClick={() => {
                router.push("/admin/client/create");
              }}
            />
          </Flex>
        </Flex>

        <Flex overflowX="auto">
          <Table w="100%" variant="striped" colorScheme="whiteAlpha">
            <TableCaption>Tabla de clientes</TableCaption>
            <Thead>
              <Tr>
                <Th>Rut</Th>
                <Th>Nombre</Th>
                <Th>Apellido</Th>
                <Th></Th>
              </Tr>
            </Thead>

            <Tbody>
              {clientFiltered?.map((clients) => (
                <ClientManagementTable
                  key={clients.rut}
                  rut={clients.rut}
                  name={clients.name}
                  lastName={clients.lastName}
                  email={clients.email}
                  created_at={clients.created_at}
                  deleteClient={deleteClient}
                />
              ))}
            </Tbody>
          </Table>
        </Flex>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalHeader>Crear un cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              as="form"
              id="clientForm"
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
            </Flex>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button
              type="reset"
              name="Cancelar"
              form="clientForm"
              bg="transparent"
              onClick={onClose}
            />
            <Button
              type="submit"
              name="Registrarse"
              form="clientForm"
              borderColor="#02d102"
              bg="#2ea043"
              isLoading={isSubmitting}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await api.get("/api/users");

  const clientData: Clients = response.data.map((client: Client) => {
    return {
      rut: client.rut,
      email: client.email,
      name: client.name,
      lastName: client.lastName,
      created_at: "2021-08-01",
    };
  });

  // const clients = [
  //   {
  //     rut: "12345678-1",
  //     email: "client122@email.com",
  //     name: "Kevin",
  //     lastName: "Perez",
  //     created_at: "2021-08-01",
  //   },
  //   {
  //     rut: "12345678-9",
  //     email: "client1@email.com",
  //     name: "Juan",
  //     lastName: "Perez",
  //     created_at: "2021-08-01",
  //   },
  //   {
  //     rut: "12345678-2",
  //     email: "client2@email.com",
  //     name: "Pedro",
  //     lastName: "Perez",
  //     created_at: "2021-08-01",
  //   },
  //   {
  //     rut: "12345678-3",
  //     email: "client3@email.com",
  //     name: "Leandro",
  //     lastName: "Perez",
  //     created_at: "2021-08-01",
  //   },
  // ];

  return {
    props: {
      clients: clientData,
    },
  };
};
