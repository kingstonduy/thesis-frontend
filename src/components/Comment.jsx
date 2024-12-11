import React, { useState, useEffect } from "react";

// Simulated API response for comments
const fetchComments = () => {
    return [
        {
            id: 1,
            user: {
                avatar: "https://via.placeholder.com/50",
                name: "John Doe",
            },
            date: "2024-12-10T10:30:00Z",
            rating: 5,
            content:
                "Great shoes! Very comfortable and stylish. Would recommend to others.",
        },
        {
            id: 2,
            user: {
                avatar: "https://via.placeholder.com/50",
                name: "Jane Smith",
            },
            date: "2024-12-09T08:20:00Z",
            rating: 4,
            content:
                "Good quality, but the fit was slightly smaller than expected.",
        },
        {
            id: 3,
            user: {
                avatar: "https://via.placeholder.com/50",
                name: "Mike Johnson",
            },
            date: "2024-12-08T15:45:00Z",
            rating: 3,
            content: "Average quality, not what I expected for the price.",
        },
        {
            id: 4,
            user: {
                avatar: "https://via.placeholder.com/50",
                name: "Alice Brown",
            },
            date: "2024-12-07T12:10:00Z",
            rating: 2,
            content: "Poor quality and not comfortable at all.",
        },
        {
            id: 5,
            user: {
                avatar: "https://via.placeholder.com/50",
                name: "Charlie Green",
            },
            date: "2024-12-06T09:00:00Z",
            rating: 1,
            content: "Terrible product. Broke after a week of use.",
        },
    ];
};

// Comment component
const Comment = ({ user, date, rating, content }) => {
    const formattedDate = new Date(date).toLocaleString();

    return (
        <div className="flex items-start mb-6">
            <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-4"
            />
            <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold">{user.name}</h4>
                    <span className="text-sm text-gray-500">
                        {formattedDate}
                    </span>
                </div>
                <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 ${
                                    index < rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 .587l3.668 10.825h11.38l-9.056 6.571 3.44 10.826-9.057-6.571-9.058 6.571 3.441-10.826-9.057-6.571h11.381z" />
                            </svg>
                        ))}
                    </div>
                </div>
                <p className="text-gray-700">{content}</p>
            </div>
        </div>
    );
};

// Comment Section component
const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [filterRating, setFilterRating] = useState(null); // Filter by rating
    const [filteredComments, setFilteredComments] = useState([]);
    const [dateSortOrder, setDateSortOrder] = useState("desc"); // Sort order: asc or desc

    useEffect(() => {
        const fetchedComments = fetchComments();
        setComments(fetchedComments);
    }, []);

    useEffect(() => {
        // Filter comments based on selected rating
        let filtered = comments;
        if (filterRating) {
            filtered = comments.filter(
                (comment) => comment.rating === filterRating
            );
        }
        // Sort comments by date
        filtered.sort((a, b) =>
            dateSortOrder === "asc"
                ? new Date(a.date) - new Date(b.date)
                : new Date(b.date) - new Date(a.date)
        );
        setFilteredComments(filtered);
    }, [comments, filterRating, dateSortOrder]);

    const handleFilter = (rating) => {
        setFilterRating(rating);
    };

    const calculateStarPercentage = () => {
        const totalComments = comments.length;
        const percentages = Array(5).fill(0);
        comments.forEach((comment) => {
            percentages[comment.rating - 1] += 1;
        });
        return percentages.map((count) =>
            ((count / totalComments) * 100).toFixed(1)
        );
    };

    const starPercentages = calculateStarPercentage();

    return (
        <div className="my-6">
            <h2 className="text-2xl font-semibold mb-4">Customer Comments</h2>

            <div className="flex flex-row justify-between">
                {/* Horizontal Bar Chart */}
                <div className="mb-6 w-[300px]">
                    {starPercentages.map((percentage, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <span className="text-sm w-10">{5 - index}★</span>
                            <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-400"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                                {percentage}%
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col">
                    {/* Filter Buttons */}
                    <div className="flex space-x-2 mb-6 flex-col items-center ">
                        <button
                            onClick={() => handleFilter(null)}
                            className={`px-4 py-2 rounded-full w-36 mb-3 border-2 border-black hover:border-black ${
                                filterRating === null
                                    ? "bg-black text-white"
                                    : "bg-white text-gray-800"
                            }`}
                        >
                            All
                        </button>
                        <div className="flex flex-row justify-center  py-2 ">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => handleFilter(rating)}
                                    className={`w-16 h-[50px] py-2 mr-2 rounded-full border-2 border-black hover:border-black flex items-center justify-center ${
                                        filterRating === rating
                                            ? "bg-black text-white"
                                            : "bg-white text-gray-800"
                                    }`}
                                >
                                    {rating}
                                    <div className="flex justify-center items-center text-yellow-400 text-2xl">
                                        ★
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sort Menu */}
                    <div className="mb-6">
                        <SortMenu
                            dateSortOrder={dateSortOrder}
                            setDateSortOrder={setDateSortOrder}
                        />
                    </div>
                    <div className="mb-6">
                        <FilterMenu
                            filter={filterRating}
                            setFilter={setFilterRating}
                        />
                    </div>
                </div>
            </div>

            {/* Comments */}
            {filteredComments.length > 0 ? (
                filteredComments.map((comment) => (
                    <Comment
                        key={comment.id}
                        user={comment.user}
                        date={comment.date}
                        rating={comment.rating}
                        content={comment.content}
                    />
                ))
            ) : (
                <p className="text-gray-500">No comments to display.</p>
            )}
        </div>
    );
};

export default CommentSection;

const SortMenu = ({ dateSortOrder, setDateSortOrder }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSortOption = (order) => {
        setDateSortOrder(order);
        setIsMenuOpen(false); // Close the menu after selection
    };

    return (
        <>
            <button
                id="dropdownMenuIconHorizontalButton"
                data-dropdown-toggle="dropdownDotsHorizontal"
                className="inline-flex items-center p-2 text-sm font-medium text-center border border-black text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
            >
                <p>SORT</p>
            </button>

            <div
                id="dropdownDotsHorizontal"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Most Recent
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Most Helpful
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Highest Rated
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Lowest Rated
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
};

const FilterMenu = ({ filter, setFilter }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleFilter = (f) => {
        setDateSortOrder(f);
        setIsMenuOpen(false); // Close the menu after selection
    };

    return (
        <>
            <button
                id="dropdownMenuIconHorizontalButton1"
                data-dropdown-toggle="123"
                className="inline-flex items-center p-2 text-sm font-medium text-center border border-black text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
            >
                <p>FILTER</p>
            </button>

            <div
                id="123"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
                <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton1"
                >
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <li key={rating}>
                            <button
                                key={rating}
                                onClick={() => handleFilter(rating)}
                                className=" flex flex-row border border-black  items-center px-4 py-2 text-[1.25rem] w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                {rating}
                                <div className="flex justify-center items-center text-yellow-400 text-2xl">
                                    ★
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
