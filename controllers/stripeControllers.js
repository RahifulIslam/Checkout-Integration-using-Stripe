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
    // line_items: [
    //   {
    //     price_data: {
    //       currency: "usd",
    //       product_data: {
    //         name: "T-shirt",
    //       },
    //       unit_amount: 2000,
    //     },
    //     quantity: 1,
    //   },
    // ],
    line_items: line_items,
    mode: "payment",
    success_url: `${CLIENT_URL}/checkout-success`,
    cancel_url: `${CLIENT_URL}/checkout-cancel`,
  });

  res.send({ url: session.url });
};

module.exports = {
  stripePayment,
};
