import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "./Comment";

const ProductDetailPage = () => {
    const { productId } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    // Example product data (In a real app, you'd fetch this from an API)
    useEffect(() => {
        const fetchProduct = async () => {
            const product = {
                id: "1",
                name: "Stylish Sneaker",
                category: "Men's Sneakers",
                price: "$129.99",
                description: {
                    Description:
                        "We loaded the Revolution 7 with the sort of soft cushioning and support that might change your running world. Stylish as ever, comfortable when the rubber meets the road and performance-driven for your desired pace, it's an evolution of a fan favourite that offers a soft, smooth ride. We added the quick-and-easy toggle system that makes putting these shoes on and taking them off a breeze.",
                    Material: "High-quality synthetic leather",
                    Features: [
                        "Breathable mesh",
                        "Rubber outsole",
                        "Padded collar",
                    ],
                    Care: "Wipe with a damp cloth, do not machine wash",
                    Origin: "This product was responsibly designed utilising recycled materials from post-consumer and/or post-manufactured waste. One of our biggest steps on our journey to zero carbon and zero waste is in choosing our materials because they account for more than 70% of any product's footprint. By reusing existing plastics, yarns and textiles, we significantly reduce our emissions. Our goal is to use as many recycled materials as possible without compromising on performance, durability and style.",
                },
                sizes: ["7", "8.5", "9", "10", "10.5", "11", "11.5", "12"],
                image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8b0d4d2e-d306-4b50-b335-e9c8202144d8/NIKE+DUNK+LOW+SE.png",
            };
            setProduct(product);
        };

        fetchProduct();
    }, [productId]);

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        alert("Sneaker added to cart!");
    };

    const renderDescription = (description) => {
        return Object.entries(description).map(([key, value]) => (
            <div key={key} className="mb-4">
                {Array.isArray(value) ? (
                    <ul className="list-disc pl-5">
                        {value.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p>{value}</p>
                )}
            </div>
        ));
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-col lg:flex-row gap-8">
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
                    <h1 className="text-customGray font-medium text-[20px] mb-2">
                        {product.name}
                    </h1>

                    {/* Product Category */}
                    <p className="text-customGray text-[16px] mb-2">
                        {product.category}
                    </p>

                    {/* Product Price */}
                    <p className="text-customGray text-[16px] mb-4">
                        {product.price}
                    </p>

                    {/* Size Selector */}
                    <div className="mb-6">
                        <h2 className="text-[16px] font-semibold mb-2">
                            Select Size{" "}
                            <span className="text-sm">(Size Guide)</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {product.sizes.map((size, index) => (
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
                        {renderDescription(product.description)}
                    </div>
                </div>
            </div>
            <CommentSection />
        </div>
    );
};

export default ProductDetailPage;
