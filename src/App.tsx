import React from "react";
import Home from "./pages/Home/Home";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/store-hooks";
import Toast from "./Toast/Toast";
import { customAlert } from "./store/reducers/tableSlice";

function App() {
  const alert = useAppSelector((state) => state.apis.alert);
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <Home />
      {alert.isVisible && (
        <Toast
          message={alert.message}
          onRequestClose={() =>
            dispatch(customAlert({ isVisible: false, message: "" }))
          }
        />
      )}
    </div>
  );
}

export default App;
