import axios from "axios";

export const cartClient = axios.create({
    baseURL: "http://34.142.145.208:7003",
});

export const addCartItem = (object) =>
    cartClient.post("/is/v1/cart-service/add", object);

export const getCartItems = (object) =>
    cartClient.post("/is/v1/cart-service/get-items", object);

export const updateCartItem = (object) =>
    cartClient.post("/is/v1/cart-service/update", object);
