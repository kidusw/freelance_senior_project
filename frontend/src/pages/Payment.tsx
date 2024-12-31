import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import apiClient from "../utils/apiClient";
import CustomAlert from "../components/CustomeAler";
import ShortUUID from "short-uuid";

interface Order {
  gigId: string;
  img?: string;
  title: string;
  price: number;
  sellerId: string;
  buyerId: string;
  isCompleted?: boolean;
  payment_intent: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string;
}

const Payment = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState<number>(0);
  const [firstName, setFname] = useState<string>("");
  const [lastName, setLname] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setIsError] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);

  //generate unique id for the transaction
  const translator = ShortUUID();
  const shortId = translator.new();
  console.log(shortId);

  const tx_ref = `${firstName}-tx-${shortId}`;
  const public_key = "CHAPUBK_TEST-Jrv6vAZAXocNUS4HEXZKh4bYH7Km701d";

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
      setRedirect(true);
      console.log("payment data:", response.data);
    } catch (error: any) {
      showAlert("Payment unsuccessful", true);
      console.log(error.response?.data);
    }
  };
  console.log(phone);
  console.log(email);
  return (
    <div className="flex flex-col max-w-[700px] mx-auto justify-between">
      {/* {alertVisible && (
        <CustomAlert
          message={alertMessage}
          isError={error}
          // onClose={() => setAlertVisible(false)}
        />
      )} */}
      <h2 className="text-center text-4xl mt-8 uppercase underline">
        Payment Page
      </h2>
      <p className="my-4 text-xl text-red-400">
        Please Take Schreenshot of your chapa{" "}
        <b className="font-normal text-2xl text-red-700">receipt</b>
      </p>
      <form onSubmit={handleSubmit} className="font-[sans-serif]">
        <div className=" p-4 shadow-2xl shadow-black broder border-2 border-gray-300 rounded-lg flex flex-col gap-y-3">
          <label htmlFor="first_name">First Name </label>
          <input
            className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            type="text"
            name="first_name"
            value={firstName}
            placeholder="First Name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFname(e.target.value)
            }
          />
          <label htmlFor="last_name">Last Name</label>
          <input
            className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            type="text"
            name="last_name"
            // pattern="Last Name"
            value={lastName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLname(e.target.value)
            }
          />
          <label htmlFor="email">Email</label>
          <input
            className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <div></div>
          <input
            className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            placeholder="Amout"
            type="hidden"
            disabled
            name="amount"
            value={amount}
          />
          <h3 className="font-ligth text-2xl "> PRICE: {amount} BIRR</h3>

          <input
            type="hidden"
            name="return_url"
            value="http://localhost:5173/success"
          />
          {!redirect && (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Initialize payment
            </button>
          )}
        </div>
      </form>
      {redirect && (
        <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input type="hidden" name="public_key" value={public_key} />
            <input type="hidden" name="tx_ref" value={tx_ref} />
            <input type="hidden" name="currency" value="ETB" />
            <input type="hidden" name="amount" value={amount} />
            <input type="hidden" name="currency" value="ETB" />
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="first_name" value={firstName} />
            <input type="hidden" name="last_name" value={lastName} />
          </div>
          <button type="submit">Go to chapa</button>
        </form>
      )}
    </div>
  );
};

export default Payment;

// <form onSubmit={handleSubmit}>
//   <div>
//     <label>Phone Number:</label>
//     <input
//       type="tel"
//       name="phone_number"
//       onChange={(e: any) => setPhone(e.target.value)}
//       required
//     />
//   </div>
//   <div>
//     <label>Amount (ETB):</label>
//     <input type="number" value={amount} disabled name="amount" />
//   </div>
//   <div>
//     <label>Email :</label>
//     <input
//       type="email"
//       value={email}
//       name="email"
//       onChange={(e: any) => setEmail(e.target.value)}
//       required
//     />
//   </div>
//   <button type="submit">Make Payment</button>
// </form>;
