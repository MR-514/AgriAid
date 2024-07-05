import { ctpClient } from "@/utils/ctConfiguration";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const requestData = req.body;
        const { email, password } = requestData;

        try {
            const response = await ctpClient.execute({
                method: 'POST',
                uri: '/agriaid/login',
                body: { email, password }
            });

            const customerId = response.body.customer.id;

            res.status(200).json({ customerId });
        } catch (error) {
            console.error('Invalid Credentials:', error);
            res.status(401).json({ error: 'Invalid Credentials' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}