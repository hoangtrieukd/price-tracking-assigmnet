export const ENV = {
  GECKO_API:
    process.env.REACT_APP_GECKO_API || 'https://api.coingecko.com/api/v3',
  FETCH_PRICE_INTERVAL: process.env.REACT_APP_FETCH_PRICE_INTERVAL || 5000,
};
