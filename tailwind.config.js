/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                Gray: "#F5F5F5", // Define your custom color
                primary: "#ECEEFF",
                "coral-red": "#FF6452",
                "slate-gray": "#6D6D6D",
                "pale-blue": "#F5F6FF",
                "white-400": "rgba(255, 255, 255, 0.80)",
            },
            fontFamily: {
                jost: ['"Jost"', "sans-serif"], // Add Jost as a font option
                palanquin: ["Palanquin", "sans-serif"],
                montserrat: ["Montserrat", "sans-serif"],
            },
            keyframes: {
                slideUpFade: {
                    "0%": { transform: "translateY(100%)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideDownFade: {
                    "0%": { transform: "translateY(0)", opacity: "1" },
                    "100%": { transform: "translateY(100%)", opacity: "0" },
                },
            },
            animation: {
                slideUpFade: "slideUpFade 0.3s ease-out",
                slideDownFade: "slideDownFade 0.3s ease-out",
            },
            boxShadow: {
                "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
            },
            backgroundImage: {
                hero: "url('assets/images/collection-background.svg')",
                card: "url('assets/images/thumbnail-background.svg')",
            },
            screens: {
                wide: "1440px",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
