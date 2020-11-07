export default function tBody(data, headings) {
  return (
    data[0] &&
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
  );
}
