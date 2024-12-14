import React from "react";
import { Link } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const FooterPage = () => {
    return (
        <footer className="bg-black text-white py-16">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
                    {/* Logo Section */}
                    <div className="text-center md:text-left">
                        <div className="nav-symbol pl-10">
                            <Link
                                className="text-3xl text-white font-jost font-semibold tracking-[0.1rem]"
                                to={"/home"}
                            >
                                Sneaker
                            </Link>
                        </div>
                        <p className="text-sm text-gray-400 mt-4">
                            Your one-stop destination for the best sneakers.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="text-center">
                        <nav>
                            <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                                <li>
                                    <Link
                                        className="text-gray-400 hover:text-blue-400 text-sm transition duration-200"
                                        to={"/home"}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-gray-400 hover:text-blue-400 text-sm transition duration-200"
                                        to={"/about-us"}
                                    >
                                        About us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-gray-400 hover:text-blue-400 text-sm transition duration-200"
                                        to={"/products"}
                                    >
                                        Shop
                                    </Link>
                                </li>
                                <li></li>
                            </ul>
                        </nav>
                    </div>

                    {/* Social Media Links */}
                    <div className="text-center md:text-right">
                        <p className="text-sm text-gray-400 mb-4">
                            Follow us on:
                        </p>
                        <div className="flex justify-center md:justify-end space-x-6">
                            <a
                                href="https://www.youtube.com/"
                                className="text-blue-400 hover:text-blue-500 transition duration-200"
                                aria-label="Instagram"
                            >
                                <YouTubeIcon />
                            </a>
                            <a
                                href="https://www.facebook.com/"
                                className="text-blue-400 hover:text-blue-500 transition duration-200"
                                aria-label="Twitter"
                            >
                                <FacebookIcon />
                            </a>
                            <a
                                href="https://www.instagram.com/"
                                className="text-blue-400 hover:text-blue-500 transition duration-200"
                                aria-label="Facebook"
                            >
                                <InstagramIcon />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; 2024 Sneaker Haven. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterPage;
