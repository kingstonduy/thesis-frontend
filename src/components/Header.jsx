import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchTray from "./SearchTray";
import DropDownMenu from "./react-bootstrap/DropDownMenu";
import { useNavigate } from "react-router-dom";
import { getCartItems, updateCartItem } from "./api-client/cartClient";

const Header = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [isTrayOpen, setIsTrayOpen] = useState(false); // State to track if the search tray is open
    const [isCartOpen, setIsCartOpen] = useState(false); // State to track if the cart panel is open

    // Define cart items with mock data
    const [cartItems, setCartItems] = useState([
        // {
        //     id: 1,
        //     name: "Nike Dunk Low SE",
        //     image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8b0d4d2e-d306-4b50-b335-e9c8202144d8/NIKE+DUNK+LOW+SE.png",
        //     price: 100,
        //     quantity: 1,
        // },
        // {
        //     id: 2,
        //     name: "Adidas Ultraboost",
        //     image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8b0d4d2e-d306-4b50-b335-e9c8202144d8/NIKE+DUNK+LOW+SE.png",
        //     price: 120,
        //     quantity: 2,
        // },
    ]);

    // Opens the search tray
    const openTray = () => setIsTrayOpen(true);

    // Closes the search tray
    const closeTray = () => setIsTrayOpen(false);

    // Toggles the cart panel visibility
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
        if (!isCartOpen) {
            fetchCartItems();
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
                        })
                    );

                    // Update the cartItems state with the fetched data
                    setCartItems(fetchedCartItems);
                }
            }
        } catch (error) {
            console.error("Error retrieve cart items:", error);
            alert("Error retrieve cart items. Please try again later.");
        }
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

    const handleCheckout = (navigate) => {
        setIsCartOpen(false);
        console.log(cartItems);
        if (cartItems.length === 0) {
            alert("Cart is empty. Please add items to proceed.");
            return;
        }
        navigate("/checkout");
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

    // Navigation items for the header navbar
    const Navbar = [
        { name: "Home", link: "/home" },
        {
            name: "Men",
            link: "/products-gender-men",
        },
        {
            name: "Women",
            link: "/products-gender-women",
        },
        { name: "All product", link: "/products" },
        { name: "About us", link: "/about-us" },
    ];

    // Renders the header component, including navigation, cart, and search tray
    const renderHeader = () => {
        if (!isTrayOpen) {
            return (
                <>
                    {/* Header Section */}
                    <div className="w-full h-auto shadow-md flex items-center justify-between">
                        {/* Logo Section */}
                        <div className="nav-symbol pl-10">
                            <Link
                                className="text-3xl text-black font-jost font-semibold tracking-[0.1rem]"
                                to={"/home"}
                            >
                                Sneaker
                            </Link>
                        </div>

                        {/* Navigation Section */}
                        <div className="nav-items pl-[20px] pr-[50px]">
                            <ul className="list-none flex gap-x-12 items-center">
                                {Navbar.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            to={item.link}
                                            className="text-black text-[1.25rem] font-inter font-semibold hover:text-gray-500 ease-out duration-300 hover:underline"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Icons Section (Search, Avatar, Cart) */}
                        <div className="nav-icon right-0 flex flex-row items-center justify-between gap-x-6 pl-[5px] pr-[15px]">
                            {/* Search Icon */}
                            {/* TODO add this feature */}
                            {/* <div className="py-3 relative ml-auto transition-all duration-500 ease-in-out">
                                <button
                                    className="flex items-center w-[80px] bg-white border h-[40px] border-gray-300 rounded-full px-2 py-2 shadow transition-all duration-500 ease-in-out cursor-pointer hover:bg-gray-500"
                                    onClick={openTray}
                                >
                                    <input
                                        type="text"
                                        className="flex-1 border-none outline-none text-[1.5rem] bg-transparent transition-all duration-500 ease-in-out w-full cursor-pointer"
                                        placeholder=""
                                        readOnly
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        className="w-10 h-8 text-black"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 15.75L21 21m-5.25-5.25A6.75 6.75 0 1114.25 3 6.75 6.75 0 0115.75 15.75z"
                                        />
                                    </svg>
                                </button>
                            </div> */}

                            {/* Avatar Icon (Dropdown) */}
                            <DropDownMenu setIsLoggedIn={setIsLoggedIn} />

                            {/* Cart Icon */}
                            <div
                                onClick={toggleCart}
                                className="cursor-pointer"
                            >
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
                        </div>
                    </div>

                    {/* Cart Panel */}
                    <div
                        className={`fixed top-0 right-0 h-full bg-white shadow-md z-50 transform transition-transform duration-300 ${
                            isCartOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                        style={{ width: "30%" }}
                    >
                        <div className="p-4">
                            {/* Cart Header */}
                            <div>
                                <h1 className="text-black font-medium text-2xl">
                                    Bag
                                </h1>
                                <button
                                    onClick={toggleCart}
                                    className="absolute top-4 right-4 text-black text-lg font-medium py-2 px-4  rounded hover:underline hover:text-gray-500 font-inter"
                                >
                                    Close
                                </button>
                            </div>

                            {/* Cart Items Section */}
                            <div className="pt-20">
                                {cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="grid grid-rows-2 grid-cols-3 gap-4 items-center mb-4 border-b pb-4"
                                        >
                                            {/* Product Image */}
                                            <div className="row-span-2 col-span-1 flex justify-center items-center">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-30 h-30 object-cover rounded-md"
                                                />
                                            </div>

                                            {/* Product Name */}
                                            <div className="col-span-1 row-start-1 row-end-2">
                                                <h3 className="text-lg font-semibold">
                                                    {item.name}
                                                </h3>
                                            </div>

                                            {/* Product Description */}
                                            <div className="col-span-1 row-start-2 row-end-3 text-sm text-gray-500">
                                                <p>Category: Shoes</p>
                                                <p>Size: 42</p>
                                            </div>

                                            {/* Product Total Price */}
                                            <div className="col-span-1 row-start-1 row-end-2 text-right text-lg font-semibold pr-4">
                                                ${item.price * item.quantity}
                                            </div>

                                            {/* Quantity Control */}
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
                                    onClick={() => handleCheckout(navigate)}
                                >
                                    Go to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            // If search tray is open, render the SearchTray component
            return <SearchTray openTray={openTray} closeTray={closeTray} />;
        }
    };

    return <>{renderHeader()}</>;
};

export default Header;
