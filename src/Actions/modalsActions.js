export const controlNewEventModalAction = (isOpen) => {
    // isOpen is bool- open or close the modal
    return {
        type: "NEW_EVENT_MODAL_VIEW",
        payload: isOpen
    }
};

export const controlPermissionsModalAction = (isOpen) => {
    // isOpen is bool- open or close the modal
    return {
        type: "PERMISSIONS_MODAL_VIEW",
        payload: isOpen
    }
};

export const controlDeleteTimelineModalAction = (isOpen) => {
    // isOpen is bool- open or close the modal
    return {
        type: "DELETE_TIMELINE_MODAL_VIEW",
        payload: isOpen
    }
};

export const controlUploadXlsxModalAction = (isOpen) => {
    // isOpen is bool- open or close the modal
    return {
        type: "UPLOAD_XLSX_MODAL_VIEW",
        payload: isOpen
    }
};

export const controlTagsModalAction = (isOpen) => {
    // isOpen is bool- open or close the modal
    return {
        type: "TAGS_MODAL_VIEW",
        payload: isOpen
    }
};

export const controlAboutSiderAction = (isOpen) => {
    // isOpen is bool- open or close the modal
    return {
        type: "ABOUT_SIDER_VIEW",
        payload: isOpen
    }
};

export const controlEditEventModalAction = (eventId) => {
    /*
    eventId controls which event will be rendered in the EdieEvent Modal
    if closed- will be ''
     */


    // let visible = {};
    // visible[eventId] = true;
    // return {
    //     type: "EDIT_EVENT_MODAL_VIEW",
    //     payload: visible
    // }
    return {
        type: "EDIT_EVENT_MODAL_VIEW",
        payload: eventId
    }
};


export const controlShortcutsModalAction = (isOpen) => {
    // isOpen is bool- open or close the modal
    return {
        type: "SHORTCUTS_MODAL_VIEW",
        payload: isOpen
    }
};