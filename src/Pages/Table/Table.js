import React from "react";

import DataTable from "../../Components/DataTable";

const Table = () => {
  const testData = [
    { name: "Enis", email: "test@test.com" },
    { name: "Enis", email: "test@test.com" },
    { name: "Enis", email: "test@test.com" },
    { name: "Enis", email: "test@test.com" },
    { name: "Enis", email: "test@test.com", id: 1 },
  ];

  return (
    <div>
      <DataTable
        tableData="https://api.mocki.io/v1/3c79305f"
        hide={["id", "email", "last_name"]}
      />
      <DataTable tableData={testData} hide="id" />
    </div>
  );
};

export default Table;

//   https://api.mocki.io/v1/3c79305f
