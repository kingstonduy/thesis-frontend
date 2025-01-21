import React, { useEffect, useState } from "react";
import { Button, Drawer, Space } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { updateCartItem } from "./api-client/cartClient";

const Drawler = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const cartClient = axios.create({
        baseURL: "http://34.124.235.0:7003",
    });

    const getCartItems = (object) =>
        cartClient.post("/is/v1/cart-service/get-items", object);

    const fetchCartItems = async () => {
        setCartItems([]);
        const timestamp = Date.now();
        const guid = crypto.randomUUID();
        const requestBody = {
            data: {
                userId: "e4f56512-65d7-4414-8442-4305129920ef",
            },
            trace: {
                frm: "local",
                to: "product-service",
                cts: timestamp,
                cid: guid,
            },
        };
        try {
            const response = await getCartItems(requestBody);
            if (response.data.result.code !== "00") {
                alert(
                    `Error: ${response.data.result.message || "Unknown error"}`
                );
                console.error("Details:", response.data.result.details);
                setCartItems([]);
            } else {
                if (response.data.data.cartItems != null) {
                    const fetchedCartItems = response.data.data.cartItems.map(
                        (item) => ({
                            id: item.cartItemId,
                            name: item.productName,
                            image: item.productImage,
                            price: parseFloat(item.productPrice),
                            quantity: item.cartItemQuantity,
                            catergory: item.productCatergory,
                        })
                    );
                    setCartItems(fetchedCartItems);
                }
            }
        } catch (error) {
            console.error("Error retrieving cart items:", error);
            alert("Error retrieving cart items. Please try again later.");
        }
    };

    useEffect(() => {
        setCartItems([]);
        fetchCartItems();
    }, []);

    const handleCheckout = () => {
        setOpen(false);
        console.log(cartItems);
        if (cartItems.length === 0) {
            alert("Cart is empty. Please add items to proceed.");
            return;
        }
        navigate("/checkout");
    };

    // Handles increment or decrement of the product quantity
    const adjustQuantity = async (id, currentQuantity, type) => {
        const timestamp = Date.now();
        const guid = crypto.randomUUID();
        let newQuantity = currentQuantity;
        if (type === "decrease") {
            newQuantity = currentQuantity - 1;
        } else {
            newQuantity = currentQuantity + 1;
        }
        const requestBody = {
            data: {
                cartItemId: id,
                cartItemQuantity: newQuantity,
            },
            trace: {
                frm: "local",
                to: "cart-service",
                cts: timestamp,
                cid: guid,
            },
        };

        try {
            const response = await updateCartItem(requestBody);
            if (response.data.result.code !== "00") {
                // Show alert if code is not "00"
                alert(
                    `Error: ${response.data.result.message || "Unknown error"}`
                );
                console.error("Details:", response.data.result.details);
            } else {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === id
                            ? {
                                  ...item,
                                  quantity:
                                      type === "increase"
                                          ? item.quantity + 1
                                          : Math.max(item.quantity - 1, 1),
                              }
                            : item
                    )
                );
            }
        } catch (error) {
            console.error("Error update cart items:", error);
            alert("Error update cart items. Please try again later.");
        }
    };

    // Removes a product from the cart
    const removeFromCart = async (id) => {
        const timestamp = Date.now();
        const guid = crypto.randomUUID();

        const requestBody = {
            data: {
                cartItemId: id,
                cartItemQuantity: 0,
            },
            trace: {
                frm: "local",
                to: "cart-service",
                cts: timestamp,
                cid: guid,
            },
        };

        try {
            const response = await updateCartItem(requestBody);
            if (response.data.result.code !== "00") {
                // Show alert if code is not "00"
                alert(
                    `Error: ${response.data.result.message || "Unknown error"}`
                );
                console.error("Details:", response.data.result.details);
            } else {
                setCartItems((prevItems) =>
                    prevItems.filter((item) => item.id !== id)
                );
            }
        } catch (error) {
            console.error("Error update cart items:", error);
            alert("Error update cart items. Please try again later.");
        }
    };

    const showDrawer = () => {
        fetchCartItems();
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="flex justify-center">
                <div onClick={showDrawer} className="cursor-pointer">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-500 transition duration-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10 text-black hover:text-black duration-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            />
                        </svg>
                    </div>
                </div>
                <Drawer
                    title="Your Cart"
                    placement="right"
                    width={500}
                    onClose={onClose}
                    open={open}
                >
                    {/* Scrollable cart items container */}
                    <div
                        className="overflow-y-auto"
                        style={{ maxHeight: "80vh" }}
                    >
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-rows-2 grid-cols-3 gap-4 items-center mb-4 border-b pb-4"
                                >
                                    <div className="row-span-2 col-span-1 flex justify-center items-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-30 h-30 object-cover rounded-md"
                                        />
                                    </div>
                                    <div className="col-span-1 row-start-1 row-end-2">
                                        <h3 className="text-lg font-semibold">
                                            {item.name}
                                        </h3>
                                    </div>
                                    <div className="col-span-1 row-start-2 row-end-3 text-sm text-gray-500">
                                        <p>Category: {item.catergory}</p>
                                    </div>
                                    <div className="col-span-1 row-start-1 row-end-2 text-right text-lg font-semibold pr-4">
                                        $
                                        {parseFloat(
                                            item.price * item.quantity
                                        ).toFixed(2)}
                                    </div>

                                    <div className="col-span-1 row-start-2 row-end-3 flex justify-end items-center">
                                        <div className="flex items-center">
                                            {/* Decrease Button or Trash Bin */}
                                            <div className="w-10 h-10 flex justify-center items-center rounded-l-full border-t border-b border-l hover:bg-gray-300 transition duration-300 cursor-pointer">
                                                {item.quantity > 1 ? (
                                                    <button
                                                        onClick={() =>
                                                            adjustQuantity(
                                                                item.id,
                                                                item.quantity,
                                                                "decrease"
                                                            )
                                                        }
                                                        className="focus:outline-none"
                                                    >
                                                        {/* Minus Icon */}
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            width="20px"
                                                            height="20px"
                                                            fill="none"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                d="M18 12H6"
                                                            ></path>
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item.id
                                                            )
                                                        }
                                                        className="focus:outline-none"
                                                    >
                                                        {/* Trash Bin Icon */}
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            width="20px"
                                                            height="20px"
                                                            fill="none"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                d="M13.75 10v7m-3.5-7v7m-3.5-8.5V17c0 1.24 1.01 2.25 2.25 2.25h6c1.24 0 2.25-1.01 2.25-2.25V7.75h2.25m-10-3h3.75c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H4.5"
                                                            ></path>
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>

                                            {/* Quantity Display */}
                                            <div className="flex justify-center items-center w-12 h-10 border-t border-b text-lg font-medium">
                                                {item.quantity}
                                            </div>

                                            {/* Increase Button */}
                                            <div className="w-10 h-10 flex justify-center items-center rounded-r-full border-t border-b border-r hover:bg-gray-300 transition duration-300 cursor-pointer">
                                                <button
                                                    onClick={() =>
                                                        adjustQuantity(
                                                            item.id,
                                                            item.quantity,
                                                            "increase"
                                                        )
                                                    }
                                                    className="focus:outline-none"
                                                >
                                                    {/* Plus Icon */}
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        width="20px"
                                                        height="20px"
                                                        fill="none"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            d="M12 6v12m6-6H6"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>
                    {/* Checkout Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800 transition duration-300"
                            onClick={handleCheckout}
                        >
                            Go to Checkout
                        </button>
                    </div>
                </Drawer>
            </div>
        </>
    );
};

export default Drawler;
