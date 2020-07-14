export const showNewEventModalAction = () => {
    return {
        type: "NEW_EVENT_MODAL_VIEW",
        payload: true
    }
};

export const hideNewEventModalAction = () => {
    return {
        type: "NEW_EVENT_MODAL_VIEW",
        payload: false
    }
};

export const showPermissionsModalAction = () => {
    return {
        type: "PERMISSIONS_MODAL_VIEW",
        payload: true
    }
};

export const hidePermissionsModalAction = () => {
    return {
        type: "PERMISSIONS_MODAL_VIEW",
        payload: false
    }
};


export const showDeleteTimelineModalAction = () => {
    return {
        type: "DELETE_TIMELINE_MODAL_VIEW",
        payload: true
    }
};

export const hideDeleteTimelineModalAction = () => {
    return {
        type: "DELETE_TIMELINE_MODAL_VIEW",
        payload: false
    }
};

