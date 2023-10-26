export const fetchingMarket = async (page) => {
  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=IDR&per_page=10&page=${page}`
  const response = await fetch(URL)
  if (!response.ok) {
    throw new Error("Fetching Error") 
  }
  return await response.json() 
}