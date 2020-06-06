const DarkModeLocalStorage = window.localStorage.getItem('DarkMode');

const siteInitState = {
    DarkMode: (DarkModeLocalStorage !== null ? DarkModeLocalStorage : false),
    editMode: false,
    showNewEventModal: false
};

const sitesReducer = (state = siteInitState, action) => {

    switch(action.type){
        case "SET_THEME":
            window.localStorage.setItem('DarkMode',action.payload);
            state = {...state, DarkMode: action.payload};
        break;
        case "EDIT_MODE":
            state = {...state, editMode: action.payload};
        break;
        case "NEW_EVENT_MODAL_VIEW":
            state = {...state, showNewEventModal: action.payload};
        break;
        default:
        break;
    }

    // console.log('Sites Reducers', state);
    return state;
};

export default sitesReducer;