import React, { useState, useEffect } from "react";
import axios from "axios";
import BtcChart from "../BtcChart/BtcChart";
import BtcTable from "../BtcTable/BtcTable";
import CurrentBtcPrice from "../currentBtcPrice/CurrentBtcPrice";
import Link from "@material-ui/core/Link";
import "./Main.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Main = () => {
  //Fetching all the data
  const [btcData, setBtcData] = useState([]);
  const [errorHandler, setErrorHandler] = useState("");
  const [renderChart, setrenderChart] = useState(false);
  const [renderHistory, setRenderHistory] = useState(false);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //Render chart/history table

  const renderChartComp = () => {
    setrenderChart(true);
    setRenderHistory(false);
  };

  const renderHisotryComp = () => {
    setRenderHistory(true);
    setrenderChart(false);
  };

  //By Wanted minutes nubmer (its gonna be 1 or 5).
  const fetchPriceByMinute = async (number) => {
    try {
      const baseUrl = `https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histominute?aggregate=${number}&e=CCCAGG&fsym=BTC&tsym=usd&limit=30`;
      const { data } = await axios.get(baseUrl, config);
      setBtcData(data.data);
    } catch (error) {
      setErrorHandler(error);
    }
  };

  //By the Hour
  const fetchPriceByHour = async () => {
    try {
      const baseUrl = `https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histohour?aggregate=1&e=CCCAGG&fsym=BTC&tsym=usd&limit=30`;
      const { data } = await axios.get(baseUrl, config);
      setBtcData(data.data);
    } catch (error) {
      setErrorHandler(error);
    }
  };
  // By the week
  const fetchPriceByWeek = async () => {
    try {
      const baseUrl = `https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histoday?aggregate=7&e=CCCAGG&fsym=BTC&tsym=usd`;
      const { data } = await axios.get(baseUrl, config);
      setBtcData(data.data);
    } catch (error) {
      setErrorHandler(error);
    }
  };

  const handleFetchDataOneMinute = () => {
    fetchPriceByMinute(1);
  };

  const handleFetchDataFiveMinutes = () => {
    fetchPriceByMinute(5);
  };

  const handleFetchDataHourly = () => {
    fetchPriceByHour();
  };

  const handleFetchDataWeekly = () => {
    fetchPriceByWeek();
  };

  //So i will have data initialez at comp renders, I useEffect 5 minutes chart
  useEffect(() => {
    fetchPriceByMinute(5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <>
        <CurrentBtcPrice />
        <div className='renderComponets'>
          <Tab className='tabs' onClick={renderChartComp} label="History" />
          <Tab className='tabs' onClick={renderHisotryComp} label="Chart" />
          <hr />
        </div>
          <div className="tabs">
          <Tabs aria-label="basic tabs example">
            <Tab className='tabs' onClick={handleFetchDataOneMinute} label="One Minute" />
            <Tab className='tabs' onClick={handleFetchDataFiveMinutes} label="Five Minutes" />
            <Tab className='tabs' onClick={handleFetchDataHourly} label="One Hour" />
            <Tab className='tabs' onClick={handleFetchDataWeekly} label="One Week" />
          </Tabs>
          </div>
        <hr />
        {!renderChart ? (
          <BtcChart btcData={btcData} />
        ) : (
          <BtcTable btcData={btcData} />
        )}
      </>
    </div>
  );
};

export default Main;
