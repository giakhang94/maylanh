const BASE_URL_LOCAL = "http://localhost:5000/";
const BASE_URL_PRODUCTION = "https://maylanh.onrender.com/";
function baseurl(develop: boolean) {
  if (develop) return BASE_URL_LOCAL;
  else return BASE_URL_PRODUCTION;
}

export { baseurl };
