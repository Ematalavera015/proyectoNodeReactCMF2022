const orders = [
  {
    orderItems: [
      {
        name: "Orden 1",
        qty: 1,
        image: "URL de la imagen",
        price: 200,
      },
      {
        name: "Orden 2",
        qty: 3,
        image: "URL de la imagen",
        price: 100,
      },
    ],
    shippingAddress: {
      address: "Altus Comederus",
      city: "Jujuy",
      postalCode: "4600",
      country: "Argentina",
    },
    paymentMethod: "FIADO",
    taxPrice: 500,
    shippingPrice: 1000,
    totalPrice: 1500,
    isPaid: false,
    isDelivered: false,
  },
];

export default orders;
