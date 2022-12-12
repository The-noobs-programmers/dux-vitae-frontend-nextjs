import type { AppProps } from "next/app";

import { ChakraProvider, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SidebarClient } from "../components/Sidebar/SidebarClient";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "../hooks/useToasts";
import { theme } from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ChakraProvider theme={theme}>
      <ToastProvider>
        <AuthProvider>
          <Flex h="100vh" w="100vw">
            {router.asPath.startsWith("/admin") ? <SidebarClient /> : null}
            {router.asPath.startsWith("/client") ? <SidebarClient /> : null}
            {router.asPath.startsWith("/nutritionist") ? (
              <SidebarClient />
            ) : null}
            <Component {...pageProps} />
          </Flex>
        </AuthProvider>
      </ToastProvider>
    </ChakraProvider>
  );
}
