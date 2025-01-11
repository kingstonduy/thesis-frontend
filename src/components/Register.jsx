import React, { useState, useEffect } from "react";
import { Select, message, theme } from "antd";
import axios from "axios";
import "antd/dist/reset.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
    LoginFormPage,
    ProConfigProvider,
    ProFormText,
    ProFormSelect,
    ProFormDatePicker,
} from "@ant-design/pro-components";
import moment from "moment";
import { UserRegister } from "./api-client/userClient";
import { useNavigate } from "react-router-dom"; // React Router for navigation

const { Option } = Select;

const RegisterPage = ({ handleRegisterSubmit }) => {
    const navigate = useNavigate(); // Hook for programmatic navigation

    const { token } = theme.useToken();
    const [locations, setLocations] = useState({
        cities: [],
        districts: [],
        wards: [],
    });
    const [address, setAddress] = useState({
        cityCode: "",
        districtCode: "",
        wardCode: "",
    });

    useEffect(() => {
        axios
            .get(
                "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
            )
            .then((response) => {
                setLocations((prev) => ({ ...prev, cities: response.data }));
            });
    }, []);

    const handleAddressChange = (value, field) => {
        if (field === "cityCode") {
            const selectedCity = locations.cities.find(
                (city) => city.Id === value
            );
            setLocations((prev) => ({
                ...prev,
                districts: selectedCity ? selectedCity.Districts : [],
                wards: [],
            }));
            setAddress((prev) => ({
                ...prev,
                cityCode: value,
                districtCode: "",
                wardCode: "",
            }));
        } else if (field === "districtCode") {
            const selectedDistrict = locations.districts.find(
                (district) => district.Id === value
            );
            setLocations((prev) => ({
                ...prev,
                wards: selectedDistrict ? selectedDistrict.Wards : [],
            }));
            setAddress((prev) => ({
                ...prev,
                districtCode: value,
                wardCode: "",
            }));
        } else if (field === "wardCode") {
            setAddress((prev) => ({ ...prev, wardCode: value }));
        }
    };

    const handleSubmit = async (values) => {
        if (values.password !== values.confirmPassword) {
            message.error("Passwords do not match!");
            return;
        }

        const timestamp = Date.now();
        const guid = crypto.randomUUID();
        const requestBody = {
            data: {
                userName: values.username,
                email: values.email,
                password: values.password,
                phoneNumber: values.phoneNumber,
                dateOfBirth: moment(values.dateOfBirth).format("DD-MM-YYYY"),
                gender: values.gender,
                city: values.city,
                cityCode: address.cityCode,
                district: values.district,
                districtCode: address.districtCode,
                ward: values.ward,
                wardCode: address.wardCode,
                street: values.street,
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
            const response = await UserRegister(requestBody);
            console.log(response);
            if (response.data.result.code !== "00") {
                alert(
                    `Error: ${response.data.result.message || "Unknown error"}`
                );
                console.error("Details:", response.data.result.details);
                return;
            } else {
                message.success("Login successful!", 1); // 1 second duration
                navigate("/login");
            }
        } catch (error) {
            message.error("Registration failed. Please try again." + error);
        }
    };

    return (
        <ProConfigProvider dark>
            <div
                style={{
                    backgroundColor: "white",
                    height: "100vh",
                }}
            >
                <LoginFormPage
                    onFinish={handleSubmit}
                    backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
                    logo="https://github.githubassets.com/favicons/favicon.png"
                    backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
                    title="Register"
                    submitter={{
                        searchConfig: {
                            submitText: "Register", // Set the register button text to English
                        },
                    }}
                    containerStyle={{
                        backgroundColor: "rgba(0, 0, 0,0.65)",
                        backdropFilter: "blur(4px)",
                    }}
                    subTitle="Welcome to My Application"
                >
                    <ProFormText
                        name="email"
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
                        placeholder="Enter your email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email!",
                            },
                            {
                                type: "email",
                                message: "Invalid email format!",
                            },
                        ]}
                    />
                    <ProFormText
                        name="phoneNumber"
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
                        placeholder="Enter your phone number"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your phone number!",
                            },
                        ]}
                    />
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
                    <ProFormText.Password
                        name="confirmPassword"
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
                        placeholder="Confirm your password"
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                        ]}
                    />
                    <ProFormDatePicker
                        name="dateOfBirth"
                        style={{ width: "100%", height: "100%" }}
                        placeholder="Enter your date of birth"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your date of birth!",
                            },
                        ]}
                    />
                    <ProFormSelect
                        name="city"
                        placeholder="Select your city"
                        rules={[
                            {
                                required: true,
                                message: "Please select your city!",
                            },
                        ]}
                        options={locations.cities.map((city) => ({
                            label: city.Name,
                            value: city.Id,
                        }))}
                        fieldProps={{
                            onChange: (value) =>
                                handleAddressChange(value, "cityCode"),
                        }}
                    />
                    <ProFormSelect
                        name="district"
                        placeholder="Select your district"
                        rules={[
                            {
                                required: true,
                                message: "Please select your district!",
                            },
                        ]}
                        options={locations.districts.map((district) => ({
                            label: district.Name,
                            value: district.Id,
                        }))}
                        fieldProps={{
                            onChange: (value) =>
                                handleAddressChange(value, "districtCode"),
                        }}
                    />
                    <ProFormSelect
                        name="ward"
                        placeholder="Select your ward"
                        rules={[
                            {
                                required: true,
                                message: "Please select your ward!",
                            },
                        ]}
                        options={locations.wards.map((ward) => ({
                            label: ward.Name,
                            value: ward.Id,
                        }))}
                        fieldProps={{
                            onChange: (value) =>
                                handleAddressChange(value, "wardCode"),
                        }}
                    />
                    <ProFormText
                        name="street"
                        placeholder="Enter your street"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your street!",
                            },
                        ]}
                    />
                </LoginFormPage>
            </div>
        </ProConfigProvider>
    );
};

export default RegisterPage;
