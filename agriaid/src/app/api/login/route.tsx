import { ctpClient } from "../../../utils/ctConfiguration"
export async function POST(req: Request) {
    const requestdata = await req.json()
    // console.log("req is : ", requestdata)
    const { email, password } = requestdata
    try {
        const response = await ctpClient.execute({
            method: "POST",
            uri: "/agriaid/login",
            body: { email, password }
        });
        const customerId = response.body.customer.id
        return new Response(JSON.stringify({ customerId }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        // console.error("Invalid Credentials:", error);
        return new Response(JSON.stringify({ error: "Invalid Credentials" }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
