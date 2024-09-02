interface formatTrinnProps {
  trinn: number[] | undefined;
}

export const formatTrinn = ({ trinn }: formatTrinnProps): string => {
  if (!trinn || trinn.length === 0) {
    return "Alle trinn";
  }

  // Sort the array to handle ranges correctly
  trinn.sort((a, b) => a - b);

  if (trinn.length === 1) {
    return `${trinn[0]}. trinn`;
  }

  let result = "";
  let rangeStart = trinn[0];
  let rangeEnd = trinn[0];

  for (let i = 1; i < trinn.length; i++) {
    if (trinn[i] === rangeEnd + 1) {
      rangeEnd = trinn[i];
    } else {
      if (rangeStart === rangeEnd) {
        result += `${rangeStart}. & `;
      } else {
        result += `${rangeStart}. - ${rangeEnd}. & `;
      }
      rangeStart = trinn[i];
      rangeEnd = trinn[i];
    }
  }

  if (rangeStart === rangeEnd) {
    result += `${rangeStart}. trinn`;
  } else {
    result += `${rangeStart}. - ${rangeEnd}. trinn`;
  }

  // Remove the trailing " & " if it exists
  result = result.replace(/ & $/, "");

  return result;
};
