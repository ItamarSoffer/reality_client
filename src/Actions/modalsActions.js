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


export const showDeleteTimelineModalAction = () => {
    return {
        type: "DELETE_TIMELINE_MODAL_VIEW",
        payload: true
    }
};

export const controlAboutSiderAction = (isOpen) => {
    // isOpen is bool- open or close the modal
    return {
        type: "ABOUT_SIDER_VIEW",
        payload: isOpen
    }
};

export const showUploadXlsxModalAction = () => {
    return {
        type: "UPLOAD_XLSX_MODAL_VIEW",
        payload: true
    }
};

export const hideUploadXlsxModalAction = () => {
    return {
        type: "UPLOAD_XLSX_MODAL_VIEW",
        payload: false
    }
};