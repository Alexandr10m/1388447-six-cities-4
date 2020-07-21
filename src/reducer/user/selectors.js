import NameSpace from "../name-space.js";


const USER = NameSpace.USER;

const getAuthorizationStatus = (state) => state[USER].authorizationStatus;
const getAuthInfo = (state) => state[USER].authInfo;
const getEmail = (state) => state[USER].authInfo.email || null;


export {getAuthorizationStatus, getAuthInfo, getEmail};
