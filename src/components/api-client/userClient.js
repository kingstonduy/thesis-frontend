import axios from "axios";

export const productClient = axios.create({
    baseURL: "http://localhost:7002",
});

export const Userlogin = (object) =>
    userClient.post("/is/v1/user-service/login", object);

export const Userregister = (object) =>
    userClient.post("/is/v1/user-service/register", object);

export const UserGetUserInfo = (object) =>
    userClient.post("/is/v1/user-service/get-user-information", object);

export const Userupdate = (object) =>
    userClient.post("/is/v1/user-service/update", object);
