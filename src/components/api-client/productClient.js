import axios from "axios";

export const productClient = axios.create({
    baseURL: "http://34.142.145.208:7002",
});

export const productGetProducts = (object) =>
    productClient.post("/is/v1/product-service/get-products", object);

export const productGetProductDetail = (object) =>
    productClient.post("/is/v1/product-service/get-product-detail", object);

export const productGetProductByGender = (object) =>
    productClient.post("/is/v1/product-service/get-products-by-gender", object);
