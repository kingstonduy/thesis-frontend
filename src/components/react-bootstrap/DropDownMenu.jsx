import Dropdown from "react-bootstrap/Dropdown";

function DropDownMenu() {
    return (
        <div className="relative group">
            <Dropdown className="flex justify-center items-center w-full bg-black">
                <Dropdown.Toggle
                    id="dropdown-basic"
                    bsPrefix="custom-toggle bg-white border-none border-l-0 rounded-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-10 h-10 text-black hover:bg-gray-500 rounded-full "
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>
                        <a
                            href="#"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            My Account
                        </a>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <a
                            href="#"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            Purchase
                        </a>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <a
                            href="#"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            Logout
                        </a>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default DropDownMenu;
