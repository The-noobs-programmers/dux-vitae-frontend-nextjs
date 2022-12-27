import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  theme,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import nookies from "nookies";
import { api } from "../../services/apiClient";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface DashboardProps {
  totalUsers: number[];
  totalUserMonth: string[];
  totalAppointments: number[];
  totalAppointmentMonth: string[];
  roles: string[];
  totalUsersByRole: number[];
}

export default function Dashboard({
  totalUsers,
  totalUserMonth,
  totalAppointments,
  totalAppointmentMonth,
  roles,
  totalUsersByRole,
}: DashboardProps) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const userRegisterOptions: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: theme.colors.gray[400],
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        color: theme.colors.gray[600],
      },
      axisTicks: {
        color: theme.colors.gray[600],
      },
      categories: totalUserMonth,
    },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
  };
  const userRegisterSeries = [{ name: "series1", data: totalUsers }];

  const appointmentOptions: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: theme.colors.gray[400],
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      type: "category",
      axisTicks: {
        color: theme.colors.gray[600],
      },
      categories: totalAppointmentMonth,
    },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
    colors: [theme.colors.pink[500]],
  };
  const appointmentSeries = [{ name: "series2", data: totalAppointments }];

  const totalUserOption: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: theme.colors.gray[400],
    },
    labels: roles,
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: undefined,
      width: 2,
      dashArray: 0,
    },
  };
  const totalUserSeries = totalUsersByRole;

  return (
    <Flex flex="1" justify="center" overflowY="auto" mt="45px" mb="10px">
      <Flex w="80%" flexDir="row">
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="420px"
          alignContent="flex-start"
        >
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Usuarios registrados
            </Text>
            <Chart
              options={userRegisterOptions}
              series={userRegisterSeries}
              type="area"
            />
          </Box>

          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Solicitudes por mes
            </Text>
            <Chart
              options={appointmentOptions}
              series={appointmentSeries}
              type="bar"
            />
          </Box>

          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Clientes x Nutricionistas
            </Text>
            <Chart
              options={totalUserOption}
              series={totalUserSeries}
              type="pie"
            />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { rut } = nookies.get(ctx);

    //Getting total users by month and year
    const users = await api.get("/api/dashboard/users/getByMonthAndYear");

    let totalUsers = users.data.map((user: any) => user.totalUsers);

    let totalUserMonth = users.data.map((user: any) => user.monthAndYear);

    //Getting total appointments by month and year
    const appointmentData = await api.get(
      "/api/dashboard/appointment/getByMonthAndYear"
    );

    let totalAppointments = appointmentData.data.map(
      (appointment: any) => appointment.totalAppointments
    );

    let totalAppointmentMonth = appointmentData.data.map(
      (appointment: any) => appointment.monthAndYear
    );

    //Getting total client and nutritionist
    const usersData = await api.get(
      "/api/dashboard/users/getClientsVsNutritionist"
    );

    let roles = usersData.data.map((user: any) => user.role);

    let totalUsersByRole = usersData.data.map((user: any) => user.total);

    return {
      props: {
        totalUsers,
        totalUserMonth,
        totalAppointments,
        totalAppointmentMonth,
        roles,
        totalUsersByRole,
      },
    };
  } catch (error) {
    return {
      props: {
        totalUsers: [],
        totalUserMonth: [],
        totalAppointments: [],
        totalAppointmentMonth: [],
        roles: [],
        totalUsersByRole: [],
      },
    };
  }
};
