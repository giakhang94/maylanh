const closeAlert = (time: number, setAlert: () => void) => {
  const closeTime = setTimeout(() => {
    setAlert();
  }, time);
  return clearTimeout(closeTime);
};

export default closeAlert;
