var express = require("express");
var exphbs = require("express-handlebars");
var port = process.env.PORT || 3000;

var app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("assets"));

app.use("/assets", express.static(__dirname + "/assets"));

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/detail", function (req, res) {
  res.render("detail", req.query);
});

app.get("/failure", function (req, res) {
  res.render("failure", req.query);
});

app.get("/pending", function (req, res) {
  res.render("pending", req.query);
});

app.get("/success", function (req, res) {
  res.render("success", req.query);
});

app.listen(port);

// TODO: 6 cuotas
// TODO: NO TARJETAS DINERS NI ATM

// Mercado Pago SDK
const mercadopago = require("mercadopago");
// Add Your credentials - PRODUCTION ?????
mercadopago.configure({
  access_token:
    "TEST-6137155407758597-040923-9b0637fd36eadf9c3c909795d14a32e3-348599123",
});

// var payer = {
//   name: "Lalo",
//   surname: "Landa",
//   email: "@hotmail.com", //TODO COMPLETE This
//   date_created: "2015-06-02T12:58:41.425-04:00", //TODO COMPLETE This
//   phone: {
//     area_code: "52",
//     number: "5549737300",
//   },

//   identification: {
//     type: "DNI",
//     number: "22334445",
//   },
//   address: {
//     street_name: "Insurgentes Sur",
//     street_number: "1602",
//     zip_code: "03940",
//   },
// };

let preference = {
  payer: {
    name: "Lalo",
    surname: "Landa",
    email: "test_user_46542185@testuser.com", //TODO COMPLETE This
    date_created: "2021-06-02T12:58:41.425-04:00", //TODO COMPLETE This
    phone: {
      area_code: "52",
      number: 5549737300,
    },

    identification: {
      type: "DNI",
      number: "22334445",
    },
    address: {
      street_name: "Insurgentes Sur",
      street_number: 1602,
      zip_code: "03940",
    },
    payment_methods: {
      excluded_payment_methods: [{ id: "diners" }],
      excluded_payment_types: [{ id: "atm" }],
    },
  },
  external_reference: "referencia del negocio",
  back_urls: {
    success: "https://localhost:3000/success",
    failure: "http://localhost:3000/failure",
    pending: "http://localhost:3000/pending",
  },
  notification_url: "https://localhost:3000/webhook", 
  auto_return: "approved",
  installments: 6,
  default_installments: 6,
  items: [
    {
      id: "1234",
      title: "dfsd", //TODO COMPLETE This
      description: "Dispositivo móvil de Tienda e-commerce",
      picture_url:
        "https://static.remove.bg/remove-bg-web/2a274ebbb5879d870a69caae33d94388a88e0e35/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg", //TODO COMPLETE this
      category_id: "smartphones",
      quantity: parseInt(1),
      currency_id: "PEN",
      unit_price: parseFloat(55.41), //TODO COMPLETE this
    },
  ],
};

mercadopago.preferences
  .create(preference)
  .then(function (response) {
    // This value replaces the String "<%= global.id %>" in your HTML
    global.id = response.body.id;
  })
  .catch(function (error) {
    console.log(error);
  });

//Public key: TEST-c2dc8443-9c7b-4a30-883c-1c2b46e1f515
// Access Token: TEST-6137155407758597-040923-9b0637fd36eadf9c3c909795d14a32e3-348599123
