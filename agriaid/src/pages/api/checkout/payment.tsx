import Stripe from "stripe"
const secretKey = "sk_test_51PY2lLRtmjIVTrIerWt2zzkKVw4MEIraUdfqaEKwiIW5Hmoy8jHOhdBgM5NVo6mP4tdwgpa5m2Nq0xLBjfQDwffb006Ewj4nIr"

const stripe = new Stripe(secretKey);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { productsInCart, promoCode } = req.body;

        const line_items = productsInCart.map((item: { name: string; image: string; price: number; quantity: number; }) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        let sessionParams: Stripe.Checkout.SessionCreateParams = {
            line_items,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cart',
        };

        // Create a coupon programmatically - to handle discounted amount
        if (promoCode > 0) {
            const coupon = await stripe.coupons.create({
                amount_off: promoCode * 100,
                currency: 'inr',
                duration: 'once',
            });
            sessionParams = {
                ...sessionParams,
                discounts: [{ coupon: coupon.id }],
            };
        }

        const session = await stripe.checkout.sessions.create(sessionParams);

        // Respond with the session URL
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create session' });
    }
}