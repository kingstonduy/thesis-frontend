import axios from "axios";
import { HOST, agent } from "./Axios";

export const productClient = axios.create({
    baseURL: `https://${HOST}:8443/product-service/`,
    httpsAgent: agent,
});

export const productGetProducts = (object) =>
    productClient.post("/is/v1/product-service/get-products-page", object);

export const productGetProductDetail = (object) =>
    productClient.post("/is/v1/product-service/get-product-detail", object);

export const productGetProductByGender = (object) =>
    productClient.post("/is/v1/product-service/get-products-by-gender", object);
