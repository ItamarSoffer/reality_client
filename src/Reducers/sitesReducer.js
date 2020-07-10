const DarkModeLocalStorage = window.localStorage.getItem('DarkMode');

const siteInitState = {
    DarkMode: (DarkModeLocalStorage !== null ? DarkModeLocalStorage : false),
    editMode: false,
    showNewEventModal: false,
    showPermissionsModal: false,
    timelineRenderCount: 0,
    showDeleteTimelineModal: false,
    storyViewMode: 'timeline'
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

        case "PERMISSIONS_MODAL_VIEW":
            state = {...state, showPermissionsModal: action.payload};
        break;

        case "TIMELINE_RENDER_COUNT":
            state = {...state, timelineRenderCount: action.payload};
        break;

        case "DELETE_TIMELINE_MODAL_VIEW":
            state = {...state, showDeleteTimelineModal: action.payload};
        break;

        case "STORY_VIEW_MODE":
            state = {...state, storyViewMode: action.payload};
            console.log(action.payload);
        break;


        default:
        break;
    }

    // console.log('Sites Reducers', state);
    return state;
};

export default sitesReducer;