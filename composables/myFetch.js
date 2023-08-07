export const apiFetch = useFetch({
  baseUrl: `${process.env.API_HOST}:${process.env.API_PORT}${process.env.API_ROUTE}`
})
