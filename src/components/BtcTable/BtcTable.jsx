import React, { useState } from "react";
import MaterialTable from "material-table";
import "./BtcTable.css";

const BtcTable = ({ btcData }) => {
  const columns = [
    {
      title: "Date",
      field: "Date",
    },
    {
      title: "Close",
      field: "Close",
    },
    {
      title: "Open",
      field: "Open",
    },
    {
      title: "High",
      field: "High",
    },
    {
      title: "Low",
      field: "Low",
    },
    {
      title: "Volume",
      field: "Volume",
    },
  ];
  const [columnsTable, setColumnsTable] = useState(columns);

  return (
    <div className="table">
      <MaterialTable title="BTC Data" data={btcData} columns={columnsTable} />
    </div>
  );
};

export default BtcTable;
