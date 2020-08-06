import axios from "axios";


const ErrorCode = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  SERVER_NOT_RESPONDING: 500,
};

const createAPI = (handlerNetworkErorr) => {
  const {onUnauthorized, onNetworkError} = handlerNetworkErorr;
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    const isAuthError = response.status === ErrorCode.UNAUTHORIZED;
    const isBadRequse = response.status >= ErrorCode.BAD_REQUEST && response.status < ErrorCode.SERVER_NOT_RESPONDING;
    const isServerNotResponding = response.status >= ErrorCode.SERVER_NOT_RESPONDING;

    if (isAuthError) {
      onUnauthorized();
      throw err;
    }
    if (isBadRequse) {
      onNetworkError(`Failed to send request to server. Sorry... :(`);
      throw err;
    }
    if (isServerNotResponding) {
      onNetworkError(`Server not responding. Sorry... :(`);
      throw err;
    }

    onNetworkError(`Ooops, somthing went wrong`);
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};


export default createAPI;
