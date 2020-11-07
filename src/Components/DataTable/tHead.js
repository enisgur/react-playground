export default function tHead(headings, headClicked) {
  return headings.map((head, i) => {
    return (
      <th onClick={(e) => headClicked(e)} id={head} key={i}>
        {strUpperCaseFirstChar(head)}
      </th>
    );
  });
}

function strUpperCaseFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
