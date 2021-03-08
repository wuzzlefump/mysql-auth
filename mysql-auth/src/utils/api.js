const apiBaseUrl = "http://localhost:8080";

// send an HTTP GET request to API
export const get = ({ route, headers = {} }) => {
  const url = `${apiBaseUrl}${route}`;

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  }).then((res) => {
    if (res.status >= 400) throw res;
    return res.json();
  });
};

// basic format for a POST route
export const post = ({ route, body }) => {
  const url = `${apiBaseUrl}${route}`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.status >= 400) throw res;
    return res.json();
  });
};
