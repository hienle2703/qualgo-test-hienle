const debounce = (func: any, wait: number) => {
  let timeout: NodeJS.Timeout | null;

  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(null, args);
    }, wait);
  };
};

export { debounce };
