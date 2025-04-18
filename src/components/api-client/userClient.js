import axios from "axios";
import { HOST, agent } from "./Axios";

export const userClient = axios.create({
    baseURL: `https://${HOST}:8443/user-service/`,
    httpsAgent: agent,
});

export const AutoLogin = () => {
    userClient.post("/is/v1/user-service/check-jwt", object);
};

export const Userlogin = (object) =>
    userClient.post("/is/v1/user-service/login", object, {
        // withCredentials: true,
    });

export const UserRegister = (object) =>
    userClient.post("/is/v1/user-service/register", object);

export const UserGetUserInfo = (object) =>
    userClient.post("/is/v1/user-service/get-user-information", object);

export const Userupdate = (object) =>
    userClient.post("/is/v1/user-service/update", object);

export const CheckJwt = (object) =>
    userClient.post("/is/v1/user-service/check-jwt", object, {});
