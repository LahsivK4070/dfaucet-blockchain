import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet() {

  const [isDisabled, setDisbled] = useState(false);
  const [btnText, setText] = useState("Gimme gimme");

  async function handleClick(event) {
    setDisbled(true);

    // const authClient = await AuthClient.create();
    // const identity = await authClient.getIdentity();

    // const authenticatedCansister = createActor(canisterId, {
    //   agentOptions: {
    //     identity,
    //   },
    // });

    // const result = await authenticatedCansister.payOut();
    const result = await token.payOut();
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DVishal tokens here! Claim 10,000 DVIS tokens to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled = {isDisabled}>
          {btnText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
