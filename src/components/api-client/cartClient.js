import axios from "axios";
import { HOST, agent } from "./Axios";

export const cartClient = axios.create({
    baseURL: `https://${HOST}:8443/cart-service/`,
    httpsAgent: agent,
});

export const addCartItem = (object) =>
    cartClient.post("/is/v1/cart-service/add", object);

export const getCartItems = (object) =>
    cartClient.post("/is/v1/cart-service/get-items", object);

export const updateCartItem = (object) =>
    cartClient.post("/is/v1/cart-service/update", object);
