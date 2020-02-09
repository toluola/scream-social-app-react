import jwtDecode from "jwt-decode";

export const decodeToken = token => jwtDecode(token);

export const authenticate = () => {
  try {
    const token = localStorage.getItem("questionerToken");
    const decode = decodeToken(token);
    return decode;
  } catch (ex) {
    return null;
  }
};
