import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchTray from "./SearchTray";
import DropDownMenu from "./react-bootstrap/DropDownMenu";
import { useNavigate } from "react-router-dom";
import Drawler from "./Drawler";

const Header = ({ setIsLoggedIn }) => {
    const [isCartOpen, setIsCartOpen] = useState(false); // State to track if the cart panel is open

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
                        {/* Avatar Icon (Dropdown) */}
                        <DropDownMenu setIsLoggedIn={setIsLoggedIn} />

                        <Drawler></Drawler>
                    </div>
                </div>
            </>
        );
    };

    return <>{renderHeader()}</>;
};

export default Header;
