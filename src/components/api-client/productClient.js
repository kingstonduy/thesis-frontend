import axios from "axios";

export const productClient = axios.create({
    baseURL: "http://localhost:7002",
});

export const productGetProducts = (object) =>
    productClient.post("/is/v1/product-service/get-products", object);

export const productGetProductDetail = (object) =>
    productClient.post("/is/v1/product-service/get-product-detail", object);
