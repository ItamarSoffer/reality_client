export const changeThemeAction = (isCurrentDark) => {
    return {
        type: "SET_THEME",
        payload: !isCurrentDark
    }
};

export const enableEditAction = () => {
    return {
        type: "EDIT_MODE",
        payload: true
    }
};

export const disableEditAction = () => {
    return {
        type: "EDIT_MODE",
        payload: false
    }
};
<<<<<<< HEAD
=======


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
<<<<<<< HEAD
>>>>>>> 79aa366... add permissions control
=======

export const setReRenderTimelineAction = (index) => {
    console.log("Changed rerender index to", index);
    return {
        type: "TIMELINE_RENDER_COUNT",
        payload: index
    }
};
>>>>>>> da2bd71... add auto update after change (add or delete event)
