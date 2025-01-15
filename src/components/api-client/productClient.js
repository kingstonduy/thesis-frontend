import axios from "axios";

export const productClient = axios.create({
    baseURL: "http://34.58.117.236:7002",
});

export const productGetProducts = (object) =>
    productClient.post("/is/v1/product-service/get-products", object);

export const productGetProductDetail = (object) =>
    productClient.post("/is/v1/product-service/get-product-detail", object);

export const productGetProductByGender = (object) =>
    productClient.post("/is/v1/product-service/get-products-by-gender", object);
