export const updateSearchParams = (searchParams, setSearchParams, params) => {
  const newSearchParams = new URLSearchParams(searchParams);
  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newSearchParams.delete(key);
    } else if (Array.isArray(value)) {
      newSearchParams.delete(key);
      Object.values(value).forEach((part) => {
        newSearchParams.append(key, part);
      });
    } else {
      newSearchParams.set(key, value);
    }
  });
  return setSearchParams(newSearchParams);
};