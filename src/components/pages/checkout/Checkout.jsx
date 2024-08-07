import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from "../../../firebaseconfig";

export const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);

  const [orderId, setOrderId] = useState(null);

  let total = getTotalPrice();

  const [info, setInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let obj = {
      buyer: info,
      items: cart,
      total: total,
    };

    let ordersCollection = collection(db, "orders");
    addDoc(ordersCollection, obj)
      .then((res) => setOrderId(res.id))
      .catch((error) => console.log(error));

    cart.forEach((product) => {
      let refDoc = doc(db, "products", product.id);
      updateDoc(refDoc, { stock: product.stock - product.quantity });
    });

    clearCart();
  };

  return (
    <div style={{ padding: "100px" }}>
      {orderId ? (
        <h1>su id es: {orderId} </h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            type="text"
            label="Nombre"
            onChange={handleChange}
            name="name"
          />
          <TextField
            variant="outlined"
            type="text"
            label="Telefono"
            onChange={handleChange}
            name="phone"
          />
          <TextField
            variant="outlined"
            type="text"
            label="Email"
            onChange={handleChange}
            name="email"
          />
          <Button variant="contained" type="submit">
            enviar
          </Button>
        </form>
      )}
    </div>
  );
};