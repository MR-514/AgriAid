import { NextApiRequest, NextApiResponse } from "next";
import { deleteLineItem, getCartData, updateLineItems } from "./cartoperations";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const { customerId } = req.query;
            const response = await getCartData(customerId);
            const result = await response.json()
            res.status(response.status).json(result);
        } else if (req.method === "POST") {
            // Handle POST request
            const response = await updateLineItems(req);
            const result = await response.json()
            res.status(response.status).send({ message: "Item Added to Cart." });
        } else if (req.method === "DELETE") {
            const response = await deleteLineItem(req)
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
