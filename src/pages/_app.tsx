import type { AppProps } from "next/app";

import { ChakraProvider, Flex } from "@chakra-ui/react";
import { ToastProvider } from "../hooks/useToasts";
import { theme } from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ToastProvider>
        <Flex h="100vh" w="100vw">
          <Component {...pageProps} />
        </Flex>
      </ToastProvider>
    </ChakraProvider>
  );
}
