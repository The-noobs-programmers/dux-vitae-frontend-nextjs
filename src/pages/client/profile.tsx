import {
  Avatar,
  Flex,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { format } from "date-fns";
import nookies from "nookies";
import { RiMailLine } from "react-icons/ri";
import * as yup from "yup";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { Select } from "../../components/Form/Select";
import { Textarea } from "../../components/Form/Textarea";
import { useToasts } from "../../hooks/useToasts";
import { api } from "../../services/apiClient";

interface ClientData {
  rut?: string;
  name: string;
  lastName: string;
  email: string;
  birthday: string;
  gender?: string;
  phone?: string;
  createdAt: string;
  description?: string;
}

type ClientProfileProps = {
  clientData: ClientData;
};

type UpdateData = {
  name: string;
  lastName: string;
  birthday?: string;
  gender?: string;
  phone?: string;
  createdAt?: string;
  description?: string;
};

function formatDate(date: string) {
  !date && "";

  const newDate = new Date(date);

  let day;
  let month;
  if (newDate.getDate() + 1 < 10) {
    day = "0" + (newDate.getDate() + 1);
  } else {
    day = newDate.getDate() + 1;
  }

  if (newDate.getMonth() + 1 < 10) {
    month = "0" + (newDate.getMonth() + 1);
  } else {
    month = newDate.getMonth() + 1;
  }

  let year = newDate.getFullYear();

  return `${year}-${month}-${day}`;
}

const UpdateSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre es requerido")
    .matches(/^[a-zA-Z\s]+$/g, "El nombre solo puede contener letras"),
  lastName: yup
    .string()
    .required("El apellido es requerido")
    .matches(/^[a-zA-Z\s]+$/g, "El apellido solo puede contener letras"),
  // birthday: yup.date(),
  gender: yup.string(),
  phone: yup
    .string()
    .notRequired()
    .matches(
      /^\+56?[ -]*(6|7)[ -]*([0-9][ -]*){8}/g,
      "El formato requerido es +56 9 xxxxxxxx"
    ),
  description: yup.string(),
});

export default function ClientProfile({ clientData }: ClientProfileProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateData>({
    resolver: yupResolver(UpdateSchema),
  });

  const nameClient = clientData.name + " " + clientData.lastName;
  const [dateCreatedClient, setDateCreatedClient] = useState("");
  const { toastSuccess, toastError } = useToasts();
  const router = useRouter();

  const isTabletVersion = useBreakpointValue({ base: false, md: true });

  const onSubmit: SubmitHandler<UpdateData> = async (data) => {
    api
      .put(`/api/users/updateByRut/${clientData.rut}`, data)
      .then((res) => {
        if (res.status === 200) {
          toastSuccess({ description: "Datos actualizados correctamente" });
          router.push("/client/profile");
        }
      })
      .catch((err) => {
        toastError({ description: `Error al actualizar los datos, ${err}` });
      });
  };

  return (
    <Flex flex="1" align="top" justify="center">
      <Flex w="80%" mt="45px" flexDir="row">
        {/* Form */}
        <Flex
          as="form"
          gap={5}
          padding="0 15px"
          flexDir={"column"}
          flex="1"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Información general */}
          <Flex align={"end"}>
            <Text fontSize={"1.1rem"} fontWeight={"bold"}>
              Información general
            </Text>
          </Flex>
          {/* Input información general */}
          <Flex gap={5} flexDir={"column"}>
            <SimpleGrid
              columns={2}
              justifyItems="center"
              gap={10}
              marginTop={4}
            >
              <Input
                type={"text"}
                idName="name"
                label="Nombre"
                defaultValue={clientData?.name}
                error={errors.name}
                {...register("name")}
              />
              <Input
                type={"text"}
                idName="lastName"
                label="Apellido"
                defaultValue={clientData?.lastName}
                error={errors.lastName}
                {...register("lastName")}
              />

              <Input
                type={"date"}
                idName="birthday"
                label={isTabletVersion ? "Fecha de nacimiento" : "Nacimiento"}
                defaultValue={!!clientData.birthday ? clientData.birthday : ""}
                error={errors.birthday}
                {...register("birthday")}
              />

              <Select
                idName="gender"
                label="Género"
                error={errors.gender}
                {...register("gender")}
              >
                {!!clientData.gender && (
                  <option
                    value={clientData?.gender}
                    style={{ background: "#383838" }}
                  >
                    {clientData?.gender}
                  </option>
                )}

                {clientData.gender !== "Masculino" && (
                  <option value="Masculino" style={{ background: "#383838" }}>
                    Masculino
                  </option>
                )}

                {clientData.gender !== "Femenino" && (
                  <option value="Femenino" style={{ background: "#383838" }}>
                    Femenino
                  </option>
                )}

                {clientData.gender !== "Otro" && (
                  <option value="Otro" style={{ background: "#383838" }}>
                    Otro
                  </option>
                )}
              </Select>

              <Input
                type={"text"}
                idName="phone"
                label="Teléfono"
                defaultValue={clientData?.phone ? clientData.phone : ""}
                error={errors.phone}
                {...register("phone")}
              />
            </SimpleGrid>

            <Textarea
              idName="description"
              label="Descripción"
              defaultValue={
                clientData?.description ? clientData?.description : ""
              }
              error={errors.description}
              {...register("description")}
            />
          </Flex>

          <Button
            type="submit"
            name="Salvar"
            isLoading={isSubmitting}
            borderColor="#02d102"
            bg="#2ea043"
          />
        </Flex>

        {/* profile */}
        {isTabletVersion && (
          <Flex
            align={"top"}
            justifyContent={"center"}
            pl={2}
            pr={2}
            w={"25rem"}
            flex="1"
          >
            <Flex
              marginTop={20}
              align={"center"}
              flexDir={"column"}
              w={"80%"}
              h={"60%"}
              borderRadius={"5px"}
              gap={8}
            >
              <Avatar top={-12} w={"6rem"} h={"6rem"} name={nameClient} />

              <Text fontSize={"1.2rem"} fontWeight={"medium"}>
                {nameClient}
              </Text>

              <Text fontSize="0.9rem">
                {clientData?.description
                  ? clientData?.description
                  : "Descripción personal"}
              </Text>

              <Text as="i">
                <q>Nunca es tarde para cambiar tu estilo de vida.</q>
              </Text>

              <Flex alignItems="center" justifyContent="center" gap="5px">
                <RiMailLine />
                <Text fontSize="0.9rem">{clientData?.email}</Text>
              </Flex>

              <Text fontSize="0.7rem">
                Cuenta creada el{" "}
                {format(new Date(clientData.createdAt), "dd-MMM-yyyy")}
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { rut } = nookies.get(ctx);

    const response = await api.get(`/api/users/findUsersByRut/${rut}`);

    let clientData = {};

    response.data.map((client: ClientData) => {
      clientData = {
        rut: client.rut,
        name: client.name,
        lastName: client.lastName,
        email: client.email,
        birthday: formatDate(client.birthday),
        gender: client.gender,
        phone: client.phone,
        createdAt: client.createdAt,
        description: client.description,
      };
    });

    return {
      props: {
        clientData,
      },
    };
  } catch (error) {
    return {
      props: {
        clientData: {},
      },
    };
  }
};
