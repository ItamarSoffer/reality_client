import React from "react";
import Hotkeys from "react-hot-keys";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {
    controlNewEventModalAction,
    controlPermissionsModalAction,
    controlTagsModalAction
} from "../../Actions/modalsActions";
import {
    controlEditAction,
    setStoryViewModeAction,
    storyExpandModeAction,
    StoryOpenAllExtraData
} from "../../Actions/siteActions";
import {getQueryStringParams} from "../../Actions/queryStringActions";
import {MenuShortcuts} from "./MenuShortcuts";

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


function HotKeyNewEvent() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);


    const onKeyUp = (keyName, e, handle) => {
        dispatch(controlNewEventModalAction(!state.modalsReducer.showNewEventModal));
    };
    return (<Hotkeys
        keyName="alt+n"
        onKeyUp={onKeyUp}
    />)}


function HotKeyTagsModal() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const onKeyUp = (keyName, e, handle) => {
        dispatch(controlTagsModalAction(!state.modalsReducer.showTagsModal));
    };
    return (<Hotkeys
        keyName="alt+t"
        onKeyUp={onKeyUp}
    />)}


function HotKeyModeSwitch() {
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


function HotKeyExpandSwitch() {
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


function HotKeyEditMode() {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const onKeyUp = (keyName, e, handle) => {
        dispatch(controlEditAction(!state.sitesReducer.editMode));
    };
    return (<Hotkeys
        keyName="alt+c"
        onKeyUp={onKeyUp}
    />)}


export function HotKeyPermissionsModal(){
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const onKeyUp = (keyName, e, handle) => {
        dispatch(controlPermissionsModalAction(!state.modalsReducer.showPermissionsModal));
    };
    return (<Hotkeys
        keyName="alt+p"
        onKeyUp={onKeyUp}
    />)}


function HotKeyOpenAllExtra() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const onKeyUp = (keyName, e, handle) => {
        dispatch(StoryOpenAllExtraData(!state.sitesReducer.storyOpenAllExtra));
    };
    return (<Hotkeys
        keyName="shift+alt+x"
        onKeyUp={onKeyUp}
    />)}


export function StoryShortcuts() {
    // permissions is alone
    return (<div>
        <HotKeyModeSwitch/>
        <HotKeyExpandSwitch/>
        <HotKeyOpenAllExtra/>
    </div>)
}

export function StoryEditShortcuts() {
    return (<div>
        <HotKeyEditMode/>
        <HotKeyNewEvent/>
        <HotKeyTagsModal/>
    </div>)
}

export function AllKeys(){
    return (<div>
        <MenuShortcuts/>
        <StoryShortcuts/>
        <HotKeyPermissionsModal/>
        <StoryEditShortcuts/>
    </div>)
}
