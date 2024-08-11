// export function formatTrinn(trinnArray: string[]): string {
//   const sortedTrinn = trinnArray
//     .map((trinn) => parseInt(trinn.split(".")[0], 10))
//     .sort((a, b) => a - b);

//   const result: string[] = [];

//   for (let i = 0; i < sortedTrinn.length; i++) {
//     const start = sortedTrinn[i];
//     let end = start;

//     while (i < sortedTrinn.length - 1 && sortedTrinn[i + 1] === end + 1) {
//       end = sortedTrinn[++i];
//     }

//     if (start === end) {
//       result.push(`${start}. trinn`);
//     } else {
//       result.push(`${start}. - ${end}. trinn`);
//     }
//   }

//   return result.join(" & ");
// }

export function formatTrinn(trinnArray: number[]): string {
  if (!trinnArray || trinnArray.length === 0) {
    return "Alle trinn";
  }
  if (trinnArray.length === 1) {
    return `${trinnArray[0]}. trinn`;
  }

  const sortedTrinn = trinnArray.sort((a, b) => a - b);

  const result: string[] = [];

  for (let i = 0; i < sortedTrinn.length; i++) {
    const start = sortedTrinn[i];
    let end = start;

    while (i < sortedTrinn.length - 1 && sortedTrinn[i + 1] === end + 1) {
      end = sortedTrinn[++i];
    }

    if (start === end) {
      result.push(`${start}. trinn`);
    } else {
      result.push(`${start}. - ${end}. trinn`);
    }
  }

  return result.join(" & ");
}

// const trinnArray: number[] = [2, 3, 4]; // Example data
// console.log(formatTrinn(trinnArray));
