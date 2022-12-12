import {
  Flex,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useMemo, useState } from "react";
import { NutritionistListTable } from "../../components/Table/NutritionistListTable";
import { useToasts } from "../../hooks/useToasts";
import { api } from "../../services/apiClient";

interface NutritionistProps {
  rut: string;
  name: string;
  lastName: string;
  email: string;
}
interface AppointmentProps {
  nutritionistRut: string;
}

interface NutritionistListProps {
  nutritionists: NutritionistProps[];
  appointment: AppointmentProps[];
}

export default function NutritionistList({
  nutritionists,
  appointment,
}: NutritionistListProps) {
  const [rut, setRut] = useState<string[]>([]);
  const { toastSuccess, toastError } = useToasts();
  const [search, setSearch] = useState("");

  async function onReloadPage(data: any) {
    try {
      api.post("/appointments", data);

      toastSuccess({ description: "Solicitud generada" });

      setTimeout(() => {
        Router.reload();
      }, 3000);
    } catch (error) {
      toastError({ description: "Error al generar solicitud" });
    }
  }

  const nutritionistFiltered = useMemo(() => {
    const lowerSearch = search.toLowerCase();

    return nutritionists?.filter((nutritionist) =>
      nutritionist.name.toLowerCase().includes(lowerSearch)
    );
  }, [search, nutritionists]);

  useEffect(() => {
    console.log(appointment);
    appointment?.map((appointment) => {
      setRut((rut) => [...rut, appointment.nutritionistRut]);
    });
  }, []);

  return (
    <Flex flex="1" align="top" justify="center" overflowX="hidden">
      <TableContainer w="80%" mt="45px">
        <Text mb="8px">Nutricionista:</Text>
        <Input
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar"
          size="sm"
          w="30%"
          minW="200px"
        />
        <Flex overflowX="auto">
          <Table w="100%" variant="striped" colorScheme="whiteAlpha">
            <TableCaption>Tabla de nutricionistas</TableCaption>
            <Thead>
              <Tr>
                <Th>Rut</Th>
                <Th>Nombre</Th>
                <Th>Apellido</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>

            <Tbody>
              {nutritionistFiltered?.map((nutritionists) => (
                <NutritionistListTable
                  key={nutritionists.rut}
                  request={rut.includes(nutritionists.rut)}
                  rutNutritionist={nutritionists.rut}
                  name={nutritionists.name}
                  lastName={nutritionists.lastName}
                  email={nutritionists.email}
                  onReloadPage={onReloadPage}
                />
              ))}
            </Tbody>
          </Table>
        </Flex>
      </TableContainer>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const nutritionistArrayObject = [
      {
        rut: "12345678-2",
        name: "Juan",
        lastName: "Perez",
        email: "juan1@email.com",
      },
      {
        rut: "12345678-3",
        name: "Pedro",
        lastName: "Perez",
        email: "juan2@email.com",
      },
      {
        rut: "12345678-4",
        name: "Pablo",
        lastName: "Perez",
        email: "juan3@email.com",
      },
      {
        rut: "12345678-5",
        name: "Kevin",
        lastName: "Perez",
        email: "jua4n@email.com",
      },
    ];

    const appointmentArrayObject = [
      { nutritionistRut: "12345678-2" },
      { nutritionistRut: "12345678-6" },
      { nutritionistRut: "12345678-7" },
      { nutritionistRut: "12345678-3" },
    ];

    return {
      props: {
        nutritionists: nutritionistArrayObject,
        appointment: appointmentArrayObject,
      },
    };
  } catch (error) {
    return {
      props: {
        nutritionists: [],
        appointment: [],
      },
    };
  }
};
