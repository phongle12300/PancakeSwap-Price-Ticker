import React, { useEffect, useState } from "react";
import firebase from "firebase";
import firebaseConfigJSON from './firebaseConfig.json';

// Components
import Ticker from "./Ticker";

// Initialize Firebase
const firebaseConfig = firebaseConfigJSON

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  var db = firebase.firestore();
  const [tickerData, setTickerData] = useState({
    name: "",
    symbol: "",
    price: 0.0,
  });

  useEffect(() => {
    // Get Pair data
    db.collection("tickers").doc("CAKE-BUSD")
    .onSnapshot((doc) => {
        setTickerData(doc.data())
        // console.log("Current data: ", doc.data());
    });
  }, []);
  return (
    <div>
      <Ticker tickerData={tickerData}></Ticker>
    </div>
  );
}
