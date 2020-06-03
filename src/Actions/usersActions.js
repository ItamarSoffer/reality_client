import axios from 'axios';
import {message} from "antd";
import {LoginApi} from "../Structure/api";


export const loginAction = (username, password) => {
    return async (dispatch) =>{
        const userLoginApi = LoginApi.concat(`?username=${username}&password=${password}`);
    axios.get(userLoginApi)
               .then((response) => {
  // console.log("resp", response);
  if (response.status === 201){
      message.warning(response.data)
  }
  else if (response.status === 200){
  message.success(response.data, 1.5);
  return dispatch({
      type: "LOGIN",
      payload: true,
      loggedUser: username
  })
  }
               })

    }
};


export const logoutAction = () => {
    return {
        type: "LOGIN",
        payload: false
    }
};
