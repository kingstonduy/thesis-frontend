import axios from "axios";
import { HOST, agent } from "./Axios";

export const orderClient = axios.create({
    baseURL: `https://${HOST}:8443/order-service/`,
    httpsAgent: agent,
});

export const executeTransaction = (object) =>
    orderClient.post("/is/v1/order-service/execute-transaction", object);
export const getHistory = (object) =>
    orderClient.post("/is/v1/order-service/get-history", object);
