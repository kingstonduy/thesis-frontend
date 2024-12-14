import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfilePage = () => {
    const [formData, setFormData] = useState({
        username: "JohnDoe123",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        gender: "Male",
        dob: "1990-01-01",
    });

    const [address, setAddress] = useState({
        cityID: "290",
        city: "Thành phố Hồ Chí Minh",
        districtID: "784",
        district: "Huyện Hóc Môn",
        wardID: "27565",
        ward: "Xã Nhị Bình",
        street: "123 Bui Cong Trung",
    });

    const [locations, setLocations] = useState({
        cities: [],
        districts: [],
        wards: [],
    });

    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        axios
            .get(
                "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
            )
            .then((response) => {
                setLocations((prev) => ({ ...prev, cities: response.data }));
            });
    }, []);

    const handleFieldEdit = (field) => {
        setEditingField(field);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));

        if (name === "city") {
            const selectedCity = locations.cities.find(
                (city) => city.Id === value
            );
            setLocations((prev) => ({
                ...prev,
                districts: selectedCity ? selectedCity.Districts : [],
                wards: [],
            }));
            setAddress((prev) => ({ ...prev, district: "", ward: "" }));
        } else if (name === "district") {
            const selectedDistrict = locations.districts.find(
                (district) => district.Id === value
            );
            setLocations((prev) => ({
                ...prev,
                wards: selectedDistrict ? selectedDistrict.Wards : [],
            }));
            setAddress((prev) => ({ ...prev, ward: "" }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Data:", { formData, address });
        alert("Profile updated successfully!");
    };

    return (
        <div className="max-w-2xl  my-16 mx-auto p-6 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-semibold mb-6">User Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {/* Fixed Fields */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Username
                        </label>
                        <input
                            value={formData.username}
                            className="w-full border rounded-lg px-3 py-2 bg-gray-200 cursor-not-allowed"
                            type="text"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            value={formData.email}
                            className="w-full border rounded-lg px-3 py-2 bg-gray-200 cursor-not-allowed"
                            type="email"
                            disabled
                        />
                    </div>

                    {/* Editable Fields */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Phone Number
                        </label>
                        <div className="relative flex">
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 ${
                                    editingField === "phone"
                                        ? ""
                                        : "bg-gray-200 cursor-not-allowed"
                                }`}
                                type="text"
                                disabled={editingField !== "phone"}
                            />
                            <span
                                className=" text-gray-500 cursor-pointer"
                                onClick={() => handleFieldEdit("phone")}
                            >
                                &#9998;
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Gender
                        </label>
                        <div className="relative flex">
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 ${
                                    editingField === "gender"
                                        ? ""
                                        : "bg-gray-200 cursor-not-allowed"
                                }`}
                                disabled={editingField !== "gender"}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <span
                                className=" text-gray-500 cursor-pointer "
                                onClick={() => handleFieldEdit("gender")}
                            >
                                &#9998;
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Date of Birth
                        </label>
                        <div className="relative flex">
                            <input
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className={`w-full border rounded-lg px-3 py-2 ${
                                    editingField === "dob"
                                        ? ""
                                        : "bg-gray-200 cursor-not-allowed"
                                }`}
                                type="date"
                                disabled={editingField !== "dob"}
                            />
                            <span
                                className=" text-gray-500 cursor-pointer"
                                onClick={() => handleFieldEdit("dob")}
                            >
                                &#9998;
                            </span>
                        </div>
                    </div>

                    {/* Address Fields */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Street
                        </label>
                        <div className="relative flex">
                            <input
                                name="street"
                                value={address.street}
                                onChange={handleAddressChange}
                                className={`w-full border rounded-lg px-3 py-2 ${
                                    editingField === "street"
                                        ? ""
                                        : "bg-gray-200 cursor-not-allowed"
                                }`}
                                type="text"
                                disabled={editingField !== "street"}
                            />
                            <span
                                className="text-gray-500 cursor-pointer"
                                onClick={() => handleFieldEdit("street")}
                            >
                                &#9998;
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            City
                        </label>
                        <div className="relative flex">
                            <select
                                name="city"
                                value={address.city}
                                onChange={handleAddressChange}
                                className={`w-full border rounded-lg px-3 py-2 ${
                                    editingField === "city"
                                        ? ""
                                        : "bg-gray-200 cursor-not-allowed"
                                }`}
                                disabled={editingField !== "city"}
                            >
                                <option value={address.city.Id}>
                                    {address.city}
                                </option>
                                {locations.cities.map((city) => (
                                    <option key={city.Id} value={city.Id}>
                                        {city.Name}
                                    </option>
                                ))}
                            </select>
                            <span
                                className="text-gray-500 cursor-pointer"
                                onClick={() => handleFieldEdit("city")}
                            >
                                &#9998;
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            District
                        </label>
                        <div className="relative flex">
                            <select
                                name="district"
                                value={address.district}
                                onChange={handleAddressChange}
                                className={`w-full border rounded-lg px-3 py-2 ${
                                    editingField === "district"
                                        ? ""
                                        : "bg-gray-200 cursor-not-allowed"
                                }`}
                                disabled={editingField !== "district"}
                            >
                                <option value={address.district.Id}>
                                    {address.district}
                                </option>
                                {locations.districts.map((district) => (
                                    <option
                                        key={district.Id}
                                        value={district.Id}
                                    >
                                        {district.Name}
                                    </option>
                                ))}
                            </select>
                            <span
                                className="text-gray-500 cursor-pointer"
                                onClick={() => handleFieldEdit("district")}
                            >
                                &#9998;
                            </span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Ward
                        </label>
                        <div className="relative flex">
                            <select
                                name="ward"
                                value={address.ward}
                                onChange={handleAddressChange}
                                className={`w-full border rounded-lg px-3 py-2 ${
                                    editingField === "ward"
                                        ? ""
                                        : "bg-gray-200 cursor-not-allowed"
                                }`}
                                disabled={editingField !== "ward"}
                            >
                                <option value={address.ward.Id}>
                                    {address.ward}
                                </option>
                                {locations.wards.map((ward) => (
                                    <option key={ward.Id} value={ward.Id}>
                                        {ward.Name}
                                    </option>
                                ))}
                            </select>
                            <span
                                className="text-gray-500 cursor-pointer"
                                onClick={() => handleFieldEdit("ward")}
                            >
                                &#9998;
                            </span>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserProfilePage;
