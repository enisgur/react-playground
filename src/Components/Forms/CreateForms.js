import React, { useState, useEffect } from "react";

// TODO : Set new State to make nice formData only
// no need extra info such as: options, type, array , etc..

const CreateForms = ({ data }) => {
  const [formData, setFormData] = useState([]);
  // const [readyData, setReadyData] = useState({}); //DO this one

  useEffect(() => {
    setFormData(data);

    return () => {
      setFormData([]);
    };
  }, [data]);

  useEffect(() => {
    // console.log(formData);
  }, [formData]);

  const onFormChange = (e, i, objectKey) => {
    try {
      let newArr = [...formData];
      newArr[i][objectKey].value = e.target.value;
      // console.log("newArrray :", newArr[i][objectKey].value);
      setFormData(newArr);
    } catch (err) {
      console.log("error CreateForm > onFormChange");
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={(e) => onFormSubmit(e)}>
      {formData[0] &&
        formData.map((data, i) => {
          try {
            const objectKey = Object.keys(data);
            const inData = data[objectKey];
            const dataType = inData.type;
            //   const dataValue = inData.value;
            //   state Values
            const stateValue = formData[i][objectKey].value;
            //   console.log(dataType, dataValue);
            //   console.log(formData[i][objectKey]);
            //   console.log(data[objectKey].options);

            if (dataType === "select") {
              return (
                <select
                  key={i}
                  name={objectKey}
                  value={stateValue}
                  onChange={(e) => onFormChange(e, i, objectKey)}
                >
                  {data[objectKey].options.map((option) => {
                    return (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
              );
            }
            if (dataType === "text") {
              return (
                <input
                  key={i}
                  type="text"
                  name={objectKey}
                  value={formData[i][objectKey].value}
                  onChange={(e) => onFormChange(e, i, objectKey)}
                />
              );
            }
          } catch (err) {
            console.log("Error: CreateForm > render return");
          }
        })}
      <input type="submit" value="Submit" onSubmit={(e) => onFormSubmit(e)} />
    </form>
  );
};

export default CreateForms;
