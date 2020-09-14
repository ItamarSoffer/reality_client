/*
Saves General variables:
    1. editMode- controls if story is in edit mode or not
    2. timelineRenderCount- if true, forces to re-fetch the events from backend. turns the false after fetch.
    3. storyViewMode- timeline of table.
    4. cardsRenderCount- being changed after search in home or all, forces re-fetching relevant cards.
    5. storyExpandMode- true == expand, false == collapse.
 */
const darkModeLocalStorage = window.localStorage.getItem('darkMode');

let darkModeData = null;
if (darkModeLocalStorage === 'true'){
    darkModeData = true;
}
else if (darkModeLocalStorage === 'false'){
    darkModeData = false;
}

const siteInitState = {
    darkMode: darkModeData,
    editMode: false,
    timelineRenderCount: 0,
    storyViewMode: 'timeline',
    cardsRenderCount: 0,
    storyExpandMode: true
};

const sitesReducer = (state = siteInitState, action) => {

    switch(action.type){
        case "SET_THEME":
            window.localStorage.setItem('darkMode',action.payload);
            state = {...state, darkMode: action.payload};
            break;

        case "EDIT_MODE":
            state = {...state, editMode: action.payload};
            break;

        case "TIMELINE_RENDER_COUNT":
            state = {...state, timelineRenderCount: action.payload};
            break;

        case "STORY_TYPE_MODE":
            state = {...state, storyViewMode: action.payload};
            // console.log(action.payload);
            break;

        case "STORY_EXPAND_MODE":
            state = {...state, storyExpandMode: action.payload};
            // console.log(action.payload);
            break;

        case "CARDS_RENDER_COUNT":
            state = {...state, cardsRenderCount: action.payload};
            break;



        default:
            break;
    }

    // console.log('Sites Reducers', state);
    return state;
};

export default sitesReducer;