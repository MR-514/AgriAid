import { ctpClient } from "@/utils/ctConfiguration";



// create cart
async function createCart(customerId: String) {
    try {
        const newCart = await ctpClient.execute({
            method: "POST",
            uri: "/agriaid/carts",
            body: {
                currency: "USD",
                customerId,
            },
        });
        return newCart;
        // console.log(newCart)
    } catch (error) {
        console.log(error);
    }
}


// get cart data by customer id
export async function getCartData(customerId: string) {
    // console.log("customer id in get method", customerId)
    try {
        // Fetch cart data using ctpClient
        const response = await ctpClient.execute({
            method: "GET",
            uri: `/agriaid/carts/customer-id=${customerId}`,
        });

        // Log and return the fetched data
        // console.log("Fetched cart data:", response.body);
        return new Response(JSON.stringify(response.body), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch cart details" }), { status: 500 });
    }
}

// update lineitems into cart
export async function updateLineItems(customerId: string, productId: string, variantId: string, quantity: string, sku: string) {

    // console.log("server req json", customerId, productId, variantId, quantity, sku)
    try {
        // Fetch cart data by customer ID
        let cartResponse;
        try {
            // console.log("fetching cart details for addling line item")
            cartResponse = await ctpClient.execute({
                method: "GET",
                uri: `/agriaid/carts/customer-id=${customerId}`,
            });
            // console.log("in cart response if cart exixts", cartResponse)
        } catch (error) {
            // If no cart exists, create a new one
            cartResponse = await createCart(customerId);
            // console.log("in cart response if cart does not exixts", cartResponse)
        }

        const { id: cartId, version: cartVersion } = cartResponse.body;
        // console.log("cart data", cartId, cartVersion)

        // Add line item to the cart
        const updateResponse = await ctpClient.execute({
            method: "POST",
            uri: `/agriaid/carts/${cartId}`,
            body: {
                version: cartVersion,
                actions: [{
                    action: "addLineItem",
                    // productId: productId,
                    // variantId: parseInt(variantId, 10),
                    sku: sku,
                    quantity: quantity,
                }],
            },
        });
        // console.log("added line item to cart")

        return new Response(JSON.stringify(updateResponse.body), { status: 200 });
    } catch (error) {
        // console.log("Error updating cart:", error);
        return new Response(JSON.stringify({ error: "Failed to update cart" }), { status: 500 });
    }
}

// remove lineitems from cart
export async function deleteLineItem(customerId: string, id: string, quantity: string) {
    try {
        // Fetch cart data by customer ID
        let cartResponse;
        try {
            // console.log("fetching cart details for removing line item")
            cartResponse = await ctpClient.execute({
                method: "GET",
                uri: `/agriaid/carts/customer-id=${customerId}`,
            });
            // console.log("in cart response if cart exixts", cartResponse)
        } catch (error) {
            return error
        }

        const { id: cartId, version: cartVersion } = cartResponse.body;
        // console.log("cart data", cartId, cartVersion)

        // remove line item from the cart
        const deleteResponse = await ctpClient.execute({
            method: "POST",
            uri: `/agriaid/carts/${cartId}`,
            body: {
                version: cartVersion,
                actions: [{
                    action: "removeLineItem",
                    lineItemId: id,
                    quantity: quantity
                }],
            },
        });
        const result = await deleteResponse
        return result;
    } catch (error) {
        // console.log("Error updating cart:", error);
        return new Response(JSON.stringify({ error: "Failed to update cart" }), { status: 500 });
    }
}
