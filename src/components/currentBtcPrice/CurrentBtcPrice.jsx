import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import "./CurrentBtcPrice.css";
import btcImage from "../../images/btc.png";
import { Box } from "@material-ui/core";

const CurrentBtcPrice = () => {
  const socketUrl = `wss://wstest.fxempire.com?token=btctothemoon`;
  const [data, setData] = useState({
    lastUpdate: "",
    last: 0,
    change: 0,
    percentChange: 0,
    open: 0,
  });
  useEffect(() => {
    const subscribe = { type: "SUBSCRIBE", instruments: ["cc-btc-usd-cccagg"] };
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log(response["cc-btc-usd-cccagg"]);
      setData({
        lastUpdate: response["cc-btc-usd-cccagg"].tickTime,
        last: response["cc-btc-usd-cccagg"].last,
        change: response["cc-btc-usd-cccagg"].change,
        percentChange: response["cc-btc-usd-cccagg"].percentChange,
        open: response["cc-btc-usd-cccagg"].open,
      });
    };

    const unSubscribe = {
      type: "UNSUBSCRIBE",
      instruments: ["cc-btc-usd-cccagg"],
    };
    ws.onclose = () => {
      ws.send(JSON.stringify(unSubscribe));
    };
  }, []);

  return (
    <div className="container">
      <Paper className="paper" elevation={16}>
        <div className="HeaderAndDate">
          <Box className="boxHeader">
            <img src={btcImage} alt="BTC" />
            <h2>
              <strong>BITCOIN</strong>
            </h2>
          </Box>
          <h4 className='DateUpdated'> {data.lastUpdate}</h4>
        </div>
        <Box className="details">
          {data.lastUpdate ? (
            <>
              <div className="lastPrice">
                <h1> {data.last}$</h1>
              </div>
              <div className="change">
                <h5>Change: {data.change.toString().slice(0, 9)} $</h5>
                <h5>
                  {`${
                    data.percentChange > 0
                      ? `(+${data.percentChange})%`
                      : `(-${data.percentChange})%`
                  }`}{" "}
                </h5>
                <>
                  {data.last > data.open ? (
                    <h5>Btc is trading Higher today.</h5>
                  ) : (
                    <h5>Btc is trading Lower today.</h5>
                  )}
                </>
              </div>
            </>
          ) : (
            <img
              className="loader"
              src="https://cdn-images-1.medium.com/max/800/0*4Gzjgh9Y7Gu8KEtZ.gif"
              alt="Loading..."
            />
          )}
        </Box>
      </Paper>
    </div>
  );
};

export default CurrentBtcPrice;
