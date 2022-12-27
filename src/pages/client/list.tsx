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
import nookies from "nookies";
import { useEffect, useMemo, useState } from "react";
import { NutritionistListTable } from "../../components/Table/NutritionistListTable";
import { useToasts } from "../../hooks/useToasts";
import { api } from "../../services/apiClient";

interface ClientData {
  rut: string;
  name: string;
  lastName: string;
  email: string;
  description?: string;
}

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
  client: ClientData;
}

export default function NutritionistList({
  nutritionists,
  appointment,
  client,
}: NutritionistListProps) {
  const [rut, setRut] = useState<string[]>([]);
  const { toastSuccess, toastError } = useToasts();
  const [search, setSearch] = useState("");

  const nutritionistFiltered = useMemo(() => {
    const lowerSearch = search.toLowerCase();

    return nutritionists?.filter((nutritionist) =>
      nutritionist.name.toLowerCase().includes(lowerSearch)
    );
  }, [search, nutritionists]);

  useEffect(() => {
    appointment?.map((appointment) => {
      setRut((rut) => [...rut, appointment.nutritionistRut]);
    });
  }, [appointment]);

  return (
    <Flex
      flex="1"
      align="top"
      justify="center"
      overflowX="hidden"
      overflowY="auto"
      __css={{
        "&::-webkit-scrollbar": {
          w: "2",
        },
        "&::-webkit-scrollbar-track": {
          w: "6",
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "10",
          bg: "gray.300",
        },
      }}
    >
      <TableContainer w="80%" m="45px auto 0">
        <Text mb="8px">Nutricionista:</Text>
        <Input
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar"
          size="sm"
          w="30%"
          minW="200px"
        />
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
                client={client}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { rut } = nookies.get(ctx);

    const response = await api.get("/api/users/findUsersByRole/nutritionist");

    const nutritionistsData = response.data.map((data: NutritionistProps) => {
      return {
        rut: data.rut,
        name: data.name,
        lastName: data.lastName,
        email: data.email,
      };
    });

    const responseAppointment = await api.get("/api/appointments");

    const appointmentsData = responseAppointment.data.map(
      (data: AppointmentProps) => {
        return {
          nutritionistRut: data.nutritionistRut,
        };
      }
    );

    const responseClient = await api.get(`/api/users/findUsersByRut/${rut}`);

    let clientData = {};

    responseClient.data.map((client: ClientData) => {
      clientData = {
        rut: client.rut,
        name: client.name,
        lastName: client.lastName,
        email: client.email,
        description: client.description,
      };
    });

    return {
      props: {
        nutritionists: nutritionistsData,
        appointment: appointmentsData,
        client: clientData,
      },
    };
  } catch (error) {
    return {
      props: {
        nutritionists: [],
        appointment: [],
        clientData: {},
      },
    };
  }
};
