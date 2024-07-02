import { ctpClient } from "../../../utils/ctConfiguration"
export async function POST(req: Request) {
    const requestdata = await req.json()
    // console.log("req is : ", requestdata)
    const { firstname, lastname, email, password } = requestdata
    // console.log(firstname, lastname, email, password)
    try {
        const response = await ctpClient.execute({
            method: "POST",
            uri: "/agriaid/customers",
            body: { email, firstname, lastname, password }
        });
        // const customerId = response.body.customer.id
        return new Response("success", {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        // console.error("Invalid Credentials:", error);
        return new Response(JSON.stringify({ error: "Registration failed" }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
