import { Flex, useToast } from "@chakra-ui/react";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/apiClient";

type User = {
  name: string;
  lastName: string;
  email: string;
  role: "admin" | "client" | "nutritionist";
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie({}, "rut");

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const toastError = useToast({
    position: "top",
    status: "error",
    duration: 3000,
  });
  const [user, setUser] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials) {
    console.log("signIn", email, password);
    try {
      const response = await api.post("/api/login", {
        email,
        password,
      });

      console.log(response.status);

      const { rut, name, lastName, role } = response.data;

      setCookie(undefined, "rut", rut, {
        maxAge: 60 * 60 * 24 * 30, //30 dias
        path: "/",
      });

      setUser({
        name,
        lastName,
        email,
        role,
      });

      role === "nutritionist" && Router.push("/nutritionist/appointment");
      role === "admin" && Router.push("/admin/dashboard");
      role === "client" && Router.push("/client/list");
    } catch (err) {
      toastError({
        render: () => (
          <Flex
            backgroundColor="#E01F1F"
            borderRadius="7px"
            color="white"
            py="10px"
            px="12px"
            fontSize={13}
          >
            Usuario con estos datos no existe o no está válido
          </Flex>
        ),
      });
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
