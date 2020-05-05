export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));
 
  if (user && user.tokenString) {
    return { 'Authorization': "Bearer " + user.tokenString };
  } else {
    return {};
  }
}
