import NameSpace from "../name-space.js";


const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;


export {getAuthorizationStatus};
