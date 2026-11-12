const response = await fetch(
  "https://overpass-api.de/api/interpreter",
  {
    method: "POST",
    body: new URLSearchParams({
      data: overpassQuery
    })
  }
);


if (!response.ok) {
  throw new Error(`Overpass error: ${response.status}`);
}

const result = await response.json();