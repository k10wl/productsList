const sortByName = (state) => {
  const currentNames = state.map((x) => x.name.toUpperCase());
  let sortedNames = [...state].sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  sortedNames = sortedNames.map((x) => x.name.toUpperCase());
  const sort = () => {
    return state.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  };
  const reverseSort = () => {
    return state.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    });
  };
  if (currentNames.join() !== sortedNames.join()) {
    return sort();
  }
  return reverseSort();
};

export default sortByName;
