import Stripe from "stripe"
const secretKey = "sk_test_51PY2lLRtmjIVTrIerWt2zzkKVw4MEIraUdfqaEKwiIW5Hmoy8jHOhdBgM5NVo6mP4tdwgpa5m2Nq0xLBjfQDwffb006Ewj4nIr"

const stripe = new Stripe(secretKey);

export async function POST(req: Request) {
    try {
        const { productsInCart, promoCode } = await req.json();



        const line_items = productsInCart.map(item => ({
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
            success_url: 'http://localhost:3000/pages/success',
            cancel_url: 'http://localhost:3000/pages/cart',
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

        // console.log('Session URL is:', session.url);     
        return new Response(JSON.stringify({ url: session.url }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to create session' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}