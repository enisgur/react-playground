function removeItem(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export async function checkHeadings(checkDatas, hide) {
  let checkHeadings = [];
  checkDatas.map((checkData) => {
    // all keys from each data
    let keys = Object.keys(checkData);

    //   Check keys and if its not in array push it
    // That way we will add all keys as a header
    // if json data has some different keys it will include all
    keys.map((checkKeys) => {
      !checkHeadings.includes(checkKeys) && checkHeadings.push(checkKeys);

      if (typeof hide === "object") {
        hide.map((hideHeader) => {
          return (
            checkHeadings.includes(hideHeader) &&
            removeItem(checkHeadings, hideHeader)
          );
        });

        // return checkKeys;
      }
      if (typeof hide === "string") {
        checkHeadings.includes(hide) && removeItem(checkHeadings, hide);
        // return checkKeys;
      }
      return checkKeys;
    });
    return keys;
  });
  return checkHeadings;
}

// FOR MANUEL HEADING SETUP

export async function setManualHeadings(manuealHead) {
  let manuelArray = [];
  if (manuealHead.length > 0) {
    manuealHead.map((head) => {
      // setRenderManuelHeading((f) => [...f, head]);
      return manuelArray.push(head);
    });
    return manuelArray;
  }

  return manuelArray;
  // setIsManualHeading(true);
}

// export default async function checkHeadings(checkDatas, hide) {
//   let checkHeadings = [];
//   checkDatas.map((checkData) => {
//     // all keys from each data
//     let keys = Object.keys(checkData);

//     //   Check keys and if its not in array push it
//     // That way we will add all keys as a header
//     // if json data has some different keys it will include all
//     keys.map((checkKeys) => {
//       !checkHeadings.includes(checkKeys) && checkHeadings.push(checkKeys);
//       checkHeadings.includes(hide) && removeItem(checkHeadings, hide);
//       return checkKeys;
//     });
//     return keys;
//   });
//   return checkHeadings;
// }

// function removeItem(arr, value) {
//   var index = arr.indexOf(value);
//   if (index > -1) {
//     arr.splice(index, 1);
//   }
//   return arr;
// }
