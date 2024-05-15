export const getUniqueData = (data, property) => {
  let newVal = data.map((currentElement) => {
    return currentElement[property];
  });
  return (newVal = ["All", ...new Set(newVal)]);
};
