"use client";

import { useEffect, useState, ChangeEvent, useRef } from "react";
import { SfButton, SfIconRemove, SfLink, SfIconAdd, SfIconDelete, SfIconCheckCircle, SfIconClose, SfInput } from '@storefront-ui/react';
import { useRouter } from "next/navigation";
import styles from "./cartStyles.module.css"
import CartDisplay from "./cartDetails"
import AddressForm from "./shippingAddress";
import CartSummary from "./cartSummary";

export default function Cart() {
    const [productsInCart, setProductsInCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const [itemsInCart, setItemsInCart] = useState(0)
    // console.log(totalPrice,itemsInCart)

    const router = useRouter()

    // fetching cart details
    useEffect(() => {
        const fetchCartData = async () => {
            const customerId = localStorage.getItem("customerId");
            // console.log(customerId);
            try {
                const response = await fetch(`/api/cart/${customerId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const result = await response.json();
                console.log("fetched cart data", result)
                setTotalPrice(result.totalPrice.centAmount)
                setItemsInCart(result.totalLineItemQuantity)
                const extractedDetails = extractVariantDetails(result.lineItems);
                setProductsInCart(extractedDetails);
                // console.log("result in fetching cart data", extractedDetails);
            } catch (error) {
                console.error('Error Fetching Cart Details', error);
            }
        };

        fetchCartData();
    }, []);
    // extracting line items in cart
    const extractVariantDetails = (data) => {
        return data.map(item => {
            const { name, variant, price, quantity, totalPrice } = item;
            const variantName = name['en-US'];
            const variantPrice = variant.prices[0].value.centAmount;
            const variantQuantity = quantity;
            const variantImage = variant.images[0].url;
            const variantTotalPrice = totalPrice.centAmount;

            return {
                id: item.id,
                name: variantName,
                price: variantPrice,
                quantity: variantQuantity,
                image: variantImage,
                totalPrice: variantTotalPrice,
            };
        });
    };
    // handling quantity change - not in function with CT 
    const handleQuantityChange = (productId, newQuantity) => {
        setProductsInCart(prevProducts =>
            prevProducts.map(product =>
                product.id === productId
                    ? { ...product, quantity: newQuantity }
                    : product
            )
        );
    };


    const [showShippingAddress, setShowShippingAddress] = useState(false);
    const [showCartDetails, setShowCartDetails] = useState(false);

    const handleButtonClick = () => {
        setShowShippingAddress(true);
        // setShowCartDetails(false);
    };

    const handleClick = () => {
        // setShowShippingAddress(false);
        setShowCartDetails(true);
    };
    return (
        <>
            <div className={styles.cartContainer}>
                <div>
                    <p className="font-bold text-2xl">Shopping Bag</p>
                    {productsInCart.length === 0 ? (
                        <p>Your shopping cart is empty.</p>
                    ) : (
                        <>
                            {showShippingAddress ? (
                                <>
                                    <AddressForm />
                                    <button
                                        onClick={handleClick}
                                        className="mt-4 p-2 bg-blue-500 text-white"
                                    >
                                        Show cart items
                                    </button>
                                </>
                            ) : (
                                <>
                                    {showCartDetails && (
                                        <>
                                            <CartDisplay productsInCart={productsInCart} />
                                            <button
                                                onClick={handleButtonClick}
                                                className="mt-4 p-2 bg-blue-500 text-white"
                                            >
                                                Enter Shipping Address
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
                <div>
                    <CartSummary productsInCart={productsInCart} itemsInCart={itemsInCart} totalPrice={totalPrice} />
                </div>
            </div>
        </>
    );
}
