// src/CheckoutPage.jsx
import React, { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8b0d4d2e-d306-4b50-b335-e9c8202144d8/NIKE+DUNK+LOW+SE.png",
            name: "Sabrina 2 'Retrod' EP",
            category: "Basketball Shoes",
            size: "47.5",
            price: 3829000,
            quantity: 1,
        },
        {
            id: 2,
            image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8b0d4d2e-d306-4b50-b335-e9c8202144d8/NIKE+DUNK+LOW+SE.png",
            name: "Nike Cortez Textile",
            category: "Women's Shoes",
            size: "41",
            price: 5858000,
            quantity: 2,
        },
    ]);

    const [paymentMethod, setPaymentMethod] = useState("");

    const handleCheckout = () => {
        alert("check out successfully");
        navigate("/home");
    };

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

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
                            <div>kingstonduy</div>
                            <div>0834802007</div>
                            <div>
                                Toà Nhà Hallmark, Đường Trần Bạch Đằng, Phường
                                Thủ Thiêm, Thành Phố Thủ Đức, TP. Hồ Chí Minh
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
                                $11,676,000
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
                                $11,676,000
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
