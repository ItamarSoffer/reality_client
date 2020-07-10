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

export const setReRenderTimelineAction = (index) => {
    return {
        type: "TIMELINE_RENDER_COUNT",
        payload: index
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

export const storyModeTimelineAction = () => {
    return {
        type: "STORY_VIEW_MODE",
        payload: 'timeline'
    }
};

export const storyModeTableAction = () => {
    return {
        type: "STORY_VIEW_MODE",
        payload: 'full_table'
    }
};

export const storyModePrevTableAction = () => {
    return {
        type: "STORY_VIEW_MODE",
        payload: 'preview_table'
    }
};

