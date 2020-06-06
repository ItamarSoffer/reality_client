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


export const showModalAction = () => {
    return {
        type: "NEW_EVENT_MODAL_VIEW",
        payload: true
    }
};

export const hideModalAction = () => {
    return {
        type: "NEW_EVENT_MODAL_VIEW",
        payload: false
    }
};
