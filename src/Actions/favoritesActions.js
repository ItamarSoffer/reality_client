export const setUserFavorites = (favoritesList) => {
    return {
        type: "FAVORITES_SET",
        favoritesList: favoritesList
    }
};
export const setReRenderFavorites = (val) => {
    return {
        type: "FAVORITES_RERENDER",
        payload: val
    }
};

export const clearFavorites = () => {
    return {
        type: "FAVORITES_CLEAR",
    }
};
