import { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import apiClient from "../utils/apiClient";
import CustomAlert from "../components/CustomeAler";

interface Order {
  gigId: string; // required
  img?: string; // optional
  title: string; // required
  price: number; // required
  sellerId: string; // required
  buyerId: string; // required
  isCompleted?: boolean; // optional, default is false
  payment_intent: string; // required
  createdAt?: Date; // optional, included by timestamps
  updatedAt?: Date; // optional, included by timestamps
  _id: string;
}

const Payment = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setIsError] = useState<boolean>(false);

  const showAlert = (message: string, isError: boolean) => {
    setAlertMessage(message);
    setIsError(isError);
    setAlertVisible(true);

    setTimeout(() => setAlertVisible(false), 3000);
  };
  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await apiClient.get<Order[]>(`/orders/single/${id}`);
        console.log(res.data);
        setAmount(res.data[0].price);
      } catch (error: any) {
        console.error(
          "Error initializing payment:",
          error.response?.data || error.message
        );
      }
    };
    getOrder();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // if (!phone || !email || amount)
      //   return (
      //     <CustomAlert
      //       message={"proivde all the necessary fields!"}
      //       isError={error}
      //     />
      //   );
      const response = await apiClient.post(`/orders/payment/${id}`, {
        user_phone: phone,
        user_email: email,
        paid_amount: amount,
      });
      showAlert("Payment succssesful", false);
      console.log("payment data:", response.data);
    } catch (error: any) {
      showAlert("Payment unsuccessful", true);
      console.log(error.response?.data);
    }
  };
  console.log(phone);
  console.log(email);
  return (
    <div className="">
      {alertVisible && (
        <CustomAlert
          message={alertMessage}
          isError={error}
          // onClose={() => setAlertVisible(false)}
        />
      )}
      <h2>Payment Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone_number"
            onChange={(e: any) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount (ETB):</label>
          <input type="number" value={amount} disabled name="amount" />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Make Payment</button>
      </form>
    </div>
  );
};

export default Payment;
