import { Avatar, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { RiMailLine } from "react-icons/ri";
import * as yup from "yup";
import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { Select } from "../../components/Form/Select";
import { Textarea } from "../../components/Form/Textarea";
import { useToasts } from "../../hooks/useToasts";
import { api } from "../../services/apiClient";

type ClientProfileProps = {
  clientData: {
    rut?: string;
    name: string;
    lastName: string;
    email: string;
    birthday?: string;
    gender?: string;
    phone?: string;
    created_at?: string;
    description?: string;
  };
};

type UpdateData = {
  name: string;
  lastName: string;
  birthday?: string;
  gender?: string;
  phone?: string;
  created_at?: string;
  description?: string;
};

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

  const nameClient = clientData?.name + " " + clientData?.lastName;
  const [dateCreatedClient, setDateCreatedClient] = useState("");
  const { toastSuccess, toastError } = useToasts();

  useEffect(() => {
    const date = new Date(Date.now());
    setDateCreatedClient(
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }, []);

  const onSubmit: SubmitHandler<UpdateData> = async (data) => {
    api
      .put(`/clients/${clientData.rut}`, data)
      .then((res) => {
        if (res.status === 200) {
          toastSuccess({ description: "Datos actualizados correctamente" });
          Router.push("/client/profile");
        }
      })
      .catch(() => {});
  };

  return (
    <Flex
      flex="1"
      w={[
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 50px)",
        "calc(100vw - 250px)",
      ]}
      mt="45px"
      flexDir="row"
    >
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
          <SimpleGrid columns={2} justifyItems="center" gap={5} marginTop={4}>
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
              label="Fecha de nacimiento"
              defaultValue={clientData?.birthday ? clientData.birthday : ""}
              error={errors.birthday}
              {...register("birthday")}
            />

            <Select
              idName="gender"
              label="Género"
              placeholder={
                !!clientData.gender ? clientData.gender : "Seleccione un género"
              }
              error={errors.gender}
              {...register("gender")}
            >
              {clientData.gender && (
                <option value={clientData?.gender}>{clientData?.gender}</option>
              )}
              <option value="Masculino">Masculino</option>
              <option value="Femenina">Femenina</option>
              <option value="Otro">Otro</option>
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

        <Button type="submit" name="Salvar" isLoading={isSubmitting} />
      </Flex>

      {/* profile */}
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

          <Text fontSize="0.7rem">Cuenta creada el {dateCreatedClient}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = (ctx) => {
  try {
    const clientData = {
      rut: "12345638-2",
      name: "Felipe",
      lastName: "Perez",
      email: "felipe@email.com",
      birthday: "1990-01-01",
      gender: "Masculino",
      phone: "123456789",
      created_at: "Thu Dec 01 2022 23:58:45 GMT-0300",
      description: "Descripción personal",
    };

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
