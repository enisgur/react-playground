import React from "react";

import CreateForms from "../../Components/Forms/CreateForms";

const styles = {
  position: "relative",
  width: "300px",
  height: "600px",
  backgroundColor: "red",
};

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
        label: "ID",
        type: "text",
        value: "id",
      },
    },
    {
      password: {
        label: "Pass",
        type: "password",
        value: "password",
        minLength: 6,
      },
    },
    {
      email: {
        // label: "E-Mail",
        type: "email",
        value: "email",
      },
    },
    {
      age: {
        type: "date",
        value: "",
        required: true,
      },
    },
    {
      note: {
        type: "textarea",
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

  const formDatas20 = [
    {
      id: {
        label: "ID",
        type: "text",
        value: "id",
      },
    },
    {
      password: {
        label: "Pass",
        type: "password",
        value: "password",
        minLength: 6,
      },
    },
  ];

  const formDatas21 = [
    {
      name: {
        label: "name",
        type: "text",
        value: "name",
      },
    },
    {
      note: {
        label: "Pass",
        type: "textarea",
        value: "note",
        minLength: 6,
      },
    },
  ];

  return (
    <div>
      <h1>Forms</h1>
      <div>
        <CreateForms data={formDatas10} />
        {/* <CreateForms data={[formDatas20, formDatas21]} /> */}
      </div>
    </div>
  );
};

export default Forms;
