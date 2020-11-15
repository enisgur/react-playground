import React from "react";

import CreateForms from "../../Components/Forms/CreateForms";

// TODO : DO form Labels !

const Forms = () => {
  // bellow creates only input["text"]
  const formData = {
    id: 20,
    name: "Enis",
    age: 35,
    note:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates possimus, asperiores deleniti ipsam ducimus provident laudantium, rerum pariatur ratione est dolorum minus architecto voluptatum. Nobis aliquid iure accusamus porro earum?",
  };

  // bellow create advance
  const formDatas10 = [
    {
      id: {
        // label:"ID" // add label for label for input
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
        required: true,
      },
    },
    {
      note: {
        type: "text",
        value: "note",
        required: true,
      },
    },
    {
      customer: {
        type: "select",
        value: "",
        required: true,
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
