import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
    LoginFormPage,
    ProConfigProvider,
    ProFormCheckbox,
    ProFormText,
} from "@ant-design/pro-components";
import { Button, Divider, message, theme } from "antd";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { AutoLogin, CheckJwt, Userlogin } from "./api-client/userClient";
import Cookies from "js-cookie";
import { useEffect } from "react";

const LoginPage = ({ acceptLogin }) => {
    const { token } = theme.useToken();
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleRegister = () => {
        navigate("/register"); // Update this path to your registration route
    };

    const handleLogin = async (e) => {
        const timestamp = Date.now();
        const guid = crypto.randomUUID();
        const requestBody = {
            data: {
                username: e.username,
                password: e.password,
            },
            trace: {
                frm: "web-app",
                to: "user-service",
                cts: timestamp,
                cid: guid,
            },
        };

        console.log(requestBody);

        try {
            // Ensure cookies are included in the request
            const response = await Userlogin(requestBody);

            console.log(response);

            if (response.data.result.code !== "00") {
                localStorage.removeItem("userID");
                localStorage.removeItem("jwt");

                alert(
                    `Error: ${response.data.result.message || "Unknown error"}`
                );
                console.error("Details:", response.data.result.details);
                return;
            } else {
                const jwtToken = Cookies.get("jwt");
                const userID = response.data.data.userID;
                // logging
                console.log("JWT Token:", jwtToken);
                console.log("userID:", userID);
                // set local storage
                localStorage.setItem("userID", userID);
                localStorage.setItem("jwt", jwtToken);
                // Handle successful login
                message.success("Login successful!", 1); // 1 second duration
                navigate("/"); // Navigate to the homepage
                acceptLogin();
            }
        } catch (error) {
            message.error("Login failed. Please try again. " + error);
        }
    };

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwt");
        console.log("JWT Token:", jwtToken);
        const timestamp = Date.now();
        const guid = crypto.randomUUID();
        const requestBody = {
            data: {
                jwt: jwtToken,
            },
            trace: {
                frm: "web-app",
                to: "user-service",
                cts: timestamp,
                cid: guid,
            },
        };

        if (jwtToken) {
            console.log(requestBody);
            CheckJwt(requestBody)
                .then((response) => {
                    if (response.data.result.code == "00") {
                        navigate("/"); // Navigate to the homepage
                        acceptLogin();
                    } else {
                    }
                })
                .catch((error) => {
                    console.error("Error during login:", error);
                });
        }
    }, []);

    return (
        <ProConfigProvider dark>
            <div
                style={{
                    backgroundColor: "white",
                    height: "100vh",
                }}
            >
                <LoginFormPage
                    onFinish={handleLogin}
                    backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
                    logo="https://github.githubassets.com/favicons/favicon.png"
                    backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
                    title="My Application"
                    submitter={{
                        searchConfig: {
                            submitText: "Login", // Set the login button text to English
                        },
                    }}
                    containerStyle={{
                        backgroundColor: "rgba(0, 0, 0,0.65)",
                        backdropFilter: "blur(4px)",
                    }}
                    subTitle="Welcome to the My Application"
                >
                    {/* Login Form */}
                    <ProFormText
                        name="username"
                        fieldProps={{
                            size: "large",
                            prefix: (
                                <UserOutlined
                                    style={{
                                        color: token.colorText,
                                    }}
                                    className="prefixIcon"
                                />
                            ),
                        }}
                        placeholder="Enter your username"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your username!",
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: "large",
                            prefix: (
                                <LockOutlined
                                    style={{
                                        color: token.colorText,
                                    }}
                                    className="prefixIcon"
                                />
                            ),
                        }}
                        placeholder="Enter your password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password!",
                            },
                        ]}
                    />

                    <div style={{ marginBottom: 24 }}>
                        <ProFormCheckbox noStyle name="autoLogin">
                            Auto Login
                        </ProFormCheckbox>
                        {/* <a style={{ float: "right" }}>Forgot Password</a> */}
                    </div>

                    {/* Register Button */}
                    <Divider />
                    <Button type="primary" block onClick={handleRegister}>
                        Register
                    </Button>
                </LoginFormPage>
            </div>
        </ProConfigProvider>
    );
};

export default LoginPage;
