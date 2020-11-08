export default function tBody(
  data,
  headings,
  actions,
  isManualHeading,
  renderManualHeading
) {
  let buttons = [];

  function setButtonsLabel() {
    try {
      if (actions && actions.actions) {
        actions.actions.map((a) => {
          if (a.isActive) {
            buttons.push(a);
          }
          return buttons;
        });
      }
    } catch (err) {
      console.log("Set Buttons Label Error on tBody : ", err);
      return buttons;
    }
  }

  setButtonsLabel();

  try {
    return data[0] ? (
      actions && buttons ? (
        data.map((column, index) => {
          return (
            <tr key={column.id ? column.id : column._id ? column._id : index}>
              {isManualHeading
                ? renderManualHeading.length > 0 &&
                  renderManualHeading[0] &&
                  renderManualHeading.map((row, i) => {
                    return (
                      <td
                        key={
                          column[row.id]
                            ? column[row.id]
                            : column[row._id]
                            ? column[row._id]
                            : i
                        }
                      >
                        {column[row.data]}
                      </td>
                    );
                  })
                : headings.length > 0 &&
                  headings[0] &&
                  headings.map((row, i) => {
                    return (
                      <td
                        key={
                          column[row.id]
                            ? column[row.id]
                            : column[row._id]
                            ? column[row._id]
                            : i
                        }
                      >
                        {column[row]}
                      </td>
                    );
                  })}

              {buttons && buttons[0] && (
                <td className="tBody-action">
                  {buttons &&
                    buttons[0] &&
                    buttons.map((aButtons, i) => {
                      return (
                        <>
                          <button
                            onClick={
                              aButtons.callBack && ((e) => aButtons.callBack(e))
                            }
                            key={
                              aButtons.id
                                ? aButtons.id
                                : aButtons._id
                                ? aButtons._id
                                : i
                            }
                            className={`table-button ${
                              aButtons.class ? aButtons.class : ""
                            }`}
                            id={column.id ? column.id : column._id}
                          >
                            {aButtons.label ? aButtons.label : "No Label"}
                          </button>
                        </>
                      );
                    })}
                </td>
              )}
            </tr>
          );
        })
      ) : (
        data.map((column, index) => {
          return (
            <tr key={column.id ? column.id : column._id ? column._id : index}>
              {isManualHeading
                ? renderManualHeading.length > 0 &&
                  renderManualHeading[0] &&
                  renderManualHeading.map((row, i) => {
                    return (
                      <td
                        key={
                          column[row.id]
                            ? column[row.id]
                            : column[row._id]
                            ? column[row._id]
                            : i
                        }
                      >
                        {column[row.data]}
                      </td>
                    );
                  })
                : headings.length > 0 &&
                  headings[0] &&
                  headings.map((row, i) => {
                    return (
                      <td
                        key={
                          column[row.id]
                            ? column[row.id]
                            : column[row._id]
                            ? column[row._id]
                            : i
                        }
                      >
                        {column[row]}
                      </td>
                    );
                  })}
            </tr>
          );
        })
      )
    ) : (
      <tr className="no-data">
        <td>No Data..</td>
      </tr>
    );
  } catch (err) {
    return <div>Table body Error</div>;
  }
}
