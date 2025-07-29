import {
  RECEIVE_USER_ERROR,
  RECEIVE_USER_RESPONSE,
  SEND_USER_REQUEST,
} from "./userTypes";
import { getUserService } from "../../service/auth";

export const sendUserRequest = () => {
  return {
    type: SEND_USER_REQUEST,
  };
};

export const receiveUserResponse = (data) => {
  return {
    type: RECEIVE_USER_RESPONSE,
    payload: data,
  };
};

export const receiveUserError = (error) => {
  return {
    type: RECEIVE_USER_ERROR,
    payload: error,
  };
};

// export const getRolseActionRedux=()=>{
//     return (dispatch , state)=>{
//         dispatch(sendUserRequest())
//         getUserService().then(res=>{
//             dispatch(receiveUserResponse(res.data.User))
//         }).catch(error =>{
//             dispatch(receiveUserError(error.message))
//         })
//     }
// }
