const loggedUserLocalStorage = window.localStorage.getItem('loggedUser');
const jwtTokenLocalStorage = window.localStorage.getItem('jwtToken');

const initState = {
    loggedUser: (loggedUserLocalStorage !== null ? loggedUserLocalStorage : null),
    jwtToken: (jwtTokenLocalStorage !== null ? jwtTokenLocalStorage : ''),
};

const usersReducer = (state = initState, action) => {

    switch(action.type){
        case "LOGIN":
            window.localStorage.setItem('loggedUser',action.loggedUser);
            window.localStorage.setItem('jwtToken',action.jwtToken);
            state = {...state,
                loggedUser: action.loggedUser,
                jwtToken: action.jwtToken,
            };
            // logout- reset favorites
            if (action.jwtToken === ''){
            }
            break;
        default:
            break;
    }

    return state;
};

export default usersReducer;