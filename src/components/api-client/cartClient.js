import axios from "axios";
import { HOST } from "./Axios";

export const cartClient = axios.create({
    baseURL: `http://${HOST}:8000/cart-service/`,
});

export const addCartItem = (object) =>
    cartClient.post("/is/v1/cart-service/add", object);

export const getCartItems = (object) =>
    cartClient.post("/is/v1/cart-service/get-items", object);

export const updateCartItem = (object) =>
    cartClient.post("/is/v1/cart-service/update", object);
