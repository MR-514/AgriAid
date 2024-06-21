"use client";

import { useEffect, useState } from "react";
import "./cart.css"
export default function Cart() {
    const [productsInCart, setProductsInCart] = useState([]);

    useEffect(() => {
        const fetchCartData = async () => {
            const customerId = localStorage.getItem("customerId");
            console.log(customerId);
            try {
                const response = await fetch(`/api/cart/${customerId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const result = await response.json();
                const extractedDetails = extractVariantDetails(result.lineItems);
                setProductsInCart(extractedDetails);
                console.log("result in fetching cart data", extractedDetails);
            } catch (error) {
                console.error('Error Fetching Cart Details', error);
            }
        };

        fetchCartData();
    }, []);

    const extractVariantDetails = (data) => {
        return data.map(item => {
            const { name, variant, price, quantity } = item;
            const variantName = name['en-US'];
            const variantPrice = variant.prices[0].value.centAmount / 100; // Convert cents to dollars
            const variantQuantity = quantity;
            const variantImage = variant.images[0].url;

            return {
                id: item.id,
                name: variantName,
                price: variantPrice,
                quantity: variantQuantity,
                image: variantImage
            };
        });
    };

    return (
        <>
            {productsInCart.length === 0 ? (
                <p>Your shopping cart is empty.</p>
            ) : (
                <div className="shopping-cart">
                    <section className="itemsInCart">
                        <div className="column-labels">
                            <label className="product-image">Image</label>
                            <label className="product-details">Product</label>
                            <label className="product-price">Price</label>
                            <label className="product-quantity">Quantity</label>
                            <label className="product-line-price">Total</label>
                        </div>

                        {productsInCart.map((product) => (
                            <div className="product" key={product.id}>
                                <div className="product-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="product-details">
                                    <div className="product-title">{product.name}</div>
                                </div>
                                <div className="product-price">{product.price.toFixed(2)}</div>
                                <div className="product-quantity">
                                    <input
                                        type="number"
                                        value={product.quantity}
                                        min="1"
                                        readOnly
                                    />
                                </div>
                                <div className="product-line-price">
                                    {(product.price * product.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            )}
        </>
    );
}
