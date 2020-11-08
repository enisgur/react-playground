import React from "react";

import DataTable from "../../Components/DataTable";

const Table = () => {
  const testData = [
    { name: "Enis", email: "test@test.com" },
    { name: "Enis", email: "test@test.com" },
    { name: "Enis", email: "test@test.com" },
    { name: "Enis", email: "test@test.com" },
  ];

  const actions = {
    actions: [
      {
        isActive: true,
        label: "edit",
        class: "edit",
        callBack: (e) => {
          console.log("Clicked", e.target.id);
        },
        id: "ppp4",
      },
      { isActive: true, label: "delete", class: "delete", id: "ppp2" },
    ],
  };

  const manuelHeadings = [
    { label: "Gender", data: "gender", id: "asd212" },
    { label: "First", data: "first_name", id: "gkas5t" },
    { label: "last name", data: "last_name", id: "asdjlkj63" },
  ];

  return (
    <div>
      <DataTable
        tableData="https://api.mocki.io/v1/3c79305f"
        hide={["id", "email", "last_name"]}
        searchable
        actions={actions}
        manualHeadings={manuelHeadings}
        // limitPage={20} // default = 10 you dont need to spesify it !
      />
      <DataTable
        tableData={testData}
        hide="id"
        // actions={{ actions: [{ isActive: true, label: "test" }] }}
      />
    </div>
  );
};

export default Table;

//   https://api.mocki.io/v1/3c79305f

//  on Data need to have "id" or "_id" => to get id of clicked header => check tBody Line(37)

// if you set manuel heading => you dont need hide because it will only show what is the manuel one => automatcly hides the other headers
