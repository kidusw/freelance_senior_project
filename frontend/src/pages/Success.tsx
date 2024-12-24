import React, { useEffect } from "react";
import apiClient from "../utils/apiClient";

const token = "CHASECK_TEST-Vcd2LS2HYsdrfDU00Lr1jh2mc9pbhunw";

const Success = () => {
  return (
    <div className="my-40">
      <form
        action="https://api.chapa.co/v1/transaction/verify/jack-tx-22122024"
        method="get"
      >
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Success;
