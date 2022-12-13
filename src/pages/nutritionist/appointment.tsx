import {
  Flex,
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
import { useRouter } from "next/router";
import nookies from "nookies";
import { AppointmentsTable } from "../../components/Table/AppointmentsTable";
import { useToasts } from "../../hooks/useToasts";
import { api } from "../../services/apiClient";

interface ClientAppointmentProps {
  rut: string;
  email: string;
  name: string;
  lastName: string;
  description?: string;
}

type Appointment = {
  _id: string;
  title: string;
  description: string;
  state: Boolean;
  createdAt: string;
  client: ClientAppointmentProps;
  nutritionistRut: string;
};

interface AppointmentProps {
  appointment: [
    {
      id: string;
      title: string;
      description: string;
      state: Boolean;
      createdAt: string;
      client: ClientAppointmentProps;
      rejectRequest: (id: string) => void;
      acceptRequest: (id: string) => void;
    }
  ];
}

export default function HandleAppointment({ appointment }: AppointmentProps) {
  const { toastSuccess, toastError } = useToasts();
  const router = useRouter();

  async function rejectRequest(id: string) {
    //Ruta por si rechaza la solicitud
    try {
      const response = await api.delete(`/appointments/${id}`);
      if (typeof window !== undefined) {
        toastSuccess({ description: "Solicitud rechazada" });
      }
    } catch (err) {
      toastError({ description: "Error al rechazar solicitud" });
    }
  }

  return (
    <Flex flex="1" justify="center" overflowY="auto" mt="45px" mb="10px">
      <Flex w="80%" flexDir="column">
        <Flex>
          <Text>Solicitudes</Text>
        </Flex>

        <TableContainer w="100%">
          <Table size="sm" colorScheme="whiteAlpha">
            <TableCaption>Tabla de solicitudes </TableCaption>
            <Thead>
              <Tr>
                <Th>Estado</Th>
                <Th>Rut</Th>
                <Th>Nombre</Th>
                <Th>Fecha de solicitud</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {appointment?.map((appointment) => {
                return (
                  <AppointmentsTable
                    key={appointment.id}
                    id={appointment.id}
                    title={appointment.title}
                    description={appointment.description}
                    state={appointment.state}
                    client={appointment.client}
                    createdAt={appointment.createdAt}
                  />
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { rut } = nookies.get(ctx);

    const response = await api.get(
      `/api/appointments/findByNutritionistRut/${rut}`
    );
    console.log(response);

    const appointmentData = response.data.map((appointment: Appointment) => {
      return {
        id: appointment._id,
        title: appointment.title,
        description: appointment.description,
        state: appointment.state,
        client: {
          rut: appointment.client.rut,
          email: appointment.client.email,
          name: appointment.client.name,
          lastName: appointment.client.lastName,
          description: appointment.client.description,
        },
        createdAt: appointment.createdAt,
      };
    });

    return {
      props: {
        appointment: appointmentData,
      },
    };
  } catch (error) {
    return {
      props: {
        appointment: [],
      },
    };
  }
};
