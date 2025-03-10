import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { productGetProducts } from "./api-client/productClient";

const ProductGenderMen = () => {
    const pageSize = 24;
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [maxPages, setMaxPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Memoize fetchAllProducts to prevent recreation on every render
    const fetchAllProducts = useCallback(async (page) => {
        if (isLoading) return; // Prevent multiple simultaneous requests

        setIsLoading(true);
        const timestamp = Date.now();
        const guid = crypto.randomUUID();

        const requestBody = {
            data: {
                pageNumber: page,
                gender: "men",
            },
            trace: {
                frm: "local",
                to: "product-service",
                cts: timestamp,
                cid: guid,
            },
        };

        try {
            const response = await productGetProducts(requestBody);

            if (response.data.result.code !== "00") {
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
                    image: product.productImage,
                    quantity: product.productQuantity,
                })
            );

            setProducts(fetchedProducts);
            setMaxPages(response.data.data.totalPage);
        } catch (error) {
            console.error("Error fetching products:", error);
            alert("Failed to fetch products. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Use useEffect only for the page change
    useEffect(() => {
        fetchAllProducts(currentPage);
    }, [currentPage, fetchAllProducts]);

    // Memoize pagination range calculation
    const paginationRange = useMemo(() => {
        const range = [1];

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
            range.push(maxPages);
        }

        return range;
    }, [currentPage, maxPages]);

    const handlePageChange = useCallback(
        (page) => {
            if (page === "..." || page < 1 || page > maxPages || isLoading)
                return;
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        [maxPages, isLoading]
    );

    const handleProductClick = useCallback(
        (productId) => {
            navigate(`/product/${productId}`);
        },
        [navigate]
    );

    return (
        <div className="pr-32 pl-32 pt-10 pd-10 min-h-[1000px]">
            {/* Loading indicator */}
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-1">
                    <div className="h-full bg-blue-500 animate-pulse"></div>
                </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-transform cursor-pointer"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-49 object-cover rounded-t-lg"
                            loading="lazy"
                        />
                        <div className="p-4">
                            <h3 className="text-base font-medium text-gray-800 line-clamp-2 leading-tight">
                                {product.name}
                            </h3>
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold text-red-500">
                                    ${product.price.toLocaleString()}
                                </p>
                                <p className="text-lg font-semibold text-orange-500">
                                    Quantity: {product.quantity}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Bar */}
            <div className="flex justify-center items-center space-x-2 my-4">
                {paginationRange.map((page, index) => (
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
                        disabled={page === "..." || isLoading}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductGenderMen;
