import voucherifyClient from "@/utils/voucherifyConfig";

export async function POST(req: Request) {
  const requestdata = await req.json()
  // console.log("req is : ", requestdata)

  const { coupon, customerId, grandTotal } = requestdata

  try {
    // const voucher = await voucherifyClient.vouchers.get(couponCode);
    const response = await voucherifyClient.redemptions.redeem(coupon, {
      customer: { id: customerId },
      order: { amount: parseInt(grandTotal) * 100 }, //converting into cents
    });
    const orderData = response.order;
    const { discount_amount, total_amount } = orderData
    return new Response(JSON.stringify({ discount_amount, total_amount  }), {
      status: 200,
      headers: {
          'Content-Type': 'application/json',
      },
  })

  } catch (error) {
    return new Response("something went wrong")
  }
}