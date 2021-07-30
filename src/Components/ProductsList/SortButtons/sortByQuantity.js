const sortByQuantity = (state) => {
  const currentCount = state.map((x) => x.count);
  let sortedCount = [...state].sort((a, b) => a.count - b.count);
  sortedCount = sortedCount.map((x) => x.count);
  const sort = () => {
    return state.sort((a, b) => a.count - b.count);
  };
  const reverseSort = () => {
    return state.sort((a, b) => b.count - a.count);
  };
  if (currentCount.toString() !== sortedCount.toString()) {
    return sort();
  }
  return reverseSort();
};

export default sortByQuantity;
