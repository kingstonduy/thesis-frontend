import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function CommentTest() {
    const [maxPages, setMaxPages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // For storing errors

    // Simulating an API call with error handling
    const fetchMaxPages = () => {
        setLoading(true);
        setError(null); // Reset any previous error

        setTimeout(() => {
            try {
                // Simulate success or failure
                const success = Math.random() > 0.2; // Simulate success 80% of the time
                if (success) {
                    const simulatedApiResponse = 1000; // Simulated maxPages response
                    setMaxPages(simulatedApiResponse);
                } else {
                    throw new Error("Failed to fetch data"); // Simulate an error
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }, 500); // Simulate 2-second delay
    };

    useEffect(() => {
        fetchMaxPages();
    }, []);

    return (
        <>
            <h1 className="flex justify-center">Pagination Example</h1>
            {/* Show error message if there was an error fetching the data */}
            {error && <Alert severity="error">{error}</Alert>}
            <div className="flex justify-center">
                {/* Show a loading spinner while the data is being fetched */}
                {loading ? (
                    <CircularProgress />
                ) : (
                    maxPages && (
                        <Stack spacing={2}>
                            <Pagination
                                count={maxPages}
                                renderItem={(item) => (
                                    <PaginationItem
                                        slots={{
                                            previous: ArrowBackIcon,
                                            next: ArrowForwardIcon,
                                        }}
                                        {...item}
                                    />
                                )}
                            />
                        </Stack>
                    )
                )}
            </div>
        </>
    );
}
