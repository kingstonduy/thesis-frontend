import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import LandingPage from "./components/nike-landingpage/LandingPage";
import DropDownMenu from "./components/react-bootstrap/DropDownMenu";
import ProductGrid from "./components/ProductGrid";
import CheckoutPage from "./components/Checkout";
import ProductDetailPage from "./components/ProductDetail";
import { message } from "antd";
import LoginPage from "./components/Login";
import UserProfilePage from "./components/UserProfile";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    function handleLogin(e) {
        console.log(e);
        message.success("Login successful!", 1); // 1 second duration
        setIsLoggedIn(true);
    }

    return (
        <>
            {(() => {
                if (!isLoggedIn) {
                    return <LoginPage handleLogin={handleLogin} />;
                } else {
                    return (
                        <BrowserRouter basename="/thesis-frontend/">
                            <Header setIsLoggedIn={setIsLoggedIn} />
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/home" element={<LandingPage />} />
                                <Route
                                    path="/menu"
                                    element={<DropDownMenu />}
                                />
                                <Route
                                    path="/products"
                                    element={<ProductGrid />}
                                />
                                <Route
                                    path="/checkout"
                                    element={<CheckoutPage />}
                                />
                                <Route
                                    path="/product/:productId"
                                    element={<ProductDetailPage />}
                                />
                                <Route
                                    path="/user-profile"
                                    element={<UserProfilePage />}
                                />
                            </Routes>
                        </BrowserRouter>
                    );
                }
            })()}
        </>
    );
}

export default App;
