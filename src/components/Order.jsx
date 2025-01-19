import { useState, useEffect } from "react";
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    Paper,
    Avatar,
} from "@mui/material";
import axios from "axios";
import { getHistory } from "./api-client/oderClient";

export default function OrderTracking() {
    const [orderList, setOrderList] = useState([]);
    const [visibleOrders, setVisibleOrders] = useState(5); // Initial number of orders to display
    const [loading, setLoading] = useState(false);

    // Fetch orders from API
    const fetchOrderItems = async () => {
        const timestamp = Date.now();
        const guid = crypto.randomUUID();

        const requestBody = {
            data: {
                userId: localStorage.getItem("userID"),
            },
            trace: {
                frm: "web-app",
                to: "order-service",
                cts: timestamp,
                cid: guid,
            },
        };

        setLoading(true);
        try {
            const response = await getHistory(requestBody);
            const fetchedOrders = response.data.data.Details.map((item) => ({
                id: item.productId,
                productName: item.productName,
                orderId: item.orderId,
                deliveryStatus: item.deliveryStatus,
                paymentStatus: item.paymentStatus,
                imageUrl: item.productImage,
            }));
            setOrderList(fetchedOrders);
        } catch (error) {
            console.error("Error fetching order items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderItems();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Order Tracking
            </Typography>

            {loading ? (
                <Typography align="center">Loading...</Typography>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>Image</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Product Name</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Order ID</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Delivery Status</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>Payment Status</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderList
                                    .slice(0, visibleOrders)
                                    .map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>
                                                <Avatar
                                                    variant="rounded"
                                                    src={order.imageUrl}
                                                    alt={order.productName}
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {order.productName}
                                            </TableCell>
                                            <TableCell>
                                                {order.orderId}
                                            </TableCell>
                                            <TableCell>
                                                {order.deliveryStatus}
                                            </TableCell>
                                            <TableCell>
                                                {order.paymentStatus}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Show More Button */}
                    {visibleOrders < orderList.length && (
                        <div style={{ textAlign: "center", marginTop: "16px" }}>
                            <Button
                                variant="contained"
                                onClick={() =>
                                    setVisibleOrders((prev) => prev + 5)
                                }
                            >
                                Show More
                            </Button>
                        </div>
                    )}
                </>
            )}
        </Container>
    );
}
