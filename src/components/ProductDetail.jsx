import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { productClient } from "./api-client/productClient";
import { addCartItem } from "./api-client/cartClient";
import { message } from "antd";

export const productGetProductDetail = (object) =>
    productClient.post("/is/v1/product-service/get-product-detail", object);

const ProductDetailPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    // Memoize the fetch function
    const fetchProductDetail = useCallback(async () => {
        if (!productId) return;

        setIsLoading(true);
        const timestamp = Date.now();
        const guid = crypto.randomUUID();

        const requestBody = {
            trace: {
                frm: "client",
                to: "product-service",
                cts: timestamp,
                cid: guid,
            },
            data: {
                productId,
            },
        };

        try {
            const response = await productGetProductDetail(requestBody);

            if (response.data.result.code !== "00") {
                message.error(response.data.result.message || "Unknown error");
                return;
            }

            const parsedDescription = JSON.parse(
                response.data.data.productDescription
            );

            setProduct({
                id: response.data.data.productId,
                name: response.data.data.productName,
                category: response.data.data.productCatergory,
                price: `$${Number(
                    response.data.data.productPrice
                ).toLocaleString()}`,
                description: {
                    benefits: parsedDescription.benefits.map((item) => ({
                        header: item.header,
                        body: item.body,
                    })),
                    details: parsedDescription.product_details.map(
                        (detail) => ({
                            header: detail.header,
                            body: detail.body,
                        })
                    ),
                },
                quantity: response.data.data.productQuantity,
                image: response.data.data.productImage,
                gender: response.data.data.gender,
            });
        } catch (error) {
            console.error("Error fetching product details:", error);
            message.error("Failed to fetch product details");
        } finally {
            setIsLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchProductDetail();
    }, [fetchProductDetail]);

    // Memoize the add to cart handler
    const handleAddToCart = useCallback(async () => {
        if (isAddingToCart) return;

        setIsAddingToCart(true);
        const timestamp = Date.now();
        const guid = crypto.randomUUID();

        const requestBody = {
            data: {
                cartItemQuantity: 1,
                productId,
                userId: localStorage.getItem("userID"),
            },
            trace: {
                frm: "local",
                to: "product-service",
                cts: timestamp,
                cid: guid,
            },
        };

        try {
            const response = await addCartItem(requestBody);
            if (response.data.result.code === "00") {
                message.success("Added to cart successfully!");
            } else {
                message.error(
                    response.data.result.message || "Failed to add to cart"
                );
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            message.error("Failed to add to cart");
        } finally {
            setIsAddingToCart(false);
        }
    }, [productId, isAddingToCart]);

    // Memoize the benefits list
    const BenefitsList = useMemo(() => {
        if (!product?.description?.benefits) return null;

        return (
            <ul className="list-outside pl-5 mb-4">
                {product.description.benefits.map((benefit, index) => (
                    <li key={index}>
                        <strong>{benefit.header}:</strong>
                        <ul className="list-disc pl-5">
                            <br />
                            {benefit.body.map((point, idx) => (
                                <li key={idx}>{point}</li>
                            ))}
                        </ul>
                        <br />
                    </li>
                ))}
            </ul>
        );
    }, [product?.description?.benefits]);

    // Memoize the details list
    const DetailsList = useMemo(() => {
        if (!product?.description?.details) return null;

        return (
            <ul className="list-outside pl-5">
                {product.description.details.map((detail, index) => (
                    <li key={index}>
                        <div className="mb-3">
                            <strong>{detail.header}:</strong>
                        </div>
                        <ul className="list-disc pl-5">
                            {detail.body.map((point, idx) => (
                                <li key={idx} className="mb-2">
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        );
    }, [product?.description?.details]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-pulse bg-gray-200 rounded-lg w-full max-w-6xl h-96" />
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-col lg:flex-row gap-8 min-h-[1000px]">
                {/* Product Image */}
                <div className="flex-shrink-0 w-full lg:w-1/2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full rounded-lg shadow-lg"
                        loading="lazy"
                    />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                    <h1 className="text-customGray font-medium text-[30px] mb-2">
                        {product.name}
                    </h1>

                    <div className="text-customGray text-[23px] mb-2">
                        <h2 className="text-[18px] font-semibold mb-2">
                            Category: {product.category}
                        </h2>
                    </div>

                    <div className="text-customGray text-[23px] mb-2">
                        <h2 className="text-[18px] font-semibold mb-2">
                            Gender: {product.gender}
                        </h2>
                    </div>

                    <div className="text-customGray text-[23px] mb-2">
                        <h2 className="text-[18px] font-semibold mb-2">
                            Quantity: {product.quantity}
                        </h2>
                    </div>

                    <p className="text-customGray text-[20px] mt-4 mb-4">
                        {product.price}
                    </p>

                    {/* Add to Cart Button */}
                    <div className="mb-6">
                        <button
                            onClick={handleAddToCart}
                            disabled={isAddingToCart}
                            className={`w-full py-3 rounded-full transition duration-300 ${
                                isAddingToCart
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-black hover:bg-gray-800 text-white"
                            }`}
                        >
                            {isAddingToCart ? "Adding..." : "Add to Cart"}
                        </button>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="text-customGray font-medium text-[30px] mb-2">
                            Benefits
                        </h3>
                        {BenefitsList}

                        <h3 className="text-customGray font-medium text-[30px] mb-2">
                            Details
                        </h3>
                        {DetailsList}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
