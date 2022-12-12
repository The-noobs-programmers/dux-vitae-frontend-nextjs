import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";

let isRefreshing = false;
let failedRequestsQueue: {
  onSuccess: (token: string) => void;
  onFailure: (err: AxiosError<any>) => void;
}[] = [];

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:9000/",
  });

  //interceptar respuesta de la api provenientes del backend
  // api.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error: AxiosError) => {
  //     if (error?.response?.status === 401) {
  //       // error.response.data.code === "token.expired"
  //       if (error.response.data === "token.expired") {
  //         //Renovar token
  //         cookies = parseCookies(ctx);

  //         const { "nextauth.refreshToken": refreshToken } = cookies;

  //         //error.config tiene toda la configuración de la requisición del backend
  //         //Tiene toda la configuración que se necesita para repetir una requisición al backend
  //         const { config } = error;
  //         if (!isRefreshing) {
  //           isRefreshing = true;
  //           api
  //             .post("/refresh", { refreshToken })
  //             .then((response) => {
  //               const { token } = response.data;

  //               setCookie(ctx, "nextauth.token", token, {
  //                 maxAge: 60 * 60 * 24 * 30, //30 dias
  //                 //Para que pueda accederse desde todas las páginas
  //                 path: "/",
  //               });

  //               setCookie(
  //                 ctx,
  //                 "nextauth.refreshToken",
  //                 response.data.refreshToken,
  //                 {
  //                   maxAge: 60 * 60 * 24 * 30, //30 dias
  //                   path: "/",
  //                 }
  //               );

  //               //token actualizado
  //               api.defaults.headers["Authorization"] = `Bearer ${token}`;

  //               //Paso el token actualizado por cada request fallada
  //               failedRequestsQueue.forEach((request) =>
  //                 request.onSuccess(token)
  //               );

  //               failedRequestsQueue = [];
  //             })
  //             .catch((err) => {
  //               failedRequestsQueue.forEach((request) =>
  //                 request.onFailure(err)
  //               );

  //               failedRequestsQueue = [];

  //               if (typeof window !== "undefined") {
  //                 signOut();
  //               }
  //             })
  //             .finally(() => {
  //               isRefreshing = false;
  //             });
  //         }

  //         return new Promise((resolve, reject) => {
  //           failedRequestsQueue.push({
  //             onSuccess: (token: string) => {
  //               config!.headers = config!.headers ?? {};
  //               config!.headers.Authorization = `Bearer ${token}`;

  //               resolve(api(config!));
  //             },
  //             onFailure: (err: AxiosError) => {
  //               reject(err);
  //             },
  //           });
  //         });
  //       } else {
  //         //Desconectar el usuario
  //         if (typeof window !== "undefined") {
  //           ("Error en api");

  //           signOut();
  //         } else {
  //           return Promise.reject(new AuthTokenError());
  //         }
  //       }
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return api;
}
