"use client"

import {
    SfRating,
    SfButton,
    SfLink,
    SfCounter,
    SfIconShoppingCart,
    SfIconCompareArrows,
    SfIconFavorite,
    SfIconSell,
    SfIconPackage,
    SfIconRemove,
    SfIconAdd,
    SfIconWarehouse,
    SfIconSafetyCheck,
    SfIconShoppingCartCheckout,
    SfScrollable,
    SfIconChevronLeft,
    SfIconChevronRight,
} from '@storefront-ui/react';
import { useCounter } from 'react-use';
import { useId, ChangeEvent, useState } from 'react';
import { clamp } from '@storefront-ui/shared';
import algoliasearch from "algoliasearch";
import { useEffect } from "react";

import styles from "./productDetail.module.css"

import classNames from "classnames";
import { useRouter } from 'next/router';
import Image from 'next/image';

// configure algolia
const client = algoliasearch("6J4Z86A51F", "3fdeb644e42652f2194e1a4bd6f91822");
const index = client.initIndex("agriAid");

export default function ProductDetail() {

    const inputId = useId();
    const min = 1;
    const max = 9;
    const [value, { inc, dec, set }] = useCounter(min);
    function handleOnChange(event) {
        const { value: currentValue } = event.target;
        const nextValue = parseFloat(currentValue);
        set(Number(clamp(nextValue, min, max)));
    }

    // state for gallery images 
    const [activeIndex, setActiveIndex] = useState(0);

    const onDragged = (event) => {
        if (event.swipeRight && activeIndex > 0) {
            setActiveIndex((currentActiveIndex) => currentActiveIndex - 1);
        } else if (event.swipeLeft && activeIndex < images.length - 1) {
            setActiveIndex((currentActiveIndex) => currentActiveIndex + 1);
        }
    };

    const router = useRouter()


    // state to store products
    const [product, setProduct] = useState(null);

    // fetch product from algolia based on id
    useEffect(() => {
        const fetchProductAndVariant = async () => {

            try {
                const productId = router.query.productid;
                const productResponse = await index.getObject(productId)
                // console.log(productResponse)
                const { images, description, attributes, name, prices, productID, sku, objectID } = productResponse
                setProduct({ images, description, attributes, name, prices, productID, sku, objectID });

            } catch (error) {
                console.error("Error fetching product and variant:", error);
            }
        };

        fetchProductAndVariant();
    }, [router.query.productid]);

    // empty condition
    if (!product) {
        return <div>Loading... </div>;
    }

    const { images, description, attributes, name, prices, productID, sku, objectID } = product;

    const addLineItem = async () => {
        const customerId = localStorage.getItem("customerId");
        // console.log("customer id in post cart client side", customerId, productID);
        if (!customerId) {
            alert("Customer not found . Please log in.");
            return;
        }

        try {
            const response = await fetch(`/api/cart/${customerId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customerId, productId: productID, variantId: objectID, quantity: value, sku }),
            });
            // console.log("infornytdkjns", response)
            if (response.status === 200) {
                router.push('/cart')

            }
        } catch (error) {
            alert("something went wrong please try again")

        }
    }
    return (<>
        <section className={`${styles.productDetailContainer}`}>
            {/* image gallery section */}
            <div className={` ${styles.imageContainer}`}>
                <div className={`relative flex flex-col w-full aspect-[4/3]  ${styles.productGallery}`}>
                    {/* Enlarged image */}
                    <SfScrollable
                        className="w-full h-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        activeIndex={activeIndex}
                        wrapperClassName="h-full min-h-0"
                        buttonsPlacement="none"
                        isActiveIndexCentered
                        drag={{ containerWidth: true }}
                        onDragEnd={onDragged}
                    >
                        {images.map((imageSrc, index) => (
                            <div
                                key={`${index}`}
                                className="flex justify-center h-full basis-full shrink-0 grow snap-center snap-always"
                            >
                                <img
                                    aria-label="image"
                                    aria-hidden={activeIndex !== index}
                                    className={`w-auto h-full ${styles.focusImage}`}
                                    alt={`Image ${index + 1}`}
                                    src={imageSrc}
                                />
                            </div>
                        ))}
                    </SfScrollable>
                    {/* gallery images */}
                    <SfScrollable
                        className="items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                        activeIndex={activeIndex}
                        buttonsPlacement="floating"
                        slotPreviousButton={
                            <SfButton
                                className="absolute disabled:hidden !rounded-full z-10 left-4 bg-white"
                                variant="secondary"
                                size="sm"
                                square
                                slotPrefix={<SfIconChevronLeft size="sm" />}
                            />
                        }
                        slotNextButton={
                            <SfButton
                                className="absolute disabled:hidden !rounded-full z-10 right-4 bg-white"
                                variant="secondary"
                                size="sm"
                                square
                                slotPrefix={<SfIconChevronRight size="sm" />}
                            />
                        }
                    >
                        {images.map((imageThumbSrc, index) => (
                            <button
                                type="button"
                                aria-label="image"
                                aria-current={activeIndex === index}
                                key={`${index}-thumbnail`}
                                className={classNames(
                                    "md:w-14 md:h-auto relative shrink-0 pb-1 my-2 -mr-2 border-b-4 snap-start cursor-pointer focus-visible:outline focus-visible:outline-offset transition-colors flex-grow md:flex-grow-0",
                                    activeIndex === index
                                        ? "border-primary-700"
                                        : "border-transparent"
                                )}
                                onClick={() => setActiveIndex(index)}
                            >
                                <img
                                    alt="image"
                                    className="object-contain border border-neutral-200"
                                    width="78"
                                    height="78"
                                    src={imageThumbSrc}
                                />
                            </button>
                        ))}
                    </SfScrollable>
                </div>
            </div>

            {/* product detail section */}
            <div className={styles.detailContainer}>
                {/* product name */}
                <h1 className="mb-1 font-bold typography-headline-4">
                    {name['en-US']}
                </h1>
                {/* product rating - static for now */}
                <div className="inline-flex items-center mt-4 mb-2">
                    <SfRating size="xs" value={5} max={5} />
                    <SfCounter className="ml-1" size="xs">
                        5
                    </SfCounter>
                </div>
                {/* product price */}
                <strong className="block font-bold typography-headline-3"> {Object.entries(prices.USD.priceValues).map(([key, price]) => (
                    <p key={price.id}>MRP : ₹ {price.value} <span style={{ color: 'gray', fontSize: 12, fontWeight: 'lighter' }}>(Inclusive of all taxes.)</span></p>
                ))}</strong>
                {/* product specifications */}
                <div className={styles.attributesContainer}>
                    <h1 className="mb-1 font-bold typography-headline-4">
                        Product Specifications :
                    </h1>
                    {/* product attributes */}
                    <table className={`table-auto ${styles.specificationsTable}`} >
                        <tbody>
                            {Object.entries(attributes).map(([key, value]) => (
                                <tr key={key}>
                                    <td className={`mb-1 font-bold typography-headline-4 ${styles.attributeHeading}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                                    <td> {value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* product description */}
                <h1 className="mb-1 font-bold typography-headline-4">
                    Description :
                </h1>
                <p style={{ margin: "10px 0px" }}> {description['en-US']}</p>

                {/* Quantity and add to cart button */}
                <div className="py-4 mb-4 border-gray-200 border-y">
                    <div className="items-start xs:flex">
                        <div className="flex flex-col items-stretch xs:items-center xs:inline-flex">
                            <div className="flex border border-neutral-300 rounded-md">
                                <SfButton
                                    variant="tertiary"
                                    square
                                    className="rounded-r-none p-3"
                                    disabled={value <= min}
                                    aria-controls={inputId}
                                    aria-label="Decrease value"
                                    onClick={() => dec()}
                                >
                                    <SfIconRemove />
                                </SfButton>
                                <input
                                    id={inputId}
                                    type="number"
                                    role="spinbutton"
                                    className="grow appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
                                    min={min}
                                    max={max}
                                    value={value}
                                    onChange={handleOnChange}
                                />
                                <SfButton
                                    variant="tertiary"
                                    square
                                    className="rounded-l-none p-3"
                                    disabled={value >= max}
                                    aria-controls={inputId}
                                    aria-label="Increase value"
                                    onClick={() => inc()}
                                >
                                    <SfIconAdd />
                                </SfButton>
                            </div>
                        </div>
                        <SfButton onClick={addLineItem} size="lg" className="w-full xs:ml-4" slotPrefix={<SfIconShoppingCart size="sm" />}>
                            Add to cart
                        </SfButton>
                    </div>
                </div>

            </div>

        </section>
    </>)
}