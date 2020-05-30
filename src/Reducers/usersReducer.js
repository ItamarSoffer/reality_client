const isLoggedLocalStorage = window.localStorage.getItem('isLogged');

const initState = {
    isLogged: (isLoggedLocalStorage !== null ? (isLoggedLocalStorage === 'true') : false)
};

const usersReducer = (state = initState, action) => {

    switch(action.type){
        case "LOGIN":
            window.localStorage.setItem('isLogged',action.payload);
            state = {...state, isLogged: action.payload, loggedUser: action.loggedUser};
            console.log(state);
        break;
        default:
        break;
    }

    console.log('Users Reducers', state);
    return state;
};

export default usersReducer;