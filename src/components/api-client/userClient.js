import axios from "axios";
import { HOST } from "./Axios";

export const userClient = axios.create({
    baseURL: `http://${HOST}:8000/user-service/`,
});

export const AutoLogin = () => {
    userClient.post("/is/v1/user-service/check-jwt", object);
};

export const Userlogin = (object) =>
    userClient.post("/is/v1/user-service/login", object, {
        withCredentials: true,
    });

export const UserRegister = (object) =>
    userClient.post("/is/v1/user-service/register", object);

export const UserGetUserInfo = (object) =>
    userClient.post("/is/v1/user-service/get-user-information", object);

export const Userupdate = (object) =>
    userClient.post("/is/v1/user-service/update", object);

export const CheckJwt = (object) =>
    userClient.post("/is/v1/user-service/check-jwt", object, {
        withCredentials: true, // Ensure cookies are sent
    });
