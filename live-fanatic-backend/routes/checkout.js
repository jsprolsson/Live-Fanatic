// stripe
const Stripe = require('stripe')

// stripe.com api secret key, https://dashboard.stripe.com/test/apikeys
const stripe = new Stripe('sk_test_51LhqliBLXUhnWB7wERcSUQ9Lv1NWjbMFXPM86JFEoZbBxsHTNA7MSlRileB5GZlDs3T5q3gUi7YpUdMhmgzVjFT800ER8K4Uxw') //


module.exports = function (server, db, host) {

  // route to create a checkout session
  server.post("/data/checkout", async (req, res) => {

    // accept a list of payment items, body should be formatted like:

    /*

    {
      "items":[
        {
            "description":"Thing",
            "price": 123,
            "quantity": 2
        },
        {
            "description":"Thang",
            "price": 2345,
            "quantity": 1
        }
      ]
    }

    */

    // Create an item list for Stripe:
    const lineItems = req.body.items.map(item => {
      return {
        price_data: {
          currency: "sek",
          product_data: {
            name: item.description,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity || 1
      }
    })

    const orderDetails = req.body.orderDetails
    console.log(orderDetails);

    // Create a checkout session with Stripe
    try {
      const checkoutSession = await stripe.checkout.sessions.create({
        metadata: orderDetails,
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        // Set a success and cancel URL we will send customers to
        // They are complete urls
        success_url: "http://127.0.0.1:5173" + '/confirmbuy', // these should be client routes in the react app
        cancel_url: "http://127.0.0.1:5173" + '/confirmbuy',
      })
      // save current checkout session to user session, so we can check result after

      req.session.checkoutSession = checkoutSession

      // send user to stripe process,
      // note that you will have to handle the result of the payment after that process,
      // when the user returns to our client
      res.json({ url: checkoutSession.url })
    } catch (e) {
      // If there is an error send it to the client
      res.status(500).json({ error: e.message })
    }
  })

  // route to retrieve checkout session to check result
  server.get('/data/checkout', async (req, res) => {
    try {
      const checkoutSession = await stripe.checkout.sessions.retrieve(req.session.checkoutSession.id)
      res.json({ checkoutSession: checkoutSession })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  })

}