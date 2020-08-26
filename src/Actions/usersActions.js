import axios from 'axios';
import {message} from "antd";
import {backendAPI} from "../Structure/api";


export const loginAction = (username, password) => {

    return async (dispatch) =>{
        const userLoginApi = backendAPI.concat(`/login`);
        axios.post(userLoginApi,
            {
                "username": username,
                "password": password
            })
            .then((response) => {
                // console.log("resp", response);
                if (response.status === 201){
                    message.warning(response.data)
                }
                else if (response.status === 200){
                    message.success(`${username} logged in successfully`, 1.5);
                    return dispatch({
                        type: "LOGIN",
                        payload: true,
                        loggedUser: username,
                        jwtToken: response.data
                    })
                }
            })

    }
};


export const logoutAction = () => {
    return {
        type: "LOGIN",
        payload: false,
        loggedUser: '',
        jwtToken: ''
    }
};
