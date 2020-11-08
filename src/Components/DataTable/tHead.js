export default function tHead(
  headings,
  headClicked,
  actions,
  isManualHeading,
  renderManualHeading
) {
  try {
    return actions && actions.actions ? (
      <>
        {isManualHeading
          ? renderManualHeading.map((head, i) => {
              return (
                <th
                  onClick={(e) => headClicked(e)}
                  id={head.data}
                  key={head.id ? head.id : head._id ? head._id : i}
                >
                  {strUpperCaseFirstChar(head.label)}
                </th>
              );
            })
          : headings.map((head, i) => {
              return (
                <th
                  onClick={(e) => headClicked(e)}
                  id={head}
                  key={head.id ? head.id : head._id ? head._id : i}
                >
                  {strUpperCaseFirstChar(head)}
                </th>
              );
            })}

        <th className="tHead-actions">Actions</th>
      </>
    ) : isManualHeading ? (
      renderManualHeading.map((head, i) => {
        return (
          <th
            onClick={(e) => headClicked(e)}
            id={head.data}
            key={head.id ? head.id : head._id ? head._id : i}
          >
            {strUpperCaseFirstChar(head.label)}
          </th>
        );
      })
    ) : (
      headings.map((head, i) => {
        return (
          <th
            onClick={(e) => headClicked(e)}
            id={i}
            key={head.id ? head.id : head._id ? head._id : i}
          >
            {strUpperCaseFirstChar(head)}
          </th>
        );
      })
    );
  } catch (err) {
    return <div>Header Error</div>;
  }
}

function strUpperCaseFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
