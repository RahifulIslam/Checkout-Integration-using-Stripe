const { STRIPE_SECRET_KEY, CLIENT_URL } = require("../service.json");
require("dotenv").config();
const stripe = require("stripe")(STRIPE_SECRET_KEY);

const stripePayment = async (req, res) => {
  const line_items = req.body.productsArray.map((item) => {
    // console.log("line items are:", item);
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    success_url: `${CLIENT_URL}/checkout-success`,
    cancel_url: `${CLIENT_URL}/checkout-cancel`,
     billing_address_collection: 'required', // or 'auto'

    // Add shipping address collection
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'BD'], // Specify the countries where shipping address is allowed
    },
  });

  res.send({ url: session.url });
};

module.exports = {
  stripePayment,
};
