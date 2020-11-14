import React from "react";

import CreateForms from "../../Components/Forms/CreateForms";

const Forms = () => {
  const formData = {
    id: 20,
    name: "Enis",
    age: 35,
    note:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates possimus, asperiores deleniti ipsam ducimus provident laudantium, rerum pariatur ratione est dolorum minus architecto voluptatum. Nobis aliquid iure accusamus porro earum?",
  };

  const formDatas10 = [
    {
      id: {
        type: "text",
        value: "id",
      },
    },
    {
      name: {
        type: "text",
        value: "name",
      },
    },
    {
      age: {
        type: "text",
        value: "age",
      },
    },
    {
      note: {
        type: "text",
        value: "note",
      },
    },
    {
      customer: {
        type: "select",
        value: "",
        options: [
          { label: "test1", value: "123" },
          { label: "zaaa", value: "zaza" },
        ],
      },
    },
  ];

  return (
    <div>
      <h1>Forms</h1>
      <CreateForms data={formDatas10} />
    </div>
  );
};

export default Forms;
