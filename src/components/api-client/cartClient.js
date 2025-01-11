import axios from "axios";

export const cartClient = axios.create({
    baseURL: "http://localhost:7003/is/v1/cart-service",
});

export const addCartItem = (object) => cartClient.post("/add", object);

export const getCartItems = (object) => cartClient.post("/get-items", object);

export const updateCartItem = (object) => cartClient.post("/update", object);
