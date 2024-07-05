
import { deleteLineItem, getCartData, updateLineItems } from "./cartoperations";


export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            const { customerId } = req.query;
            const response = await getCartData(customerId);
            const result = await response.json()
            res.status(response.status).json(result);
        } else if (req.method === "POST") {
            // Handle POST request
            const { customerId, productId, variantId, quantity, sku } = await req.body;
            const response = await updateLineItems(customerId, productId, variantId, quantity, sku);
            const result = await response.json()
            res.status(response.status).send({ message: "Item Added to Cart." });
        } else if (req.method === "DELETE") {
            const { customerId } = req.query;
            const { id, quantity } = await req.body;
            const response = await deleteLineItem(customerId,id, quantity)
            const result = await response
            res.status(result.statusCode).send({ message: "Item Remeoved from the Cart." });
        }
        else {
            // Handle unsupported methods
            res.setHeader("Allow", ["GET", "POST", "DELETE"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("API error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
