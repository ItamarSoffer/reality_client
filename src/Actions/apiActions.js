import axios from 'axios';
import {backendAPI} from "../Structure/api";


export const apiLogin = (username, password) => {
    const userLoginApi = backendAPI.concat(`/login`);
    return axios.post(userLoginApi,
        {
            "username": username,
            "password": password
        })

};


export const apiDeleteStory = (jwtToken, storyId) => {
    const delTimelineUrl = backendAPI.concat(`/timeline/del_timeline?timeline_id=${storyId}`);
    return axios.post(delTimelineUrl, {
        jwt_token: jwtToken,
    })

};


export const apiDownloadExcel = (jwtToken, storyUrl) => {
    const apiGetExcel = backendAPI.concat(`/timeline/${storyUrl}/get_xlsx`);
    return axios.post( apiGetExcel,{
            jwt_token: jwtToken,
        },
        {
            responseType: 'blob',
        }
    )

};


export const apiGetTimelinesByUser= (jwtToken, searchString) => {
    const apiGetTimelines = backendAPI.concat(`/get_timelines_by_user`);
    return axios.post(apiGetTimelines,
        {
            jwt_token: jwtToken,
            "search_string": searchString

        })

};


export const apiNewEvent = (jwtToken, storyUrl, title, text, date, hour, color=null, icon, link, tags) => {
    const api_add_event = backendAPI.concat(`/timeline/${storyUrl}/add`);
    return axios.post(api_add_event, {
        "jwt_token": jwtToken,
        "header": title,
        "text": text,
        "date": date,
        "hour":hour,
        "frame_color": color,
        "icon": icon,
        "link": link,
        "tags": tags
    })

};


export const apiEditEvent= (jwtToken, storyUrl, eventId, title, text, date, hour, color, icon, link, tags) => {
    const api_add_event = backendAPI.concat(`/timeline/${storyUrl}/add`);
    const postData = {
        "jwt_token": jwtToken,
        "event_id": eventId,
        "header": title,
        "text": text,
        "date": date,
        "hour": hour,
        "frame_color": color ,
        "icon": icon,
        "link": link,
        "tags": tags
    };
    return axios.post(api_add_event, postData)

};


export const apiDelEvent = (jwtToken, eventId) => {
    const delUrl = backendAPI.concat(`/timeline/del_event?event_id=${eventId}`);
    return axios.post(delUrl, {
        jwt_token: jwtToken,
    })

};


export const apiCreateStory = (jwtToken, name, description, url) => {
    const ApiCreateTimeline = backendAPI.concat("/create_timeline");
    return axios.post(ApiCreateTimeline, {
        jwt_token: jwtToken,
        // create_user: this.props.loggedUser,
        description: description,
        name: name,
        url: url
    })


};


export const apiSetPermissions = (jwtToken, storyUrl, selectedUsers, role) => {
    const apiSetPermissions = backendAPI.concat(`/timeline/${storyUrl}/set_permissions/`);
    return axios.post(apiSetPermissions, {
        "jwt_token": jwtToken,
        "username": selectedUsers,
        "role": role,
    })

};


export const apiGetPermissions = (jwtToken, storyUrl) => {
    const apiGetPermissions = backendAPI.concat(`/timeline/${storyUrl}/permitted_users`);
    return axios.post(apiGetPermissions,
        {
            jwt_token: jwtToken,
        })

};


export const apiGetUsers = (jwtToken) => {
    const getUsersApi = backendAPI.concat(`/get_permitted_users`);
    return axios.post(getUsersApi, {
        jwt_token: jwtToken,
    }).then(res => res.data)

};


export const apiGetTags = (jwtToken, storyUrl) => {
    const fetchTagsApi = backendAPI.concat(`/timeline/${storyUrl}/get_tags`);
    return axios.post(fetchTagsApi, {
        jwt_token: jwtToken,
    }).then(res => res.data)
        .then(data => data.map(e => ({...e, nameAndColor: [e.tag_name, e.tag_color]})))

};


export const apiAddTag = (jwtToken, storyUrl, tagName, tagColor) => {
    const addTagApi = backendAPI.concat(`/timeline/${storyUrl}/add_tag`);
    return axios.post(addTagApi, {
        jwt_token: jwtToken,
        tag_name : tagName,
        tag_color: tagColor
    })

};


export const apiDelTag = (jwtToken, storyUrl, tagId) => {
    const delTagApi = backendAPI.concat(`/timeline/${storyUrl}/del_tag`);
    return axios.post(delTagApi, {
        jwt_token: jwtToken,
        "tag_id": tagId
    })

};


export const apiEditTag = (jwtToken, storyUrl, targetTag, tagNewName, tagNewColor) => {
    const editTagApi = backendAPI.concat(`/timeline/${storyUrl}/edit_tag`);
    return axios.post(editTagApi, {
        jwt_token: jwtToken,
        tag_id: targetTag,
        new_tag_name: tagNewName,
        new_tag_color: tagNewColor
    })

};


export const apiGetEvents = (jwtToken, storyUrl, minTime=null, maxTime=null, searchString=null, searchTags, fetchExtraData) => {
    const apiGetEvents = backendAPI.concat(`/timeline/${storyUrl}`);
    let postData = {
        jwt_token: jwtToken,
        min_time: minTime,
        max_time: maxTime,
        search_string: searchString,
        tags: searchTags
    };
    if (fetchExtraData){
        postData['extra_data'] = true;
    }

    return axios.post(apiGetEvents, postData)

};


export const apiEditStoryName= (jwtToken, storyUrl, newName) => {
    const editPropertyApi = backendAPI.concat(`/timeline/${storyUrl}/edit_property`);
    return axios.post(editPropertyApi, {
        jwt_token: jwtToken,
        new_name: newName
    })

};


export const apiEditStoryDescription = (jwtToken, storyUrl, newDescription) => {
    const editPropertyApi = backendAPI.concat(`/timeline/${storyUrl}/edit_property`);
    return axios.post(editPropertyApi, {
        jwt_token: jwtToken,
        new_description: newDescription
    })
};


export const apiGetAllCards = (jwtToken, searchString) => {
    const apiGetAllNames = backendAPI.concat("/get_all_names");
    return axios.post(apiGetAllNames, {
        "jwt_token": jwtToken,
        "search_string": searchString
    })

};


export const apiCheckPermission = (jwtToken, storyUrl) => {
    const permissionsApi = backendAPI.concat(`/timeline/${storyUrl}/check_permissions`);
    return axios.post(permissionsApi, {
        jwt_token: jwtToken,
    })

};


export const apiGetBasicData = (jwtToken, storyUrl) => {
    const apiGetBasicData = backendAPI.concat(`/timeline/${storyUrl}/basic_data`);
    return axios.post(apiGetBasicData,
        {
            jwt_token: jwtToken,
        })
        .then(res => res.data[0])
};

export const apiGetFavorites = (jwtToken) =>{
    const apiGetFavoritesLink = backendAPI.concat('/get_favorites');
    return axios.post(apiGetFavoritesLink,
        {
            jwt_token: jwtToken,
        })

};

export const apiAddFavorites = (jwtToken, storyUrl) =>{
    const apiAddFavoritesLink = backendAPI.concat(`/timeline/${storyUrl}/add_favorite`);
    return axios.post(apiAddFavoritesLink,
        {
            jwt_token: jwtToken,
        })

};


export const apiDellFavorites = (jwtToken, storyUrl) =>{
    const apiDellFavoritesLink = backendAPI.concat(`/timeline/${storyUrl}/dell_favorite`);
    return axios.post(apiDellFavoritesLink,
        {
            jwt_token: jwtToken,
        })

};
