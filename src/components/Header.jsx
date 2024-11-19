import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn }) => {
    const Navbar = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Men",
            link: "/about",
        },
        {
            name: "Women",
            link: "/services",
        },
        {
            name: "All product",
            link: "/portfolio",
        },
        {
            name: "Contact",
            link: "/contact",
        },
    ];

    // Determine which button to render
    let authButton;
    if (!isLoggedIn) {
        authButton = (
            <button className="border-2 border-black text-black text-[1.1rem] font-inter font-regular px-5 py-1.5 rounded-full hover:bg-gray-100 ease-out duration-300">
                Sign In
            </button>
        );
    } else {
        authButton = (
            <button className="border-2 border-black text-black text-[1.1rem] font-inter font-regular px-5 py-1.5 rounded-full hover:bg-gray-100 ease-out duration-300">
                Log Out
            </button>
        );
    }

    return (
        <div className="w-full h-auto bg-gray-100 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo Section */}
                <div className="nav-symbol">
                    <Link className="text-3xl text-black font-jost font-semibold tracking-[0.1rem]">
                        Sneaker
                    </Link>
                </div>

                {/* Navigation Items */}
                <div className="nav-items">
                    <ul className="list-none flex gap-x-20 items-center">
                        {Navbar.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.link}
                                    className="text-black text-[1.25rem] font-inter font-semibold hover:text-gray-700 ease-out duration-300"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Icon Section */}
                <div className="nav-icon flex items-center gap-x-6">
                    {/* Magnifying Glass Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 text-gray-600 cursor-pointer hover:text-black duration-300"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>

                    {/* Avatar/User Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 text-gray-600 cursor-pointer hover:text-black duration-300"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>

                    {/* Cart Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 text-gray-600 cursor-pointer hover:text-black duration-300"
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
    );
};

export default Header;
