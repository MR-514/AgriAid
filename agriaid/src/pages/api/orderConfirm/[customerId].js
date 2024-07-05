import { ctpClient } from "@/utils/ctConfiguration";

export default async function handler(req, res) {

    if (req.method === 'GET') {
        const { customerId } = req.query;
        // console.log("rrrrrrrrrrrrrr", customerId)
        try {
            // Fetch cart data using ctpClient
            const response = await ctpClient.execute({
                method: "GET",
                uri: `/agriaid/carts/customer-id=${customerId}`,
            });

            // Log and return the fetched data
            const { id: cartId, version: cartVersion } = await response.body
            if (cartId) {
                const response = await ctpClient.execute({
                    method: "POST",
                    uri: `/agriaid/orders`,
                    body: {
                        cart: {
                            id: cartId,
                            typeId: "cart"
                        },
                        version: cartVersion
                    }
                })
                const { id: orderId } = response.body
                const status = response.statusCode
                console.log("orderrrr", orderId, status)
                // delete cart here if needed
                res.status(status).send(JSON.stringify(orderId))
            }

        } catch (error) {
            return new Response(JSON.stringify({ error: "Failed to fetch cart details" }), { status: 500 });
        }
    }
}
