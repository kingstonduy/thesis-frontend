import axios from "axios";

export const userClient = axios.create({
    baseURL: "http://localhost:7001",
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
