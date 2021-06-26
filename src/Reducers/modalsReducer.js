/*
Control opening and closing windows in story.
All values are true or false, except the EditEvent:
    the EditEvent is shown by the event_id that is edited, to deal with collisions.
 */
const siteInitState = {
    showNewEventModal: false,
    showPermissionsModal: false,
    showDeleteTimelineModal: false,
    showUploadXlsxModal: false,
    showTagsModal: false,
    showEditEventModal: {},
    showAboutSider: false,
    showShortcutsModal: false,
    showNewStoryModal: false
};

const modalsReducer = (state = siteInitState, action) => {

    switch(action.type){
        case "NEW_EVENT_MODAL_VIEW":
            state = {...state, showNewEventModal: action.payload};
            break;

        case "PERMISSIONS_MODAL_VIEW":
            state = {...state, showPermissionsModal: action.payload};
            break;

        case "DELETE_TIMELINE_MODAL_VIEW":
            state = {...state, showDeleteTimelineModal: action.payload};
            break;

        case "UPLOAD_XLSX_MODAL_VIEW":
            state = {...state, showUploadXlsxModal: action.payload};
            break;

        case "TAGS_MODAL_VIEW":
            state = {...state, showTagsModal: action.payload};
            break;

        case "ABOUT_SIDER_VIEW":
            state = {...state, showAboutSider: action.payload};
            break;

        case "EDIT_EVENT_MODAL_VIEW":
            // let visibleUpdate = state["showEditEventModal"];
            // for (let [key, value] of Object.entries(action.payload)){
            //     visibleUpdate[key] = value;
            // }
            //
            // state = {...state, showEditEventModal: visibleUpdate};
            state = {...state, showEditEventModal: action.payload};
            break;
        case "SHORTCUTS_MODAL_VIEW":
            state = {...state, showShortcutsModal: action.payload};
            break;
        case "NEW_STORY_MODAL_VIEW":
            state = {...state, showNewStoryModal: action.payload};
            break;


        default:
            break;
    }

    return state;
};

export default modalsReducer;