import { ctpClient } from "@/utils/ctConfiguration";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    const { firstName, lastName, phone, country, street, aptNo, city, state, zipCode } = await req.body.formJSON
    const customerId = req.body.customerId
    console.log("req in address", firstName, lastName, phone, country, street, aptNo, city, state, zipCode, customerId)

    try {
        // Fetch the cart to get cartId and cartVersion
        const cartResponse = await ctpClient.execute({
            method: "GET",
            uri: `/agriaid/carts/customer-id=${customerId}`,
        });

        const { id: cartId, version: cartVersion } = cartResponse.body
        // console.log("cart id and version",cartId, cartVersion)

        // Update shipping address in the cart
        const updateResponse = await ctpClient.execute({
            method: "POST",
            uri: `/agriaid/carts/${cartId}`,
            body: {
                version: cartVersion,
                actions: [{
                    action: "setShippingAddress",
                    address : {
                    firstName: firstName,
                    lastName: lastName,
                    streetName: street,
                    postalCode: zipCode,
                    city: city,
                    country:country,
                    phone: phone
                }
                }],
        },
        });
    console.log("updateeeeeeeeeeeeeeeeeeeeeeeeee", updateResponse)
    return res.status(200).json({ message: "Shipping address updated successfully" });

} catch (error) {
    return res.status(500).json({ error: "Failed to update shipping address" });
}
}
