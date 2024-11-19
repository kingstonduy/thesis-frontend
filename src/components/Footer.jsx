import React from "react";
import PropTypes from "prop-types";

const Footer = (props) => {
    return (
        <footer className="w-full flex flex-col items-center justify-center p-16 bg-gray-100">
            <div className="flex flex-col gap-16 items-center w-full">
                {/* Logo and Links */}
                <div className="flex flex-col gap-12 items-center w-full">
                    {/* Logo */}
                    <div className="flex flex-col items-center">
                        <img
                            alt={props.logoAlt}
                            src={props.logoSrc}
                            className="h-12 object-contain" // Increased size of the logo
                        />
                    </div>

                    {/* Links Section */}
                    <div className="flex flex-wrap gap-12 justify-between w-full text-lg">
                        <a
                            href="https://example.com"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-lg text-gray-700 hover:text-gray-900 font-semibold" // Increased font size and weight
                        >
                            {props.link1 ?? <span>About Us</span>}
                        </a>
                        <a
                            href="https://example.com"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-lg text-gray-700 hover:text-gray-900 font-semibold"
                        >
                            {props.link2 ?? <span>Contact Us</span>}
                        </a>
                        <a
                            href="https://example.com"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-lg text-gray-700 hover:text-gray-900 font-semibold"
                        >
                            {props.link3 ?? <span>FAQs</span>}
                        </a>
                        <a
                            href="https://example.com"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-lg text-gray-700 hover:text-gray-900 font-semibold"
                        >
                            {props.link4 ?? <span>Terms and Conditions</span>}
                        </a>
                        <a
                            href="https://example.com"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-lg text-gray-700 hover:text-gray-900 font-semibold"
                        >
                            {props.link5 ?? <span>Privacy Policy</span>}
                        </a>
                    </div>
                </div>

                {/* Credits */}
                <div className="flex flex-col items-stretch gap-12 w-full">
                    <div className="border-t border-gray-400"></div>
                    <div className="flex justify-between flex-wrap gap-8">
                        {/* Copyright */}
                        <div>
                            <span className="text-lg text-gray-700">
                                © 2024 TeleportHQ
                            </span>
                        </div>
                        {/* Footer Links */}
                        <div className="flex gap-8 text-lg">
                            <span className="text-lg text-gray-700 hover:text-gray-900 font-semibold">
                                {props.privacyLink ?? (
                                    <span>Privacy Policy</span>
                                )}
                            </span>
                            <span className="text-lg text-gray-700 hover:text-gray-900 font-semibold">
                                {props.termsLink ?? (
                                    <span>Terms and Conditions</span>
                                )}
                            </span>
                            <span className="text-lg text-gray-700 hover:text-gray-900 font-semibold">
                                {props.cookiesLink ?? (
                                    <span>Cookies Policy</span>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

Footer.defaultProps = {
    link5: undefined,
    link3: undefined,
    link1: undefined,
    termsLink: undefined,
    link2: undefined,
    link4: undefined,
    logoAlt: "Ecommerce Platform Logo",
    cookiesLink: undefined,
    logoSrc: "https://presentation-website-assets.teleporthq.io/logos/logo.png",
    privacyLink: undefined,
};

Footer.propTypes = {
    link5: PropTypes.element,
    link3: PropTypes.element,
    link1: PropTypes.element,
    termsLink: PropTypes.element,
    link2: PropTypes.element,
    link4: PropTypes.element,
    logoAlt: PropTypes.string,
    cookiesLink: PropTypes.element,
    logoSrc: PropTypes.string,
    privacyLink: PropTypes.element,
};

export default Footer;
