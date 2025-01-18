import axios from "axios";

export const orderClient = axios.create({
    baseURL: "http://34.142.145.208:7005",
});

export const executeTransaction = (object) =>
    orderClient.post("/is/v1/order-service/execute-transaction", object);
export const getHistory = (object) =>
    orderClient.post("/is/v1/order-service/get-history", object);
