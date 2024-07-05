"use client"

import { SfButton, SfCounter, SfIconCheckCircle, SfIconChevronRight, SfIconClose, SfIconFavorite, SfIconSearch, SfIconShoppingCart, SfLink, SfRating } from "@storefront-ui/react";
import algoliasearch from "algoliasearch";
import { Hits, InstantSearch, Pagination, RangeInput, RefinementList, SearchBox } from "react-instantsearch";
import styles from "./product-list.module.css";
import { useEffect, useRef, useState } from "react";


const client = algoliasearch("6J4Z86A51F", "3fdeb644e42652f2194e1a4bd6f91822");
const index = client.initIndex("agriAid");


export default function ProductList() {
    const [productId, setProductId] = useState('');
    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [variantId, setVariantId] = useState('');
    const [informationAlert, setInformationAlert] = useState(false);
    const [addToCartResponse, setAddToCartResponse] = useState('');
    const informationTimer = useRef(0);

    const handleClick = async (productData) => {
        setProductId(productData.productID);
        setSku(productData.sku);
        setVariantId(productData.objectID.split('.').pop());
        await addToCart(productData.sku);
    };

    const addToCart = async (sku) => {
        const customerId = localStorage.getItem("customerId");
        if (!customerId) {
            alert("Customer not found. Please log in.");
            return;
        }
        try {
            const productData = { customerId, productId, variantId, quantity, sku };
            const response = await fetch(`/api/cart/${customerId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });
            const result = await response.json();
            if (response.status === 200) {
                setAddToCartResponse(result.message);
                setInformationAlert(true);
            }
        } catch (error) {
            console.log("Error adding product to cart:", error);
        }
    };

    useEffect(() => {
        if (informationAlert) {
            clearTimeout(informationTimer.current);
            informationTimer.current = window.setTimeout(() => {
                setInformationAlert(false);
            }, 5000);
        }
        return () => {
            clearTimeout(informationTimer.current);
        };
    }, [informationAlert]);

    function Hit({ hit }) {
        return (
            <div className={styles.productlistContainer}>
                <div className={`border border-neutral-200 rounded-md hover:shadow-lg max-w-[250px] ${styles.productCard}`}>
                    <div className="relative">
                        <SfLink href={`/products/${hit.objectID}`} className="block">
                            <img
                                src={hit.images[0]}
                                alt={hit["name.en-US"]}
                                className={`object-cover h-auto rounded-md aspect-square ${styles.productImage}`}
                                width="237"
                                height="250"
                            />
                        </SfLink>
                        <SfButton
                            variant="tertiary"
                            size="sm"
                            square
                            className="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
                            aria-label="Add to wishlist"
                        >
                            <SfIconFavorite size="sm" />
                        </SfButton>
                    </div>
                    <div className={`p-4 border-t border-neutral-200 ${styles.productData}`}>
                        <div className="flex items-center pt-1">
                            <SfRating size="xs" value={5} max={5} />
                            <SfLink href="#" variant="secondary" className="pl-1 no-underline">
                                <SfCounter size="xs">{5}</SfCounter>
                            </SfLink>
                        </div>
                        <SfLink href={`/product/${hit.objectID}`} variant="secondary" className={`no-underline ${styles.productName}`}>
                            {hit.name["en-US"]}
                        </SfLink>
                        <p className="block py-2 font-normal typography-text-sm text-neutral-700">
                            Brand : {hit.attributes.Brand}
                        </p>
                        {hit.attributes.Quantity ? (
                            <p className="block py-2 font-normal typography-text-sm text-neutral-700">
                                Quantity : {hit.attributes.Quantity}
                            </p>
                        ) : hit.attributes.PowerSource ? (
                            <p className="block py-2 font-normal typography-text-sm text-neutral-700">
                                Power Source : {hit.attributes.PowerSource}
                            </p>
                        ) : hit.attributes.type ? (
                            <p className="block py-2 font-normal typography-text-sm text-neutral-700">
                                Type : {hit.attributes.type}
                            </p>
                        ) : null}
                        <span className="block pb-2 font-bold typography-text-lg">Rs. {(hit.prices.USD["min"])}</span>
                        <SfButton size="sm" slotPrefix={<SfIconShoppingCart size="sm" />} onClick={() => handleClick(hit)}>
                            Add to cart
                        </SfButton>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <InstantSearch indexName="agriAid" searchClient={client}>
                <main className={styles.productListMainContainer}>
                    <div className={styles.filterContainer}>
                        <h1><SfIconChevronRight /> Filters</h1>
                        <div className={styles.individualFilter}>
                            <h1>Filter by Type</h1>
                            <RefinementList attribute="attributes.type" className={`refinementlist-style count-button ${styles.filterResults}`} />
                        </div>
                        <div className={styles.individualFilter}>
                            <h1>Filter by Category</h1>
                            <RefinementList attribute="categories.en-US.lvl0" className={`refinementlist-style count-button ${styles.filterResults}`} />
                        </div>
                        <div className={styles.individualFilter}>
                            <h1>Filter by Sub-Category</h1>
                            <RefinementList attribute="categoryKeys.en-US" className={`refinementlist-style count-button ${styles.filterResults}`} />
                        </div>
                    </div>
                    <div className={styles.productsMainContainer}>
                        <div className={styles.searchBoxContainer}>
                            <p>Search for Products</p>
                            <SearchBox className={styles.searchBox} />
                        </div>
                        <div className={styles.productListgrid}>
                            <Hits hitComponent={Hit} />
                        </div>
                        <Pagination className={styles.pagination} />
                    </div>
                </main>
            </InstantSearch>
            <div style={{ position: "fixed", top: 0, right: 0 }}>
                {informationAlert ? <div
                    role="alert"
                    className="flex items-start md:items-center max-w-[600px] shadow-md bg-positive-100 pr-2 pl-4 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
                >
                    <SfIconCheckCircle className="my-2 mr-2 text-positive-700 shrink-0" />
                    <p className="py-2 mr-2">The product has been added to the cart.</p>
                    <button
                        onClick={() => setInformationAlert(false)}
                        type="button"
                        className="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900 focus-visible:outline focus-visible:outline-offset"
                        aria-label="Close positive alert"
                    >
                        <SfIconClose className="hidden md:block" />
                        <SfIconClose size="sm" className="block md:hidden" />
                    </button>
                </div> : <></>}
            </div>

        </>
    );
}