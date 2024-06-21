"use client"

import { SfButton, SfCounter, SfIconChevronRight, SfIconFavorite, SfIconSearch, SfIconShoppingCart, SfLink, SfRating } from "@storefront-ui/react";
import algoliasearch from "algoliasearch";
import { Hits, InstantSearch, Pagination, RangeInput, RefinementList, SearchBox } from "react-instantsearch";
import styles from "./product-list.module.css";
import { useState } from "react";


const client = algoliasearch("6J4Z86A51F", "3fdeb644e42652f2194e1a4bd6f91822");
const index = client.initIndex("agriAid");


export default function ProductList() {
    const [productId, setProductId] = useState('')
    const [sku, setSku] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [variantId, setVariantId] = useState('')

    const handleClick = async (productData: any) => {
        // console.log(productData)
        setProductId(productData.productID)
        setSku(productData.sku)
        setVariantId(productData.objectID.split('.').pop())
        await new Promise(resolve => setTimeout(resolve, 0));
        await addToCart()
    }

    const addToCart = async () => {
        const customerId = localStorage.getItem("customerId");
        console.log(customerId)

        if (!customerId) {
            alert("Customer not found . Please log in.");
            return;
        }
        try {
            const productData = {
                customerId, productId, variantId, quantity, sku
            }
            console.log("product data in post request", productData)
            const response = await fetch(`/api/cart/${customerId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });
            console.log(response)
        } catch (error) {
            console.log("Error adding product to cart:", error);
        }
    };

    function Hit({ hit }: any) {
        return (
            <div className={styles.productlistContainer}>
                <div className={`border border-neutral-200 rounded-md hover:shadow-lg max-w-[250px] ${styles.productCard}`}>
                    <div className="relative">
                        <SfLink href={`/pages/products/${hit.objectID}`} className="block">
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
                        {

                        }
                        {hit.attributes.Quantity ?
                            (<p className="block py-2 font-normal typography-text-sm text-neutral-700">
                                Quantity : {hit.attributes.Quantity}
                            </p>)
                            : hit.attributes.PowerSource ?
                                (<p className="block py-2 font-normal typography-text-sm text-neutral-700"> Power Source : {hit.attributes.PowerSource}
                                </p>)
                                : hit.attributes.type ?
                                    (<p className="block py-2 font-normal typography-text-sm text-neutral-700">Type : {hit.attributes.type}
                                    </p>) : null
                        }

                        <span className="block pb-2 font-bold typography-text-lg">Rs. {(hit.prices.USD["min"])}</span>
                        <SfButton size="sm" slotPrefix={<SfIconShoppingCart size="sm" />} onClick={() => handleClick(hit)}>
                            Add to cart
                        </SfButton>
                    </div>
                </div>
            </div>
        )
    }

    return <>
        <InstantSearch indexName="agriAid" searchClient={client}>
            <main className={styles.productListMainContainer}>

                <div className={styles.filterContainer}>
                    <h1><SfIconChevronRight /> Filters</h1>
                    <div className={styles.individualFilter}>
                        <h1>Filter based on Type</h1>
                        <RefinementList attribute="attributes.type" className={`refinementlist-style count-button ${styles.filterResults}`} />

                    </div>
                    <div className={styles.individualFilter}>
                        <h1>Filter based on Category</h1>
                        <RefinementList attribute="categories.en-US.lvl0" className={`refinementlist-style count-button ${styles.filterResults}`} />

                    </div>
                    <div className={styles.individualFilter}>
                        <h1>Filter based on Sub-Category</h1>
                        <RefinementList attribute="categoryKeys.en-US" className={`refinementlist-style count-button ${styles.filterResults}`} />

                    </div>

                </div>
                <div className={styles.productsMainContainer}>
                    <div className={styles.searchBoxContainer}>
                        <div>Search</div>
                        <SearchBox className={styles.searchBox} />
                    </div>

                    <div className={styles.productListgrid}>
                        <Hits hitComponent={Hit} />
                    </div>
                    <Pagination className={styles.pagination} />


                </div>
            </main>

        </InstantSearch>

    </>
}