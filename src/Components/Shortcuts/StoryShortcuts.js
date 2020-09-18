import React from "react";
import Hotkeys from "react-hot-keys";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {
    controlAboutSiderAction,
    controlNewEventModalAction,
    controlPermissionsModalAction,
    controlShortcutsModalAction,
    controlTagsModalAction
} from "../../Actions/modalsActions";
import {
    disableEditAction,
    enableEditAction,
    setStoryViewModeAction,
    setThemeAction,
    storyExpandModeAction,
    StoryOpenAllExtraData
} from "../../Actions/siteActions";
import {logoutAction} from "../../Actions/usersActions";
import {getQueryStringParams} from "../../Actions/queryStringActions";

/*
- הוספת אירוע חדש- alt+ n
- החלפה בין טבלה וציר זמן alt + t
- מורחב ומקוצר-alt + x
- דארק מוד- alt + d
- יצירת ציר חדש- shift + alt +n
- פתיחה של העזרה- alt+h
- מסך בית - alt+h
- לוג אאוט - shift+alt+l
- מצב עריכה- alt+ e
- טאב הרשאות- alt + p
 */

export function HotKeyCheck(){
    // const state = useSelector(state => state);
    // const dispatch = useDispatch();

    const onKeyUp = (keyName, e, handle) => {
        console.log("keyName", keyName);
        console.log("test:onKeyUp", e, handle);
    };
    return (<Hotkeys
        keyName="shift+a,alt+s"
        onKeyUp={onKeyUp}
    />)}


export function HotKeyNewEvent(){
    const dispatch = useDispatch();

    const onKeyUp = (keyName, e, handle) => {
        dispatch(controlNewEventModalAction(true));
    };
    return (<Hotkeys
        keyName="alt+n"
        onKeyUp={onKeyUp}
    />)}

export function HotKeyTagsModal(){
    const dispatch = useDispatch();

    const onKeyUp = (keyName, e, handle) => {
        dispatch(controlTagsModalAction(true));
    };
    return (<Hotkeys
        keyName="alt+t"
        onKeyUp={onKeyUp}
    />)}



export function HotKeyModeSwitch(){
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    let history = useHistory();


    const onKeyUp = (keyName, e, handle) => {
        const pathName = history.location.pathname;
        let currentSearchQuery = getQueryStringParams(history.location.search);
        const currentView = currentSearchQuery['view']? currentSearchQuery['view'] : state.sitesReducer.storyViewMode;
        const newView = currentView === 'timeline'? 'table': 'timeline';


        currentSearchQuery['view'] = newView;
        history.push(
            {
                pathname: pathName,
                search: "?" + new URLSearchParams(
                    {...currentSearchQuery}
                ).toString()
            });
        dispatch(setStoryViewModeAction(newView));
    };
    return (<Hotkeys
        keyName="alt+v"
        onKeyUp={onKeyUp}
    />)}


export function HotKeyExpandSwitch(){
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    let history = useHistory();


    const onKeyUp = (keyName, e, handle) => {
        const pathName = history.location.pathname;
        let currentSearchQuery = getQueryStringParams(history.location.search);
        const currentExpand = currentSearchQuery['expand']? currentSearchQuery['expand'] : state.sitesReducer.storyExpandMode;
        const newExpand = currentExpand !== 'true';

        currentSearchQuery['expand'] = newExpand.toString();
        history.push(
            {
                pathname: pathName,
                search: "?" + new URLSearchParams(
                    {...currentSearchQuery}
                ).toString()
            });
        dispatch(storyExpandModeAction(newExpand));
    };
    return (<Hotkeys
        keyName="alt+x"
        onKeyUp={onKeyUp}
    />)}


export function HotKeyDarkMode(){
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const onKeyUp = (keyName, e, handle) => {
        dispatch(setThemeAction(!state.sitesReducer.darkMode));
    };
    return (<Hotkeys
        keyName="alt+a"
        onKeyUp={onKeyUp}
    />)}


export function HotKeyNewStory(){
    let history = useHistory();
    const onKeyUp = (keyName, e, handle) => {
        history.push("/new_story");
    };
    return (<Hotkeys
        keyName="shift+alt+n"
        onKeyUp={onKeyUp}
    />)}

export function HotKeyAboutSider(){
    const dispatch = useDispatch();
    const onKeyUp = (keyName, e, handle) => {
        dispatch(controlAboutSiderAction(true));
        console.log("keyName", keyName);
        console.log("test:onKeyUp", e, handle);
    };
    return (<Hotkeys
        keyName="alt+h"
        onKeyUp={onKeyUp}
    />)}

export function HotKeyHomeScreen(){
    let history = useHistory();
    const onKeyUp = (keyName, e, handle) => {
        history.push("/");
    };
    return (<Hotkeys
        keyName="shift+alt+h"
        onKeyUp={onKeyUp}
    />)}


export function HotKeyLogout(){
    const dispatch = useDispatch();
    const onKeyUp = (keyName, e, handle) => {
        dispatch(setThemeAction(false));
        dispatch(logoutAction());

    };
    return (<Hotkeys
        keyName="shift+alt+l"
        onKeyUp={onKeyUp}
    />)}


export function HotKeyEditMode(){
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const onKeyUp = (keyName, e, handle) => {
        if (state.sitesReducer.editMode){
            dispatch(disableEditAction())
        }
        else {
            dispatch(enableEditAction())
        }
    };
    return (<Hotkeys
        keyName="alt+c"
        onKeyUp={onKeyUp}
    />)}


export function HotKeyPermissionsModal(){
    const dispatch = useDispatch();
    const onKeyUp = (keyName, e, handle) => {
        dispatch(controlPermissionsModalAction(true));
    };
    return (<Hotkeys
        keyName="alt+p"
        onKeyUp={onKeyUp}
    />)}

export function HotKeyOpenAllExtra(){
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const onKeyUp = (keyName, e, handle) => {
        dispatch(StoryOpenAllExtraData(!state.sitesReducer.storyOpenAllExtra));
    };
    return (<Hotkeys
        keyName="shift+alt+x"
        onKeyUp={onKeyUp}
    />)}

export function HotKeyShortcutsModal() {
    const dispatch = useDispatch();

    const onKeyUp = (keyName, e, handle) => {
        dispatch(controlShortcutsModalAction(true));
    };
    return (<Hotkeys
        keyName="alt+s,s+c"
        onKeyUp={onKeyUp}
    />)
}



export function AllKeys(){
    return (<div>
        <HotKeyDarkMode/>
        <HotKeyEditMode/>
        <HotKeyExpandSwitch/>
        <HotKeyHomeScreen/>
        <HotKeyLogout/>
        <HotKeyModeSwitch/>
        <HotKeyNewEvent/>
        <HotKeyNewStory/>
        <HotKeyPermissionsModal/>
        <HotKeyAboutSider/>
    </div>)
}

export function MenuShortcuts(){
    return (<div>
        <HotKeyDarkMode/>
        <HotKeyHomeScreen/>
        <HotKeyLogout/>
        <HotKeyNewStory/>
        <HotKeyAboutSider/>
        <HotKeyShortcutsModal/>
    </div>)


}

export function StoryShortcuts(){
    // permissions is alone
    return (<div>
        <HotKeyModeSwitch/>
        <HotKeyExpandSwitch/>
        <HotKeyOpenAllExtra/>
    </div>)
}

export function StoryEditShortcuts(){
    return (<div>
        <HotKeyEditMode/>
        <HotKeyNewEvent/>
        <HotKeyTagsModal/>
    </div>)
}
