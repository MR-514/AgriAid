import { ctpClient } from "@/utils/ctConfiguration";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const requestData = req.body;
        const { firstname, lastname, email, password } = requestData;

        try {
            const response = await ctpClient.execute({
                method: 'POST',
                uri: '/agriaid/customers',
                body: { email, firstname, lastname, password }
            });

            res.status(200).json({ message: 'Registration successful' });
        } catch (error) {
            console.error('Registration failed:', error);
            res.status(401).json({ error: 'Registration failed' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}