export const setThemeAction = (isCurrentDark) => {
    //console.log("THEME NOW IS DARK:", isCurrentDark);
    return {
        type: "SET_THEME",
        payload: isCurrentDark
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
        type: "STORY_TYPE_MODE",
        payload: 'timeline'
    }
};

export const storyModeTableAction = () => {
    return {
        type: "STORY_TYPE_MODE",
        payload: 'table'
    }
};

export const storyExpandModeAction = (val) => {
    return {
        type: "STORY_EXPAND_MODE",
        payload: val
    }
};

export const setReRenderCardsAction = (index) => {
    return {
        type: "CARDS_RENDER_COUNT",
        payload: index
    }
};

