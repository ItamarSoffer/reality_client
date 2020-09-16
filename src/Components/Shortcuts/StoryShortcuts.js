import Hotkeys from "react-hot-keys";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {controlNewEventModalAction,
controlPermissionsModalAction, controlAboutSiderAction} from "../../Actions/modalsActions";
import {enableEditAction, disableEditAction} from "../../Actions/siteActions";
import {logoutAction} from "../../Actions/usersActions";
import {setThemeAction} from "../../Actions/siteActions";

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
    const state = useSelector(state => state);
    const dispatch = useDispatch();

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


export function HotKeyModeSwitch(){
    const onKeyUp = (keyName, e, handle) => {
        console.log("keyName", keyName);
        console.log("test:onKeyUp", e, handle);
    };
    return (<Hotkeys
        keyName="alt+t"
        onKeyUp={onKeyUp}
    />)}


export function HotKeyExpandSwitch(){
    const onKeyUp = (keyName, e, handle) => {
        console.log("keyName", keyName);
        console.log("test:onKeyUp", e, handle);
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
        keyName="shift+d"
        onKeyUp={onKeyUp}
    />)}


export function HotKeyNewStory(){
    const onKeyUp = (keyName, e, handle) => {
        console.log("keyName", keyName);
        console.log("test:onKeyUp", e, handle);
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
    const onKeyUp = (keyName, e, handle) => {
        console.log("keyName", keyName);
        console.log("test:onKeyUp", e, handle);
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
    </div>)


}

export function StoryShortcuts(){
    return (<div>
        <HotKeyNewEvent/>
        <HotKeyPermissionsModal/>
        <HotKeyModeSwitch/>
        <HotKeyEditMode/>
        <HotKeyExpandSwitch/>
    </div>)
}
