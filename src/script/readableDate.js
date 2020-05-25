export default (isoDate) => {
  const date = new Date(isoDate);
  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
};
