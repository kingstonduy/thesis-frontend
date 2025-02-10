import axios from "axios";
import { HOST } from "./Axios";

export const productClient = axios.create({
    baseURL: `http://${HOST}:8000/product-service/`,
    referrerPolicy: "unsafe-url",
});

export const productGetProducts = (object) =>
    productClient.post("/is/v1/product-service/get-products", object);

export const productGetProductDetail = (object) =>
    productClient.post("/is/v1/product-service/get-product-detail", object);

export const productGetProductByGender = (object) =>
    productClient.post("/is/v1/product-service/get-products-by-gender", object);
