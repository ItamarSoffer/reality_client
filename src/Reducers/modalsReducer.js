
const siteInitState = {
    showNewEventModal: false,
    showPermissionsModal: false,
    showDeleteTimelineModal: false,
};

const modalsReducer = (state = siteInitState, action) => {

    switch(action.type){
        case "NEW_EVENT_MODAL_VIEW":
            state = {...state, showNewEventModal: action.payload};
        break;

        case "PERMISSIONS_MODAL_VIEW":
            state = {...state, showPermissionsModal: action.payload};
        break;

        case "DELETE_TIMELINE_MODAL_VIEW":
            state = {...state, showDeleteTimelineModal: action.payload};
        break;
        default:
        break;
    }

    // console.log('Sites Reducers', state);
    return state;
};

export default modalsReducer;