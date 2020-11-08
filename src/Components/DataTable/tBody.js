export default function tBody(data, headings, actions) {
  let buttons = [];

  function setButtonsLabel() {
    if (actions && actions.actions) {
      actions.actions.map((a) => {
        if (a.isActive) {
          buttons.push(a);
        }
        return buttons;
      });
    }
  }

  setButtonsLabel();
  console.log("buttons", buttons);

  return data[0] ? (
    actions && buttons ? (
      data.map((column, index) => {
        return (
          <tr key={index}>
            {headings.length > 0 &&
              headings[0] &&
              headings.map((row, i) => {
                return <td key={i}>{column[row]}</td>;
              })}
            {buttons && buttons[0] && (
              <td className="tBody-action">
                {buttons &&
                  buttons[0] &&
                  buttons.map((aButtons, i) => {
                    return (
                      <button
                        onClick={
                          aButtons.callBack && ((e) => aButtons.callBack(e))
                        }
                        key={i}
                        className={`table-button ${
                          aButtons.class ? aButtons.class : ""
                        }`}
                        id={column.id ? column.id : column._id}
                      >
                        {aButtons.label ? aButtons.label : "No Label"}
                      </button>
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
          <tr key={index}>
            {headings.length > 0 &&
              headings[0] &&
              headings.map((row, i) => {
                return <td key={i}>{column[row]}</td>;
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
}
