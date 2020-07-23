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

export const setReRenderTimelineAction = (index) => {
    return {
        type: "TIMELINE_RENDER_COUNT",
        payload: index
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

export const setReRenderCardsAction = (index) => {
    return {
        type: "CARDS_RENDER_COUNT",
        payload: index
    }
};


