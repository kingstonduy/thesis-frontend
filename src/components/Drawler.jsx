import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { getCartItems, updateCartItem } from "./api-client/cartClient";

const CartItem = React.memo(({ item, onAdjustQuantity, onRemove }) => (
    <div className="grid grid-rows-2 grid-cols-3 gap-4 items-center mb-4 border-b pb-4">
        <div className="row-span-2 col-span-1 flex justify-center items-center">
            <img
                src={item.image}
                alt={item.name}
                className="w-30 h-30 object-cover rounded-md"
                loading="lazy"
            />
        </div>
        <div className="col-span-1 row-start-1 row-end-2">
            <h3 className="text-lg font-semibold">{item.name}</h3>
        </div>
        <div className="col-span-1 row-start-2 row-end-3 text-sm text-gray-500">
            <p>Category: {item.catergory}</p>
        </div>
        <div className="col-span-1 row-start-1 row-end-2 text-right text-lg font-semibold pr-4">
            ${(item.price * item.quantity).toFixed(2)}
        </div>
        <div className="col-span-1 row-start-2 row-end-3 flex justify-end items-center">
            <QuantityControl
                quantity={item.quantity}
                onDecrease={() =>
                    onAdjustQuantity(item.id, item.quantity, "decrease")
                }
                onIncrease={() =>
                    onAdjustQuantity(item.id, item.quantity, "increase")
                }
                onRemove={() => onRemove(item.id)}
            />
        </div>
    </div>
));

const QuantityControl = React.memo(
    ({ quantity, onDecrease, onIncrease, onRemove }) => (
        <div className="flex items-center">
            <div className="w-10 h-10 flex justify-center items-center rounded-l-full border-t border-b border-l hover:bg-gray-300 transition duration-300 cursor-pointer">
                {quantity > 1 ? (
                    <button onClick={onDecrease} className="focus:outline-none">
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
                            />
                        </svg>
                    </button>
                ) : (
                    <button onClick={onRemove} className="focus:outline-none">
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
                            />
                        </svg>
                    </button>
                )}
            </div>
            <div className="flex justify-center items-center w-12 h-10 border-t border-b text-lg font-medium">
                {quantity}
            </div>
            <div className="w-10 h-10 flex justify-center items-center rounded-r-full border-t border-b border-r hover:bg-gray-300 transition duration-300 cursor-pointer">
                <button onClick={onIncrease} className="focus:outline-none">
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
                        />
                    </svg>
                </button>
            </div>
        </div>
    )
);

const CartIcon = React.memo(({ onClick }) => (
    <div onClick={onClick} className="cursor-pointer">
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
));

const Drawler = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const createRequestBody = useCallback((data) => {
        return {
            data,
            trace: {
                frm: "local",
                to: "product-service",
                cts: Date.now(),
                cid: crypto.randomUUID(),
            },
        };
    }, []);

    const fetchCartItems = useCallback(async () => {
        setIsLoading(true);
        try {
            const requestBody = createRequestBody({
                userId: localStorage.getItem("userID"),
            });

            const response = await getCartItems(requestBody);

            if (response.data.result.code !== "00") {
                throw new Error(
                    response.data.result.message || "Unknown error"
                );
            }

            const fetchedCartItems =
                response.data.data.cartItems?.map((item) => ({
                    id: item.cartItemId,
                    name: item.productName,
                    image: item.productImage,
                    price: parseFloat(item.productPrice),
                    quantity: item.cartItemQuantity,
                    catergory: item.productCatergory,
                })) || [];

            setCartItems(fetchedCartItems);
        } catch (error) {
            console.error("Error retrieving cart items:", error);
            alert("Error retrieving cart items. Please try again later.");
            setCartItems([]);
        } finally {
            setIsLoading(false);
        }
    }, [createRequestBody]);

    useEffect(() => {
        if (open) {
            fetchCartItems();
        }
    }, [open, fetchCartItems]);

    const handleCheckout = useCallback(() => {
        if (cartItems.length === 0) {
            alert("Cart is empty. Please add items to proceed.");
            return;
        }
        setOpen(false);
        navigate("/checkout");
    }, [cartItems.length, navigate]);

    const adjustQuantity = useCallback(
        async (id, currentQuantity, type) => {
            const newQuantity =
                type === "decrease" ? currentQuantity - 1 : currentQuantity + 1;

            try {
                const requestBody = createRequestBody({
                    cartItemId: id,
                    cartItemQuantity: newQuantity,
                });

                const response = await updateCartItem(requestBody);

                if (response.data.result.code !== "00") {
                    throw new Error(
                        response.data.result.message || "Unknown error"
                    );
                }

                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === id
                            ? { ...item, quantity: newQuantity }
                            : item
                    )
                );
            } catch (error) {
                console.error("Error updating cart items:", error);
                alert("Error updating cart items. Please try again later.");
            }
        },
        [createRequestBody]
    );

    const removeFromCart = useCallback(
        async (id) => {
            try {
                const requestBody = createRequestBody({
                    cartItemId: id,
                    cartItemQuantity: 0,
                });

                const response = await updateCartItem(requestBody);

                if (response.data.result.code !== "00") {
                    throw new Error(
                        response.data.result.message || "Unknown error"
                    );
                }

                setCartItems((prevItems) =>
                    prevItems.filter((item) => item.id !== id)
                );
            } catch (error) {
                console.error("Error removing cart item:", error);
                alert("Error removing cart item. Please try again later.");
            }
        },
        [createRequestBody]
    );

    const cartContent = useMemo(
        () => (
            <div className="overflow-y-auto" style={{ maxHeight: "80vh" }}>
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <p>Loading cart items...</p>
                    </div>
                ) : cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onAdjustQuantity={adjustQuantity}
                            onRemove={removeFromCart}
                        />
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        ),
        [cartItems, isLoading, adjustQuantity, removeFromCart]
    );

    return (
        <div className="flex justify-center">
            <CartIcon onClick={() => setOpen(true)} />
            <Drawer
                title="Your Cart"
                placement="right"
                width={500}
                onClose={() => setOpen(false)}
                open={open}
            >
                {cartContent}
                <div className="flex justify-center mt-6">
                    <button
                        className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800 transition duration-300"
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                    >
                        Go to Checkout
                    </button>
                </div>
            </Drawer>
        </div>
    );
};

export default Drawler;
