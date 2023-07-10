const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_wxsRImK6Kj3ZGic073QZfvYGopZcv3dmLyFnDiyL0fybqBvYUYfI5Q5Rb06QV0vY';

function fetchBreeds() {
  const END_POINT = '/breeds';
  const PARAMS = new URLSearchParams({
    api_key: API_KEY,
  });
  return fetch(`${BASE_URL}${END_POINT}?${PARAMS}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  const END_POINT = '/images/search';

  const PARAMS = new URLSearchParams({
    api_key: API_KEY,
    breed_ids: breedId,
  });
  return fetch(`${BASE_URL}${END_POINT}?${PARAMS}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
