import axios from "axios";
import { HOST } from "./Axios";

export const orderClient = axios.create({
    baseURL: `http://${HOST}:8000/order-service/`,
});

export const executeTransaction = (object) =>
    orderClient.post("/is/v1/order-service/execute-transaction", object);
export const getHistory = (object) =>
    orderClient.post("/is/v1/order-service/get-history", object);
