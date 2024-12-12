import React, { useState, useEffect } from "react";
import {
    Divider,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [filterRating, setFilterRating] = useState(null); // Filter by rating
    const [dateSortOrder, setDateSortOrder] = useState("desc"); // Sort order: asc or desc
    const [filteredComments, setFilteredComments] = useState([]);
    const [visibleComments, setVisibleComments] = useState(5); // Show initial 5 comments

    // Updated fetchComments function based on the API
    const fetchComments = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: 1,
                        username: "John Doe",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 4,
                        date: "2023-07-07 00:28",
                        comment:
                            "This is the first comment. It contains some feedback about the product.",
                    },
                    {
                        id: 2,
                        username: "Jane Smith",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 5,
                        date: "2023-07-08 14:45",
                        comment: "Great product! Highly recommend it.",
                    },
                    {
                        id: 3,
                        username: "Alice Johnson",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 3,
                        date: "2023-07-09 09:22",
                        comment: "Decent quality but could be improved.",
                    },
                    {
                        id: 4,
                        username: "Bob Brown",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 4,
                        date: "2023-07-10 12:00",
                        comment:
                            "I liked the product, but shipping was delayed.",
                    },
                    {
                        id: 5,
                        username: "Emma Wilson",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 5,
                        date: "2023-07-11 16:30",
                        comment:
                            "Fantastic product! Will definitely buy again.",
                    },
                    {
                        id: 6,
                        username: "Chris Lee",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 2,
                        date: "2023-07-12 08:45",
                        comment: "Not satisfied with the quality.",
                    },
                    {
                        id: 7,
                        username: "Sarah Green",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 4,
                        date: "2023-07-13 10:00",
                        comment: "Good product overall, worth the price.",
                    },
                    {
                        id: 8,
                        username: "James White",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 3,
                        date: "2023-07-14 15:00",
                        comment: "Average experience, could be better.",
                    },
                    {
                        id: 9,
                        username: "Olivia Brown",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 5,
                        date: "2023-07-15 18:00",
                        comment: "Absolutely love this product!",
                    },
                    {
                        id: 10,
                        username: "Liam Johnson",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 1,
                        date: "2023-07-16 09:00",
                        comment: "Terrible quality. Not worth the money.",
                    },
                    {
                        id: 11,
                        username: "Mia Anderson",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 5,
                        date: "2023-07-17 12:45",
                        comment: "Highly recommend this product to everyone!",
                    },
                    {
                        id: 12,
                        username: "Ethan Martinez",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 3,
                        date: "2023-07-18 13:30",
                        comment: "It’s okay but not great.",
                    },
                    {
                        id: 13,
                        username: "Sophia Robinson",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 4,
                        date: "2023-07-19 08:00",
                        comment: "Good product, timely delivery.",
                    },
                    {
                        id: 14,
                        username: "Ava Garcia",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 4,
                        date: "2023-07-20 09:30",
                        comment:
                            "Satisfactory purchase. Will consider buying again.",
                    },
                    {
                        id: 15,
                        username: "Noah Lee",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 5,
                        date: "2023-07-21 10:00",
                        comment: "Absolutely amazing! Exceeded expectations.",
                    },
                    {
                        id: 16,
                        username: "Isabella Gonzalez",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 2,
                        date: "2023-07-22 11:30",
                        comment:
                            "Not what I expected. Quality could be better.",
                    },
                    {
                        id: 17,
                        username: "Lucas Clark",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 4,
                        date: "2023-07-23 12:00",
                        comment: "Good value for money.",
                    },
                    {
                        id: 18,
                        username: "Amelia Lewis",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 4,
                        date: "2023-07-24 14:00",
                        comment: "I’m happy with the purchase.",
                    },
                    {
                        id: 19,
                        username: "Oliver Young",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 5,
                        date: "2023-07-25 15:30",
                        comment: "Excellent product! Will buy again.",
                    },
                    {
                        id: 20,
                        username: "Elijah Walker",
                        userImage:
                            "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/409178481_2169379819932639_7576753703798547393_n.jpg?stp=c0.0.354.354a_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=0ywgDmVIswcQ7kNvgEdYHEN&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A_PZTTqcT3Yo48TF2Pd5G02&oh=00_AYDn-i5FfVbsM3iD9HgWrPOhJna821BOkD-CHPzNBSC4mA&oe=67604C5B",
                        rating: 1,
                        date: "2023-07-26 08:45",
                        comment: "Very disappointed. Would not recommend.",
                    },
                ]);
            }, 1000);
        });
    };

    useEffect(() => {
        // Fetch comments and set state
        fetchComments().then((data) => {
            setComments(data);
        });
    }, []);

    useEffect(() => {
        // Filter and sort comments
        let filtered = comments;

        if (filterRating) {
            filtered = comments.filter(
                (comment) => comment.rating === filterRating
            );
        }

        filtered.sort((a, b) =>
            dateSortOrder === "asc"
                ? new Date(a.date) - new Date(b.date)
                : new Date(b.date) - new Date(a.date)
        );

        setFilteredComments(filtered);
    }, [comments, filterRating, dateSortOrder]);

    const handleFilterChange = (event) => {
        setFilterRating(event.target.value || null);
    };

    const handleSortChange = (event) => {
        setDateSortOrder(event.target.value || "desc");
    };

    return (
        <div className="my-6">
            <h2 className="text-2xl font-semibold mb-4">Customer Comments</h2>

            {/* Filter and Sort Controls */}
            <div className="flex flex-row justify-between items-center mb-4">
                {/* Filter by Star */}
                <FormControl
                    variant="outlined"
                    size="small"
                    style={{ width: "45%" }}
                >
                    <InputLabel>Filter by Star</InputLabel>
                    <Select
                        value={filterRating || ""}
                        onChange={handleFilterChange}
                        label="Filter by Star"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value={5}>5 Stars</MenuItem>
                        <MenuItem value={4}>4 Stars</MenuItem>
                        <MenuItem value={3}>3 Stars</MenuItem>
                        <MenuItem value={2}>2 Stars</MenuItem>
                        <MenuItem value={1}>1 Star</MenuItem>
                    </Select>
                </FormControl>
                {/* Sort by Timestamp */}
                <FormControl
                    variant="outlined"
                    size="small"
                    style={{ width: "45%" }}
                >
                    <InputLabel>Sort by</InputLabel>
                    <Select
                        value={dateSortOrder}
                        onChange={handleSortChange}
                        label="Sort by"
                    >
                        <MenuItem value="desc">Newest</MenuItem>
                        <MenuItem value="asc">Oldest</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {/* Comments */}
            {filteredComments.slice(0, visibleComments).map((comment) => (
                <div key={comment.id} className="flex items-start mb-4">
                    <img
                        src={comment.userImage}
                        alt={comment.username}
                        className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                        <h4 className="text-lg font-semibold">
                            {comment.username}
                        </h4>
                        <p className="text-gray-500 text-sm">
                            {new Date(comment.date).toLocaleString()}
                        </p>
                        <div className="flex text-yellow-400 my-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-5 w-5 ${
                                        i < comment.rating
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
                        <p>{comment.comment}</p>
                    </div>
                </div>
            ))}

            {/* Show More Button */}
            {visibleComments < filteredComments.length && (
                <div className="flex justify-center mt-4">
                    <Button
                        variant="contained"
                        onClick={() => setVisibleComments((prev) => prev + 5)} // Load 5 more comments
                    >
                        Show More
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CommentSection;
