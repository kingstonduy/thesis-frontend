import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
    LoginFormPage,
    ProConfigProvider,
    ProFormCheckbox,
    ProFormText,
} from "@ant-design/pro-components";
import { Button, Divider, message, theme } from "antd";
import { useState } from "react";

const LoginPage = ({ handleLogin, handleRegister }) => {
    const { token } = theme.useToken();

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
