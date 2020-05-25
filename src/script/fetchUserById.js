export default (id) => {
  return fetch(`http://${process.env.VUE_APP_API_HOST}/api/users/${id}`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
  });
};
