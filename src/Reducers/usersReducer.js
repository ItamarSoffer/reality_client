const isLoggedLocalStorage = window.localStorage.getItem('isLogged');
const loggedUserLocalStorage = window.localStorage.getItem('loggedUser');

const initState = {
    isLogged: (isLoggedLocalStorage !== null ? (isLoggedLocalStorage === 'true') : false),
    loggedUser: (loggedUserLocalStorage !== null ? loggedUserLocalStorage : null)
};

const usersReducer = (state = initState, action) => {

    switch(action.type){
        case "LOGIN":
            window.localStorage.setItem('isLogged',action.payload);
            window.localStorage.setItem('loggedUser',action.loggedUser);
<<<<<<< HEAD
            state = {...state, isLogged: action.payload, loggedUser: action.loggedUser};
        break;
=======
            window.localStorage.setItem('jwtToken',action.jwtToken);
            state = {...state,
                loggedUser: action.loggedUser,
                jwtToken: action.jwtToken,
            };
            // logout- reset favorites
            if (action.jwtToken === ''){
            }
            break;
>>>>>>> 5b098b5... completely added favorites
        default:
        break;
    }

    console.log('Users Reducers', state);
    return state;
};

export default usersReducer;