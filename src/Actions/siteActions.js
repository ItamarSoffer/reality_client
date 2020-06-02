export const changeThemeAction = (isCurrentDark) => {
    return {
        type: "SET_THEME",
        payload: !isCurrentDark
    }
};
