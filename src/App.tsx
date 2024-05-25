import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
function App() {
  const [currencyValue, setCurrencyValue] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(0);

  //fetching data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      await axios
        .get(
          `https://api.frankfurter.app/latest?amount=${currencyValue}&from=${fromCurrency}&to=${toCurrency}`
        )
        .then((res) => {
          /*  const rates = res.data.rates;
        const keys = Object.keys(rates);
        console.log(rates[keys[0]]); */

          setResult(res.data.rates[toCurrency]);
        })
        .catch((error: Error) => {
          console.log("error fetching data : " + error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if (fromCurrency === toCurrency) {
      setResult(currencyValue);
      return;
    }

    fetchData();
  }, [currencyValue, toCurrency, fromCurrency]);

  return (
    <>
      <div style={{ gap: 4, fontSize: 22 }}>
        <input
          title="curr-value"
          type="text"
          value={currencyValue}
          onChange={(e) => setCurrencyValue(Number(e.target.value) || 0)}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>

        {loading ? (
          <Loading />
        ) : (
          <>
            <p style={{ fontSize: 14, margin: 1 }}>
              {fromCurrency} : {currencyValue}
            </p>
            <p style={{ fontSize: 14, margin: 1 }}> IS</p>
            <p>
              {toCurrency} : {result}
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default App;

function Loading() {
  return <p style={{ fontSize: 23 }}>Loading...</p>;
}
