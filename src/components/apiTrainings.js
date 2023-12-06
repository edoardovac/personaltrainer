export const fetchTrainings = (setTrainings) => {
  fetch(`${import.meta.env.VITE_URL}/gettrainings`)
    .then((response) => {
      if (!response.ok)
        throw new Error("Something went wrong: " + response.statusText);

      return response.json();
    })
    .then((data) => setTrainings(data))
    .catch((err) => console.error(err));
};
