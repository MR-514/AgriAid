"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./cartStyles.module.css";
import CartDisplay from "./cartDetails";
import AddressForm from "./shippingAddress";
import CartSummary from "./cartSummary";
import {
  SfButton,
  SfIconCheckCircle,
  SfIconClose,
} from "@storefront-ui/react";
import classNames from "classnames";
import EmptyCart from "./emptyCart";
import Image from "next/image";

export default function Cart() {
  const [productsInCart, setProductsInCart] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [itemsInCart, setItemsInCart] = useState<number>(0);
  const [showShippingAddress, setShowShippingAddress] = useState<boolean>(false);
  const [showCartDetails, setShowCartDetails] = useState<boolean>(true);
  const [shippingAddressEntered, setShippingAddressEntered] = useState<boolean>(false);
  const [checkedState, setCheckedState] = useState<boolean>(false);
  const [informationAlert, setInformationAlert] = useState<boolean>(false);
  const [removeMessage, setRemoveMessage] = useState<string>("");
  const [itemDeleted, setItemDeleted] = useState<boolean>(false);
  const informationTimer = useRef<number>(0);

  // Fetching cart details
  const fetchCartData = useCallback(async () => {
    const customerId = localStorage.getItem("customerId");
    try {
      const response = await fetch(`/api/cart/${customerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setTotalPrice(result.totalPrice.centAmount);
      setItemsInCart(result.totalLineItemQuantity);
      const extractedDetails = extractVariantDetails(result.lineItems);
      setProductsInCart(extractedDetails);
    } catch (error) {
      console.error("Error Fetching Cart Details", error);
    }
  }, []);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData, itemDeleted]);

  // Extracting line items in cart
  const extractVariantDetails = (data: any[]): any[] => {
    return data.map((item: any) => {
      const { name, variant, price, quantity, totalPrice, id } = item;
      const variantName = name["en-US"];
      const variantPrice = variant.prices[0].value.centAmount;
      const variantQuantity = quantity;
      const variantImage = variant.images[0].url;
      const variantTotalPrice = totalPrice.centAmount;
      const lineItemId = id;

      return {
        id: item.id,
        name: variantName,
        price: variantPrice,
        quantity: variantQuantity,
        image: variantImage,
        totalPrice: variantTotalPrice,
        lineItemId: lineItemId,
      };
    });
  };

  // remove line item from cart
  const removeLineItem = async (id: string, quantity: number) => {
    const customerId = localStorage.getItem("customerId");
    const response = await fetch(`/api/cart/${customerId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, quantity }),
    });
    const result = await response.json();
    if (response.status === 200) {
      setInformationAlert(true);
      setRemoveMessage(result.message);
      setItemDeleted((prev) => !prev);
      // alert removed product from cart
    } else {
      setInformationAlert(true);
      setRemoveMessage("Error removing product");
    }
  };

  // to handle alerts
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

  // Toggle shipping address view
  const toggleView = () => {
    setShowCartDetails(true);
    setShowShippingAddress(false);
  };

  // Callback when shipping address is submitted
  const handleShippingAddressSubmit = () => {
    setShippingAddressEntered(true);
  };

  // check products in cart
  if (productsInCart.length === 0) {
    return (
      <>
        <EmptyCart />
      </>
    );
  }

  // banner details
  const displayDetails = [
    {
      image: "/address.jpg",
      title: "Configure Address",
      description:
        "Almost there! Make sure your shipping address is all set before you check out.",
      buttonText: "Set Address",
    },
  ];

  return (
    <>
      <div
        className="flex flex-col md:flex-row flex-wrap gap-6 max-w-[1540px]"
        style={{ height: "150px" }}
      >
        {displayDetails.map(({ image, title, description, buttonText }) => (
          <div
            key={title}
            className={classNames(
              "relative flex md:max-w-[1536px] md:[&:not(:first-of-type)]:flex-1 md:first-of-type:w-full"
            )}
            style={{ height: "150px", backgroundColor: "#f7c56d" }}
          >
            <a
              className="absolute w-full z-1 focus-visible:outline focus-visible:rounded-lg"
              aria-label={title}
              href="#"
            />
            <div
              className={classNames(
                "flex justify-between overflow-hidden grow"
              )}
            >
              <div className="flex flex-col justify-center items-start p-6 lg:p-10 max-w-1/2">
                <h2
                  className={classNames(
                    "mb-4 mt-2 font-bold typography-display-3"
                  )}
                >
                  {title}
                </h2>
                <p className="typography-text-base block mb-4">{description}</p>
                <SfButton
                  onClick={() => setShowShippingAddress(true)}
                  className="!bg-black"
                >
                  {buttonText}
                </SfButton>
              </div>
              <Image src={image} alt={title} className="w-1/2 self-end" />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cartContainer}>
        <div>
          <>
            {showShippingAddress ? (
              <AddressForm
                onSubmitForm={handleShippingAddressSubmit}
                showCart={toggleView}
              />
            ) : (
              showCartDetails && (
                <CartDisplay
                  productsInCart={productsInCart}
                  removeItem={removeLineItem}
                />
              )
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
      <div style={{ position: "fixed", top: 0, right: 0 }}>
        {informationAlert ? (
          <div
            role="alert"
            className="flex items-start md:items-center max-w-[600px] shadow-md bg-positive-100 pr-2 pl-4 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
          >
            <SfIconCheckCircle className="my-2 mr-2 text-positive-700 shrink-0" />
            <p className="py-2 mr-2">{removeMessage}</p>
            <button
              onClick={() => setInformationAlert(false)}
              type="button"
              className="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900 focus-visible:outline focus-visible:outline-offset"
              aria-label="Close positive alert"
            >
              <SfIconClose className="hidden md:block" />
              <SfIconClose size="sm" className="block md:hidden" />
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
