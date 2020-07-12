import NameSpace from "../name-space.js";


const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
const getAuthInfo = (state) => state[NameSpace.USER].authInfo;
const getEmail = (state) => state[NameSpace.USER].authInfo.email || null;


export {getAuthorizationStatus, getAuthInfo, getEmail};
