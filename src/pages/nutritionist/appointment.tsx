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
import { AppointmentsTable } from "../../components/Table/AppointmentsTable";
import { useToasts } from "../../hooks/useToasts";
import { api } from "../../services/apiClient";

interface ClientAppointmentProps {
  rut: string;
  email: string;
  name: string;
  lastName: string;
  created_at: string;
}

interface AppointmentProps {
  appointment: [
    {
      id: string;
      title: string;
      description: string;
      state: Boolean;
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

  async function acceptRequest(id: string) {
    try {
      //Ruta por si acepta la solicitud
      const response = await api.put(`/appointments/${id}`);
      if (typeof window !== undefined) {
        toastSuccess({ description: "Solicitud aceptada" });
      }
    } catch (err) {
      toastError({ description: "Error al aceptar solicitud" });
    }
  }

  return (
    <Flex flex="1" justify="center" overflowY="auto" mt="45px" mb="10px">
      <Flex w="80%" flexDir="column">
        <Flex>
          <Text>Hola</Text>
        </Flex>

        <TableContainer w="100%">
          <Table size="sm" colorScheme="whiteAlpha">
            <TableCaption>Tabla de solicitudes </TableCaption>
            <Thead>
              <Tr>
                <Th>Estado</Th>
                <Th>Nombre</Th>
                <Th>Fecha</Th>
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
                    rejectRequest={rejectRequest}
                    acceptRequest={acceptRequest}
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

export const getServerSideProps: GetServerSideProps = (ctx) => {
  try {
    const appointment = [
      {
        id: "1",
        title: "Cita 1",
        description: "Cita 1",
        state: true,
        client: {
          rut: "1",
          email: "1",
          name: "1",
          lastName: "1",
          created_at: "1",
        },
      },
      {
        id: "2",
        title: "Cita 2",
        description: "Cita 2",
        state: false,
        client: {
          rut: "2",
          email: "2",
          name: "2",
          lastName: "2",
          created_at: "2",
        },
      },
    ];

    return {
      props: {
        appointment,
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
