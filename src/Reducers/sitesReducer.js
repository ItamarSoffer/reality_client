const DarkModeLocalStorage = window.localStorage.getItem('DarkMode');

const siteInitState = {
    DarkMode: (DarkModeLocalStorage !== null ? DarkModeLocalStorage : false),
<<<<<<< HEAD
    editMode: false
=======
    editMode: false,
    showNewEventModal: false,
    showPermissionsModal: false,
<<<<<<< HEAD
>>>>>>> 79aa366... add permissions control
=======
    timelineRenderCount: 0,
>>>>>>> da2bd71... add auto update after change (add or delete event)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======

>>>>>>> da2bd71... add auto update after change (add or delete event)
        case "NEW_EVENT_MODAL_VIEW":
            state = {...state, showNewEventModal: action.payload};
        break;

        case "PERMISSIONS_MODAL_VIEW":
            state = {...state, showPermissionsModal: action.payload};
        break;
<<<<<<< HEAD
>>>>>>> 79aa366... add permissions control
=======

        case "TIMELINE_RENDER_COUNT":
            state = {...state, timelineRenderCount: action.payload};
        break;

>>>>>>> da2bd71... add auto update after change (add or delete event)
        default:
        break;
    }

    console.log('Sites Reducers', state);
    return state;
};

export default sitesReducer;