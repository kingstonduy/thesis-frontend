import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { productGetProductByGender } from "./api-client/productClient";

const ProductGenderMen = () => {
    const gender = "men";
    const pageSize = 24; // Set maximum products per page to 32
    const [currentPage, setCurrentPage] = useState(1);
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [maxPages, setMaxPages] = useState(0);
    const navigate = useNavigate(); // Initialize the navigate function

    // Fetch all products and calculate pagination
    const fetchAllProducts = async () => {
        const timestamp = Date.now(); // Current timestamp as a numeric value
        const guid = crypto.randomUUID(); // Generate a unique GUID (modern browsers support this)

        const requestBody = {
            data: {
                gender: gender,
            },
            trace: {
                frm: "local",
                to: "product-service",
                cts: timestamp,
                cid: guid,
            },
        };

        try {
            const response = await productGetProductByGender(requestBody);
            console.log("response" + response);
            if (response.data.result.code !== "00") {
                // Show alert if code is not "00"
                alert(
                    `Error: ${response.data.result.message || "Unknown error"}`
                );
                console.error("Details:", response.data.result.details);
                return;
            }

            const fetchedProducts = response.data.data.details.map(
                (product) => ({
                    id: product.productId,
                    name: product.productName,
                    price: product.productPrice,
                    rating: product.averageRating,
                    image: product.productImage,
                })
            );

            setAllProducts(fetchedProducts);

            const calculatedMaxPages = Math.ceil(
                fetchedProducts.length / pageSize
            );
            setMaxPages(calculatedMaxPages);
            updatePageProducts(1, fetchedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
            alert("Failed to fetch products. Please try again later.");
        }
    };

    // Update products for the current page
    const updatePageProducts = (page, fetchedProducts = allProducts) => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setProducts(fetchedProducts.slice(startIndex, endIndex));
    };

    // Initial data fetch
    useEffect(() => {
        // check if all products are fetched
        if (allProducts.length === 0) {
            fetchAllProducts();
        }
    }, []);

    // Update products when currentPage changes
    useEffect(() => {
        updatePageProducts(currentPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    // Generate dynamic pagination range
    const getPaginationRange = () => {
        const range = [];
        range.push(1); // Always include page 1

        if (currentPage > 4) {
            range.push("...");
        }

        for (
            let i = Math.max(2, currentPage - 2);
            i <= Math.min(currentPage + 2, maxPages - 1);
            i++
        ) {
            range.push(i);
        }

        if (currentPage < maxPages - 3) {
            range.push("...");
        }

        if (maxPages > 1) {
            range.push(maxPages); // Always include the last page
        }

        return range;
    };

    // Handle page change
    const handlePageChange = (page) => {
        if (page === "..." || page < 1 || page > maxPages) return;
        setCurrentPage(page);
    };

    // Handle product click to navigate to the detail page
    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="pr-32 pl-32 pt-10 pd-10 min-h-[1000px]">
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)} // Add click handler
                        className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-transform cursor-pointer"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-49 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-base font-medium text-gray-800 line-clamp-2 leading-tight">
                                {product.name}
                            </h3>
                            <p className="text-lg font-semibold text-red-500">
                                ${product.price.toLocaleString()}
                            </p>
                            {/* <div className="flex items-center space-x-1 text-sm text-yellow-500">
                                <svg
                                    className="w-4 h-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2l2.9 8.26H22l-7.05 5.11L16.8 22 12 17.27 7.2 22l1.15-6.63L2 10.26h7.1L12 2z" />
                                </svg>
                                <span>{product.rating}</span>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Bar */}
            <div className="flex justify-center items-center space-x-2 my-4">
                {/* Pagination Buttons */}
                {getPaginationRange().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded ${
                            page === currentPage
                                ? "bg-blue-500 text-white font-bold"
                                : page === "..."
                                ? "bg-gray-300 text-gray-500 cursor-default"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        disabled={page === "..."}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductGenderMen;
