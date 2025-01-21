import axios from "axios";
import { HOST } from "./Axios";

export const orderClient = axios.create({
    baseURL: `http://${HOST}:7005`,
});

export const executeTransaction = (object) =>
    orderClient.post("/is/v1/order-service/execute-transaction", object);
export const getHistory = (object) =>
    orderClient.post("/is/v1/order-service/get-history", object);
