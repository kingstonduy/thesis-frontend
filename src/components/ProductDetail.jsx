import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productClient } from "./api-client/productClient";
import CommentSection from "./Comment";
import { addCartItem } from "./api-client/cartClient";
import { message } from "antd";

export const productGetProductDetail = (object) =>
    productClient.post("/is/v1/product-service/get-product-detail", object);

const ProductDetailPage = () => {
    const { productId } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            const timestamp = Date.now(); // Current timestamp as a numeric value
            const guid = crypto.randomUUID(); // Generate a unique GUID

            const requestBody = {
                trace: {
                    frm: "client",
                    to: "product-service",
                    cts: timestamp,
                    cid: guid,
                },
                data: {
                    productId: productId, // Use the productId from URL params
                },
            };

            console.log(requestBody);
            try {
                const response = await productGetProductDetail(requestBody);

                if (response.data.result.code !== "00") {
                    alert(
                        `Error: ${
                            response.data.result.message || "Unknown error"
                        }`
                    );
                    console.error("Details:", response.data.result.details);
                    return;
                }

                const parsedDescription = JSON.parse(
                    response.data.data.productDescription
                );

                const fetchedProduct = {
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
                    image: response.data.data.productImage,
                };

                setProduct(fetchedProduct);
            } catch (error) {
                console.error("Error fetching product details:", error);
                alert(
                    "Failed to fetch product details. Please try again later."
                );
            }
        };

        fetchProductDetail();
    }, [productId]);

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = async () => {
        const timestamp = Date.now();
        const guid = crypto.randomUUID();
        const requestBody = {
            data: {
                cartItemQuantity: 1,
                productId: productId, // Example product ID
                userId: localStorage.getItem("userID"),
            },
            trace: {
                frm: "local",
                to: "product-service",
                cts: timestamp,
                cid: guid,
            },
        };
        console.log(requestBody);
        try {
            const response = await addCartItem(requestBody);
            if (response.data.result.code !== "00") {
                // Show alert if code is not "00"
                alert(
                    `Error: ${response.data.result.message || "Unknown error"}`
                );
                console.error("Details:", response.data.result.details);
            } else {
                message.success("add product to cart successfully!", 1); // 1 second duration
            }
        } catch (error) {
            console.error("Error add to cart:", error);
            alert("Error add to cart. Please try again later.");
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 ">
            <div className="flex flex-col lg:flex-row gap-8 min-h-[1000px]">
                {/* Product Image */}
                <div className="flex-shrink-0 w-full lg:w-1/2">
                    <img
                        src={product.image} // Use the product's image URL
                        alt={product.name}
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                    {/* Product Name */}
                    <h1 className="text-customGray font-medium text-[30px] mb-2">
                        {product.name}
                    </h1>

                    {/* Product Category */}
                    <div className="text-customGray text-[23px] mb-2">
                        <h2 className="text-[18px] font-semibold mb-2">
                            {product.category}
                        </h2>
                    </div>

                    {/* Product Price */}
                    <p className="text-customGray text-[20px] mb-4">
                        {product.price}
                    </p>

                    {/* Add to Cart Button */}
                    <div className="mb-6">
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-3 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300"
                        >
                            Add to Cart
                        </button>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="text-customGray font-medium text-[30px] mb-2">
                            Benefits
                        </h3>
                        <ul className="list-outside pl-5 mb-4">
                            <br />
                            {product.description.benefits.map(
                                (benefit, index) => (
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
                                )
                            )}
                        </ul>
                        <h3 className="text-customGray font-medium text-[30px] mb-2">
                            Details
                        </h3>
                        <ul className="list-outside pl-5">
                            {product.description.details.map(
                                (detail, index) => (
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
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <CommentSection />
        </div>
    );
};

export default ProductDetailPage;
