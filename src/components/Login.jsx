import {
    AlipayOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoOutlined,
    UserOutlined,
    WeiboOutlined,
} from "@ant-design/icons";
import {
    LoginFormPage,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from "@ant-design/pro-components";
import { Button, Divider, Space, Tabs, message, theme } from "antd";
import { useState } from "react";

const iconStyles = {
    color: "rgba(0, 0, 0, 0.2)",
    fontSize: "18px",
    verticalAlign: "middle",
    cursor: "pointer",
};

const Page = () => {
    const [loginType, setLoginType] = useState("phone");
    const { token } = theme.useToken();

    // Define the submit handler
    const handleSubmit = (values) => {
        console.log("Form submitted with values:", values);
        message.success("Login successful!");
        // Add your login logic here (e.g., API call)
    };

    return (
        <div
            style={{
                backgroundColor: "white",
                height: "100vh",
                // height: '100vh',
            }}
        >
            <LoginFormPage
                onFinish={handleSubmit}
                backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
                logo="https://github.githubassets.com/favicons/favicon.png"
                backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
                title="[TODO]tên của ứng dụng"
                submitter={{
                    searchConfig: {
                        submitText: "Login", // Set the login button text to English
                    },
                }}
                containerStyle={{
                    backgroundColor: "rgba(0, 0, 0,0.65)",
                    backdropFilter: "blur(4px)",
                }}
                subTitle="The world's largest ecommerce platform"
                // activityConfig={{
                //     style: {
                //         boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                //         color: token.colorTextHeading,
                //         borderRadius: 8,
                //         backgroundColor: 'rgba(255,255,255,0.25)',
                //         backdropFilter: 'blur(4px)',
                //     },
                //     title: 'Activity Title, Configurable Image',
                //     subTitle: 'Activity Description Text',
                //     action: (
                //         <Button
                //             size="large"
                //             style={{
                //                 borderRadius: 20,
                //                 background: token.colorBgElevated,
                //                 color: token.colorPrimary,
                //                 width: 120,
                //             }}
                //         >
                //             Take a look
                //         </Button>
                //     ),
                // }}
                actions={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Divider plain>
                            <span
                                style={{
                                    color: token.colorTextPlaceholder,
                                    fontWeight: "normal",
                                    fontSize: 14,
                                }}
                            >
                                Other Login Methods
                            </span>
                        </Divider>
                        <Space align="center" size={24}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    height: 40,
                                    width: 40,
                                    border:
                                        "1px solid " + token.colorPrimaryBorder,
                                    borderRadius: "50%",
                                }}
                            >
                                <AlipayOutlined
                                    style={{ ...iconStyles, color: "#1677FF" }}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    height: 40,
                                    width: 40,
                                    border:
                                        "1px solid " + token.colorPrimaryBorder,
                                    borderRadius: "50%",
                                }}
                            >
                                <TaobaoOutlined
                                    style={{ ...iconStyles, color: "#FF6A10" }}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    height: 40,
                                    width: 40,
                                    border:
                                        "1px solid " + token.colorPrimaryBorder,
                                    borderRadius: "50%",
                                }}
                            >
                                <WeiboOutlined
                                    style={{ ...iconStyles, color: "#1890ff" }}
                                />
                            </div>
                        </Space>
                    </div>
                }
            >
                <Tabs
                    centered
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey)}
                >
                    <Tabs.TabPane key="account" tab="Account Login" />
                    <Tabs.TabPane key="email" tab="Email Login" />
                </Tabs>
                {loginType === "account" && (
                    <>
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
                            placeholder="Username: admin or user"
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
                            placeholder="Password: ant.design"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your password!",
                                },
                            ]}
                        />
                    </>
                )}
                {loginType === "email" && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: "large",
                                prefix: (
                                    <MobileOutlined
                                        style={{
                                            color: token.colorText,
                                        }}
                                        className="prefixIcon"
                                    />
                                ),
                            }}
                            name="mobile"
                            placeholder="Email Address: kingstonduy.duong@gmail.com"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your email address!",
                                },
                                {
                                    pattern:
                                        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: "Invalid email address format!",
                                },
                            ]}
                        />
                        <ProFormCaptcha
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
                            captchaProps={{
                                size: "large",
                            }}
                            placeholder="Enter Verification Code"
                            captchaTextRender={(timing, count) => {
                                return timing
                                    ? `${count} Resend`
                                    : "Get Verification Code";
                            }}
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please enter the verification code!",
                                },
                            ]}
                            onGetCaptcha={async () => {
                                message.success(
                                    "Verification code sent! Code: 1234"
                                );
                            }}
                        />
                    </>
                )}
                <div style={{ marginBottom: 24 }}>
                    <ProFormCheckbox noStyle name="autoLogin">
                        Auto Login
                    </ProFormCheckbox>
                    <a style={{ float: "right" }}>Forgot Password</a>
                </div>
            </LoginFormPage>
        </div>
    );
};

export default () => (
    <ProConfigProvider dark>
        <Page />
    </ProConfigProvider>
);
