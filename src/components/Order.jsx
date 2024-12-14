import { useState } from "react";
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
    Modal,
    Box,
    TextField,
    Paper,
    Avatar,
} from "@mui/material";

import { Rating } from "primereact/rating";

const orders = [
    {
        id: 1,
        productName: "Wireless Headphones",
        orderId: "ORD12345",
        deliveryStatus: "Delivered",
        paymentStatus: "Paid",
        rating: 0,
        comment: "",
        imageUrl:
            "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8b0d4d2e-d306-4b50-b335-e9c8202144d8/NIKE+DUNK+LOW+SE.png",
    },
    {
        id: 2,
        productName: "Bluetooth Speaker",
        orderId: "ORD12346",
        deliveryStatus: "In Transit",
        paymentStatus: "Pending",
        rating: 0,
        comment: "",
        imageUrl:
            "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8b0d4d2e-d306-4b50-b335-e9c8202144d8/NIKE+DUNK+LOW+SE.png",
    },
    {
        id: 3,
        productName: "Smartphone",
        orderId: "ORD12347",
        deliveryStatus: "Preparing",
        paymentStatus: "Paid",
        rating: 0,
        comment: "",
        imageUrl:
            "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/8b0d4d2e-d306-4b50-b335-e9c8202144d8/NIKE+DUNK+LOW+SE.png",
    },
];

export default function OrderTracking() {
    const [orderList, setOrderList] = useState(orders);
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [value, setValue] = useState(0);
    const [comment, setComment] = useState("");

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setValue(order.rating);
        setComment(order.comment);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedOrder(null);
        setValue(0);
        setComment("");
    };

    const handleSubmit = () => {
        if (selectedOrder) {
            console.log("Rating:", value);
            console.log("Comment:", comment);
        }
        handleCloseModal();
    };

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Order Tracking
            </Typography>
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
                            <TableCell align="center">
                                <strong>Actions</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderList.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>
                                    <Avatar
                                        variant="rounded"
                                        src={order.imageUrl}
                                        alt={order.productName}
                                        sx={{ width: 80, height: 80 }}
                                    />
                                </TableCell>
                                <TableCell>{order.productName}</TableCell>
                                <TableCell>{order.orderId}</TableCell>
                                <TableCell>{order.deliveryStatus}</TableCell>
                                <TableCell>{order.paymentStatus}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleOpenModal(order)}
                                    >
                                        Rate & Comment
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal for Rating and Comments */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        width: 400,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Rate & Comment for {selectedOrder?.productName}
                    </Typography>
                    <Box sx={{ "& > legend": { mt: 2 } }}>
                        <Rating
                            className="text-yellow"
                            value={value}
                            onChange={(e) => {
                                setValue(e.value);
                            }}
                            cancel={false}
                            onIcon={
                                <svg
                                    viewBox="0 0 1024 1024"
                                    fill="yellow"
                                    stroke="black"
                                    strokeWidth="50"
                                    height="2em"
                                    width="2em"
                                >
                                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" />
                                </svg>
                            }
                            offIcon={
                                <svg
                                    viewBox="0 0 1024 1024"
                                    fill="currentColor"
                                    height="2em"
                                    width="2em"
                                >
                                    <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" />
                                </svg>
                            }
                        />
                    </Box>
                    <TextField
                        label="Comment"
                        multiline
                        rows={3}
                        fullWidth
                        margin="normal"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Box sx={{ textAlign: "right", mt: 2 }}>
                        <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
}
