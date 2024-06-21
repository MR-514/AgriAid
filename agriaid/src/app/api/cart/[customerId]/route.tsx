import { ctpClient } from "../../../../utils/ctConfiguration";


// create cart
async function createCart(customerId: String) {
    try {
        const newCart = await ctpClient.execute({
            method: "POST",
            uri: "/repurpose/carts",
            body: {
                currency: "USD",
                customerId,
            },
        });
        return newCart;
    } catch (error) {
        console.log(error);
    }
}


// get cart data by customer id
export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const customerId = url.pathname.split('/').pop();

        // Fetch cart data using ctpClient
        const response = await ctpClient.execute({
            method: "GET",
            uri: `/agriaid/carts/customer-id=${customerId}`,
        });

        // Log and return the fetched data
        console.log("Fetched cart data:", response.body);
        return new Response(JSON.stringify(response.body), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch cart details" }), { status: 500 });
    }
}

// update lineitems into cart
export async function POST(req) {
    const { customerId, productId, variantId, quantity, sku } = await req.json();
    console.log(req.json)
    try {
        // Fetch cart data by customer ID
        let cartResponse;
        try {
            cartResponse = await ctpClient.execute({
                method: "GET",
                uri: `/agriaid/carts/customer-id=${customerId}`,
            });
            console.log("in cart response if cart exixts", cartResponse)
        } catch (error) {
            // If no cart exists, create a new one
            cartResponse = await createCart(customerId);
            console.log("in cart response if cart does not exixts", cartResponse)

        }

        const { id: cartId, version: cartVersion } = cartResponse.body;
        console.log("cart data", cartId, cartVersion)

        // Add line item to the cart
        const updateResponse = await ctpClient.execute({
            method: "POST",
            uri: `agriaid/carts/${cartId}`,
            body: {
                version: cartVersion,
                actions: [{
                    action: "addLineItem",
                    productId: productId,
                    variantId: parseInt(variantId, 10),
                    quantity: quantity,
                }],
            },
        });

        return new Response(JSON.stringify(updateResponse.body), { status: 200 });
    } catch (error) {
        console.error("Error updating cart:", error);
        return new Response(JSON.stringify({ error: "Failed to update cart" }), { status: 500 });
    }
}
