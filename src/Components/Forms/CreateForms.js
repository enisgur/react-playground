import React, { useState, useEffect } from "react";

import "./style/style.css";

// TODO : DO Form Labels !

const CreateForms = ({ data }) => {
  const [isError, setIsError] = useState(false);
  const [isArray, setIsArray] = useState(null);
  const [formData, setFormData] = useState([]);
  const [readyData, setReadyData] = useState({}); //DO this one
  const [requiredInputs, setRequiredInputs] = useState([]);

  function error(msg) {
    console.log(msg);
  }

  useEffect(() => {
    function makeReadyData(data) {
      data.map((key, i) => {
        const k = Object.keys(key)[0];

        if (data[i][k].required) {
          setRequiredInputs((f) => {
            return [...f, k];
          });
        }

        return setReadyData((f) => {
          return {
            ...f,
            [k]: data[i][k].value,
          };
        });
      });
    }

    try {
      console.log(typeof data);
      if (Array.isArray(data)) {
        setIsArray(true);
        setFormData(data);
        makeReadyData(data);
        return;
      }
      if (typeof data === "object") {
        setIsArray(false);
        setFormData(data);
        console.log("YESSSSSSSSSSSSSS");
      } else {
        setIsError(true);
        error("Error: data should be array or object, check doc !");
      }
    } catch (err) {
      error("Error: effect[data] > makeReadyData");
    }

    return () => {
      setFormData([]);
      setReadyData({});
      setRequiredInputs([]);
    };
  }, [data]);

  useEffect(() => {
    // console.log(formData);
    // console.log("readyDATA : ", readyData);
    // console.log(requiredInputs);
    // console.log(readyData);
  }, [requiredInputs, readyData]);

  const onFormChange = (e, i, objectKey) => {
    try {
      let newArr = [...formData];
      newArr[i][objectKey].value = e.target.value;
      // console.log("newArrray :", newArr[i][objectKey].value);
      setFormData(newArr);
      setReadyData((f) => {
        return {
          ...f,
          [e.target.name]: e.target.value,
        };
      });
    } catch (err) {
      error("error CreateForm > onFormChange");
    }
  };

  const onChange = (e) => {
    try {
      setFormData((f) => {
        return {
          ...f,
          [e.target.name]: e.target.value,
        };
      });
    } catch (err) {
      error("Error CreateForm > onChange");
    }
  };

  const onFormSubmit = (e) => {
    function checkRequired() {
      let isError = false;
      requiredInputs.map((req) => {
        // console.log(readyData[req]);
        // console.log("testtt", readyData[req]);
        if (readyData[req] === null || readyData[req] === "") {
          return (isError = true);
        }
        return isError;
      });
      return isError;
    }
    try {
      e.preventDefault();
      const reqError = checkRequired();
      if (!reqError) {
        // Submit Success bellow !
        console.log("FormData: ", formData);
        console.log("readyData: ", readyData);
      } else {
        error("Plase fill required fields...");
      }
    } catch (err) {
      error("Error: formSubmit");
    }
  };

  try {
    if (isError) return null;

    if (!isArray) {
      return (
        <form onSubmit={(e) => onFormSubmit(e)}>
          {Object.keys(formData).map((key, i) => {
            return (
              <div key={i} className="form-group">
                <label htmlFor={key}>{key}</label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={(e) => onChange(e)}
                />
              </div>
            );
          })}
          <input
            type="submit"
            value="Submit"
            onSubmit={(e) => onFormSubmit(e)}
          />
        </form>
      );
    }

    return (
      <form onSubmit={(e) => onFormSubmit(e)}>
        {formData[0] &&
          formData.map((data, i) => {
            try {
              const objectKey = Object.keys(data);
              const inData = data[objectKey];
              const dataType = inData.type;
              const stateValue = formData[i][objectKey].value;

              if (dataType === "select") {
                return (
                  <div key={i} className="form-group">
                    <select
                      name={objectKey}
                      value={stateValue}
                      onChange={(e) => onFormChange(e, i, objectKey)}
                    >
                      {/* TODO : fix here later for label or default value for Select option */}
                      <option value="">Select</option>
                      {data[objectKey].options.map((option) => {
                        return (
                          <option key={option.label} value={option.value}>
                            {option.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              }
              if (dataType === "text") {
                return (
                  <div key={i} className="form-group">
                    <input
                      type="text"
                      name={objectKey}
                      required={formData[i][objectKey].required}
                      value={formData[i][objectKey].value}
                      onChange={(e) => onFormChange(e, i, objectKey)}
                    />
                  </div>
                );
              }
              return null;
            } catch (err) {
              error("Error: CreateForm > render return");
              return null;
            }
          })}
        <input type="submit" value="Submit" onSubmit={(e) => onFormSubmit(e)} />
      </form>
    );
  } catch (err) {
    error("Error: component return > CreateFroms");
    // return <div>Error on component return</div>;
    return null;
  }
};

export default CreateForms;
