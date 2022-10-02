import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Modal() {
  const isLoading = useSelector((state) => state.util.loading);
  const isError = useSelector((state) => state.util.errors);
  const isSucceed = useSelector((state) => state.util.success);

  const nav = useNavigate();

  const [errorOpen, setErrorOpen] = useState(false);
  const [succeedOpen, setSucceedOpen] = useState(false);

  useEffect(() => {
    if (isError) setErrorOpen(true);
  }, [isError]);
  useEffect(() => {
    if (isSucceed) setSucceedOpen(true);
  }, [isSucceed]);

  if (isLoading)
    return (
      <div className="modal">
        <h1>LOADING...</h1>
      </div>
    );

  if (errorOpen) {
    return (
      <div className="modal modal-result error flex-center-center-column ">
        <h2>ERROR!</h2>
        <h4>{isError.message}</h4>
        <button onClick={(e) => setErrorOpen(false)}>OK</button>
      </div>
    );
  }
  if (succeedOpen) {
    return (
      <div className="modal modal-result success flex-center-center-column ">
        <h2>SUCCESS!</h2>
        <h4>{isSucceed.message}</h4>
        <button
          onClick={(e) => {
            setSucceedOpen(false);
            nav(0);
          }}
        >
          OK
        </button>
      </div>
    );
  }
}

export default Modal;
