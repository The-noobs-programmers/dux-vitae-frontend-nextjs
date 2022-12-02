import type { AppProps } from "next/app";

import { ChakraProvider, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SidebarClient } from "../components/Sidebar/SidebarClient";
import { ToastProvider } from "../hooks/useToasts";
import { theme } from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ChakraProvider theme={theme}>
      <ToastProvider>
        <Flex h="100vh" w="100vw">
          {router.pathname === "/client/list" ? <SidebarClient /> : null}
          {router.pathname === "/client/profile" ? <SidebarClient /> : null}
          {router.pathname === "/admin/client" ? <SidebarClient /> : null}
          <Component {...pageProps} />
        </Flex>
      </ToastProvider>
    </ChakraProvider>
  );
}
