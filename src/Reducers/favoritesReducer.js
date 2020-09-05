const favoritesLocalStorage = window.localStorage.getItem('favorites');

const initState = {
    favorites: (favoritesLocalStorage !== null ? JSON.parse(favoritesLocalStorage) : ''),
    favoritesRerender: false
};

const favoritesReducer = (state = initState, action) => {

    switch(action.type){
        case "FAVORITES_SET":
            window.localStorage.setItem('favorites',JSON.stringify(action.favoritesList));
            state = {...state,
                favorites: action.favoritesList,
            };
            break;
        case "FAVORITES_RERENDER":
            state = {...state, favoritesRerender: action.payload};
            break;
        case "FAVORITES_CLEAR":
            state = {...state, favorites: ''};
            window.localStorage.removeItem('favorites');
            break;
        default:
            break;
    }

    return state;
};

export default favoritesReducer;