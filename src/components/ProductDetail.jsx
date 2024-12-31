import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productClient } from "./api-client/productClient";
import CommentSection from "./Comment";

export const productGetProductDetail = (object) =>
    productClient.post("/is/v1/product-service/get-product-detail", object);

const ProductDetailPage = () => {
    const { productId } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            console.log(productId);
            const timestamp = Date.now(); // Current timestamp as a numeric value
            const guid = crypto.randomUUID(); // Generate a unique GUID

            const requestBody = {
                trace: {
                    frm: "local",
                    to: "product-service",
                    cts: timestamp,
                    cid: guid,
                },
                data: {
                    productId: productId, // Use the productId from URL params
                },
            };

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
                    price: `₫${response.data.data.productPrice.toLocaleString()}`,
                    description: {
                        main: parsedDescription.description,
                        benefits: parsedDescription.benefits,
                        details: parsedDescription.product_details,
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

    const handleAddToCart = () => {
        alert("Sneaker added to cart!");
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
                    <p className="text-customGray text-[23px] mb-2">
                        <h2 className="text-[18px] font-semibold mb-2">
                            {product.category}
                        </h2>
                    </p>

                    {/* Product Price */}
                    <p className="text-customGray text-[20px] mb-4">
                        {product.price}
                    </p>

                    {/* Size Selector */}
                    <div className="mb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {product.sizes?.map((size, index) => (
                                <button
                                    key={index}
                                    id={`size-${size}`}
                                    onClick={() => handleSizeSelect(size)}
                                    className={`w-[86px] h-[46px] rounded-lg border-2 text-[16px] font-medium transition-colors ${
                                        selectedSize === size
                                            ? "bg-black text-white border-black"
                                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:border-black"
                                    }`}
                                >
                                    US {size}
                                </button>
                            ))}
                        </div>
                    </div>

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
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            Description
                        </h2>
                        <p>{product.description.main}</p>
                        <br></br>
                        <h3 className="text-md font-semibold text-gray-800 mb-2">
                            Benefits
                        </h3>
                        <ul className="list-disc pl-5 mb-4">
                            {product.description.benefits.map(
                                (benefit, index) => (
                                    <li key={index}>{benefit}</li>
                                )
                            )}
                        </ul>
                        <h3 className="text-md font-semibold text-gray-800 mb-2">
                            Details
                        </h3>
                        <ul className="list-disc pl-5">
                            {product.description.details.map(
                                (detail, index) => (
                                    <li key={index}>{detail}</li>
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
