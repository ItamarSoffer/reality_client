const DarkModeLocalStorage = window.localStorage.getItem('DarkMode');

const initState = {
    DarkMode: (DarkModeLocalStorage !== null ? DarkModeLocalStorage : false)
};

const sitesReducer = (state = initState, action) => {

    switch(action.type){
        case "SET_THEME":
            window.localStorage.setItem('DarkMode',action.payload);
            state = {...state, DarkMode: action.payload};
        break;
        default:
        break;
    }

    // console.log('Sites Reducers', state);
    return state;
};

export default sitesReducer;