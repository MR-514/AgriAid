import Link from "next/link"
import { useEffect, useState } from "react";

const SuccessPage = () => {
    const [orderId, setOrderId] = useState('')
    // Fetching cart details
    useEffect(() => {
        const fetchCartData = async () => {
            const customerId = localStorage.getItem("customerId");
            try {
                const response = await fetch(`/api/orderConfirm/${customerId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const result = await response.json();
                setOrderId(result)
            } catch (error) {
                console.error('Error Fetching Cart Details', error);
            }
        };

        fetchCartData();
    }, []);
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                    <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
                    <p className="text-gray-700 mb-4">
                        We are getting on your order right away, and you will receive an order confirmation email shortly.
                    </p>
                    <p className="text-gray-700 font-bold">
                        Your order Id is: <span className=" text-green-600">{orderId}</span> 
                    </p>
                    <p className="text-gray-700">
                        In the meantime, explore more to get your products directly from the farm delivered.
                    </p>
                    <Link
                        href="/"
                        className="mt-6 inline-block bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </>
    )
}
export default SuccessPage