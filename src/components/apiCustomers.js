export const fetchCustomers = (setCustomers) => {
  fetch(`${import.meta.env.VITE_API_URL}/customers`)
    .then((response) => {
      if (!response.ok)
        throw new Error("Something went wrong: " + response.statusText);

      return response.json();
    })
    .then((data) => setCustomers(data.content))
    .catch((err) => console.error(err));
};
