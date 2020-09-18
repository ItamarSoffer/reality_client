export const setThemeAction = (isCurrentDark) => {
    //console.log("THEME NOW IS DARK:", isCurrentDark);
    return {
        type: "SET_THEME",
        payload: isCurrentDark
    }
};


export const controlEditAction = (val) => {
    return {
        type: "EDIT_MODE",
        payload: val
    }
};

export const setReRenderTimelineAction = (index) => {
    return {
        type: "TIMELINE_RENDER_COUNT",
        payload: index
    }
};

export const setStoryViewModeAction = (val) => {
    return {
        type: "STORY_TYPE_MODE",
        payload: val
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

export const StoryOpenAllExtraData = (val) => {
    return {
        type: "STORY_EXTRA_OPEN_ALL",
        payload: val
    }
};

