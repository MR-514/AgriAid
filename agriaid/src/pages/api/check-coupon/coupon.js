import voucherifyClient from '@/utils/voucherifyConfig';



export default async function handler(req ,res ) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { coupon, customerId, grandTotal } = req.body;

    const response = await voucherifyClient.redemptions.redeem(coupon, {
      customer: { id: customerId },
      order: { amount: parseInt(grandTotal) * 100 }, // converting into cents
    });

    const { discount_amount, total_amount } = response.order;

    res.status(200).send({
      discount_amount,
      total_amount
    });
  } catch (error) {
    console.error('Error redeeming coupon:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
