const buildQueryUrlHelper = (baseUrl,limit,skip) => `${baseUrl}?limit=${limit}&skip=${skip}`

export default buildQueryUrlHelper