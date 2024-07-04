"use client";

import { useEffect, useState } from "react";
import styles from "./cartStyles.module.css";
import CartDisplay from "./cartDetails";
import AddressForm from "./shippingAddress";
import CartSummary from "./cartSummary";
import { SfButton, SfSwitch } from "@storefront-ui/react";
import classNames from 'classnames';


export default function Cart() {
    const [productsInCart, setProductsInCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [itemsInCart, setItemsInCart] = useState(0);
    const [showShippingAddress, setShowShippingAddress] = useState(false);
    const [showCartDetails, setShowCartDetails] = useState(true);
    const [shippingAddressEntered, setShippingAddressEntered] = useState(false);
    const [checkedState, setCheckedState] = useState(false);

    // Fetching cart details
    useEffect(() => {
        const fetchCartData = async () => {
            const customerId = localStorage.getItem("customerId");
            try {
                const response = await fetch(`/api/cart/${customerId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const result = await response.json();
                setTotalPrice(result.totalPrice.centAmount);
                setItemsInCart(result.totalLineItemQuantity);
                const extractedDetails = extractVariantDetails(result.lineItems);
                setProductsInCart(extractedDetails);
            } catch (error) {
                console.error('Error Fetching Cart Details', error);
            }
        };

        fetchCartData();
    }, []);

    // Extracting line items in cart
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

    // Toggle shipping address view
    const toggleView = () => {
        setShowCartDetails(true);
        setShowShippingAddress(false);
    };

    // Callback when shipping address is submitted
    const handleShippingAddressSubmit = () => {
        setShippingAddressEntered(true);
    };

    // Conditionally render based on products in cart
    if (productsInCart.length === 0) {
        return null; // Return null if the cart is empty to render nothing
    }

    // banner details
    const displayDetails = [
        {
            image: '/address.jpg',
            title: 'Configure Address',
            description: 'Almost there! Make sure your shipping address is all set before you check out.',
            buttonText: 'Set Address',
        }
    ];
    return (
        <>
            <div className="flex flex-col md:flex-row flex-wrap gap-6 max-w-[1540px]" style={{ height: '150px' }}>
                {displayDetails.map(
                    ({ image, title, description, buttonText }) => (
                        <div
                            key={title}
                            className={classNames(
                                'relative flex md:max-w-[1536px] md:[&:not(:first-of-type)]:flex-1 md:first-of-type:w-full'
                            )}
                            style={{ height: '150px', backgroundColor: "#f7c56d" }}
                        >
                            <a
                                className="absolute w-full z-1 focus-visible:outline focus-visible:rounded-lg"
                                aria-label={title}
                                href="#"
                            />
                            <div
                                className={classNames('flex justify-between overflow-hidden grow')}
                            >
                                <div className="flex flex-col justify-center items-start p-6 lg:p-10 max-w-1/2">
                                    <h2 className={classNames('mb-4 mt-2 font-bold typography-display-3')}>{title}</h2>
                                    <p className="typography-text-base block mb-4">{description}</p>
                                    <SfButton onClick={() => setShowShippingAddress(true)} className="!bg-black">{buttonText}</SfButton>
                                </div>
                                <img src={image} alt={title} className="w-1/2 self-end" />
                            </div>
                        </div>
                    ),
                )}
            </div>


            <div className={styles.cartContainer}>
                <div>
                    <>
                        {showShippingAddress ? (
                            <AddressForm onSubmitForm={handleShippingAddressSubmit} showCart={toggleView} />
                        ) : (
                            showCartDetails && <CartDisplay productsInCart={productsInCart} />
                        )}
                    </>
                </div>
                <div>
                    <CartSummary
                        productsInCart={productsInCart}
                        itemsInCart={itemsInCart}
                        totalPrice={totalPrice}
                        shippingAddressEntered={shippingAddressEntered}
                        setShippingAddressEntered={setShippingAddressEntered}
                        disabled={!shippingAddressEntered}
                    />
                </div>
            </div>
        </>
    );
}
