import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  theme,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
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
    categories: [
      "2021-03-18T00:00:00.000Z",
      "2021-03-19T00:00:00.000Z",
      "2021-03-20T00:00:00.000Z",
      "2021-03-21T00:00:00.000Z",
      "2021-03-22T00:00:00.000Z",
      "2021-03-23T00:00:00.000Z",
      "2021-03-24T00:00:00.000Z",
      "2021-03-25T00:00:00.000Z",
    ],
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
const series = [{ name: "series1", data: [41, 120, 10, 28, 61, 18, 100, 20] }];

const barOptions: ApexOptions = {
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
    categories: ["Enero", "Febrero", "Marzo", "Abril"],
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
const barSeries = [{ name: "series2", data: [41, 120, 10, 28] }];

export default function Dashboard() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex flex="1" align="top" justify="center" overflowY="auto">
      <Flex w="80%" mt="45px" flexDir="row">
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignContent="flex-start"
        >
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            <Chart options={options} series={series} type="area" />
          </Box>
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            <Chart options={options} series={series} type="area" />
          </Box>

          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            <Chart options={options} series={series} type="area" />
          </Box>

          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            <Chart options={barOptions} series={barSeries} type="bar" />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
