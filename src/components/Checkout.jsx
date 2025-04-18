// src/CheckoutPage.jsx
import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getCartItems } from "./api-client/cartClient";
import { executeTransaction } from "./api-client/oderClient";
import { message } from "antd";
import { UserGetUserInfo } from "./api-client/userClient";

const CheckoutPage = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({ username: "test" });
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0.0);

    useEffect(() => {
        fetchCartItems();
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        const timestamp = Date.now();
        const guid = crypto.randomUUID();
        const requestBody = {
            data: {
                userId: localStorage.getItem("userID"),
            },
            trace: {
                frm: "local",
                to: "user-service",
                cts: timestamp,
                cid: guid,
            },
        };
        try {
            console.log(requestBody);
            const response = await UserGetUserInfo(requestBody);
            if (response.data.result.code !== "00") {
                // Show alert if code is not "00"
                alert(
                    `Error: ${response.data.result.message || "Unknown error"}`
                );
                console.error("Details:", response.data.result.details);
            } else {
                console.log(response);
                const fetchedUserInfo = {
                    username: response.data.data.userName,
                    phoneNumber: response.data.data.phoneNumber,
                    street: response.data.data.street,
                    city: response.data.data.city,
                    district: response.data.data.district,
                    ward: response.data.data.ward,
                };
                setUserInfo(fetchedUserInfo);
            }
        } catch (error) {
            console.error("Error get user info", error);
            alert("Error get user info. Please try again later.");
        }
    };

    const fetchCartItems = async () => {
        const timestamp = Date.now();
        const guid = crypto.randomUUID();
        const requestBody = {
            data: {
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
            console.log(requestBody);
            const response = await getCartItems(requestBody);
            if (response.data.result.code !== "00") {
                // Show alert if code is not "00"
                alert(
                    `Error: ${response.data.result.message || "Unknown error"}`
                );
                console.error("Details:", response.data.result.details);
            } else {
                console.log(response);
                if (response.data.data.cartItems != null) {
                    // Process the cartItems from the response and update the state
                    const fetchedCartItems = response.data.data.cartItems.map(
                        (item) => ({
                            id: item.cartItemId, // Use cartItemId as the unique identifier
                            name: item.productName,
                            image: item.productImage,
                            price: parseFloat(item.productPrice), // Convert to number if needed
                            quantity: item.cartItemQuantity,
                            productId: item.productId,
                        })
                    );

                    // calculate the total price
                    const calculatedTotalPrice = fetchedCartItems.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                    );
                    setTotalPrice(parseFloat(calculatedTotalPrice.toFixed(2)));

                    // Update the cartItems state with the fetched data
                    setCartItems(fetchedCartItems);
                }
            }
        } catch (error) {
            console.error("Error retrieve cart items:", error);
            alert("Error retrieve cart items. Please try again later.");
        }
    };

    const handleCheckout = async () => {
        const timestamp = Date.now();
        const guid = crypto.randomUUID();
        const requestBody = {
            data: {
                details: cartItems.map((item) => ({
                    cartItemId: item.id,
                    cartItemQuantity: item.quantity,
                    productCatergory: item.category,
                    productId: item.productId, // Assuming `id` is the product ID
                    productImage: item.image,
                    productName: item.name,
                    productPrice: item.price.toString(), // Convert to string for API
                })),
                userID: localStorage.getItem("userID"),
            },
            trace: {
                frm: "local",
                to: "user-service",
                cts: timestamp,
                cid: guid,
            },
        };
        console.log(requestBody);
        try {
            const response = await executeTransaction(requestBody);
            if (response.data.result.code !== "00") {
                alert(
                    `Error: ${response.data.result.message || "Unknown error"}`
                );
            } else {
                message.success("Checkout successful!", 1); // 1 second duration
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("Failed to complete the checkout.");
        }
        navigate("/home");
    };

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="space-y-8">
                {/* Delivery Address Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex">
                        <IoLocationSharp size={40} />
                        <h2 className="text-3xl font-semibold mb-4">
                            Delivery Address
                        </h2>
                    </div>

                    <div className="space-x-10 flex">
                        <div className="flex flex-col">
                            <div>Username</div>
                            <div>Phone Number</div>
                            <div>Delivery Address</div>
                        </div>
                        <div className="flex flex-col">
                            <div>{userInfo.username}</div>
                            <div>083480207</div>
                            <div>
                                {userInfo.street}, {userInfo.ward},
                                {userInfo.district}, {userInfo.city}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cart Items Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-3xl font-semibold mb-6">
                        Order Summary
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead className="text-black">
                                <tr>
                                    <th className="text-left px-4 py-2">
                                        Product
                                    </th>
                                    <th className="text-left px-4 py-2">
                                        Unit Price
                                    </th>
                                    <th className="text-left px-4 py-2">
                                        Quantity
                                    </th>
                                    <th className="text-left px-2 py-2">
                                        Item Subtotal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id} className=" h-[200px]">
                                        <td className="flex h-[200px] items-center space-x-4 px-4 py-2 ">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-32 h-32 rounded-lg object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold">
                                                    {item.name}
                                                </p>
                                                <p className="text-black text-sm">
                                                    {item.category}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-4 py-2 text-black  ">
                                            {item.price.toLocaleString("vi-VN")}
                                            $
                                        </td>

                                        <td className="px-4 py-2 text-left">
                                            <span className="px-4 py-1">
                                                {item.quantity}
                                            </span>
                                        </td>

                                        <td className="px-4 py-2 text-black  text-le">
                                            {(
                                                item.price * item.quantity
                                            ).toLocaleString("vi-VN")}
                                            $
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payment Summary Section */}
                <div className="payment-section  mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <div className="summary-section max-w-md mx-auto p-6  ">
                        {/* Header */}
                        <h2 className="text-2xl font-medium mb-4 text-center">
                            Summary
                        </h2>

                        {/* Subtotal */}
                        <div className="flex justify-between items-center py-2 border-b">
                            <div className="text-black">Subtotal</div>
                            <div className="text-lg font-semibold text-black">
                                ${totalPrice}
                            </div>
                        </div>

                        {/* Estimated Delivery & Handling */}
                        <div className="flex justify-between items-center py-2 border-b">
                            <div className="text-black">
                                Estimated Delivery & Handling
                            </div>
                            <div className="text-lg font-semibold text-black">
                                Free
                            </div>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between items-center py-4 border-b">
                            <div className="text-lg font-semibold text-black">
                                Total
                            </div>
                            <div className="text-xl font-bold ">
                                ${totalPrice}
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <div className="mt-4">
                            <button
                                className="bg-black text-white w-full py-2 px-6 rounded-full hover:bg-gray-800 transition duration-300"
                                onClick={() => handleCheckout()}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
