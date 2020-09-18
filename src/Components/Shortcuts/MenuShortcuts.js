import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setThemeAction} from "../../Actions/siteActions";
import Hotkeys from "react-hot-keys";
import {useHistory} from "react-router";
import {logoutAction} from "../../Actions/usersActions";
import {controlAboutSiderAction, controlShortcutsModalAction} from "../../Actions/modalsActions";

function HotKeyDarkMode() {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const onKeyUp = (keyName, e, handle) => {
        dispatch(setThemeAction(!state.sitesReducer.darkMode));
    };
    return (<Hotkeys
        keyName="alt+a"
        onKeyUp={onKeyUp}
    />)
}

function HotKeyAboutSider() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const onKeyUp = (keyName, e, handle) => {
        dispatch(controlAboutSiderAction(!state.modalsReducer.showAboutSider));
    };
    return (<Hotkeys
        keyName="alt+h"
        onKeyUp={onKeyUp}
    />)
}

function HotKeyShortcutsModal() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const onKeyUp = (keyName, e, handle) => {
        dispatch(controlShortcutsModalAction(!state.modalsReducer.showShortcutsModal));
    };
    return (<Hotkeys
        keyName="alt+s,s+c"
        onKeyUp={onKeyUp}
    />)
}

// ################# ROUTES #################

function HotKeyHomeScreen() {
    let history = useHistory();
    const onKeyUp = (keyName, e, handle) => {
        history.push("/");
    };
    return (<Hotkeys
        keyName="shift+alt+h"
        onKeyUp={onKeyUp}
    />)
}

function HotKeyNewStory() {
    let history = useHistory();
    const onKeyUp = (keyName, e, handle) => {
        history.push("/new_story");
    };
    return (<Hotkeys
        keyName="shift+alt+n"
        onKeyUp={onKeyUp}
    />)
}

function HotKeyLogout() {
    const dispatch = useDispatch();
    const onKeyUp = (keyName, e, handle) => {
        dispatch(setThemeAction(false));
        dispatch(logoutAction());

    };
    return (<Hotkeys
        keyName="shift+alt+l"
        onKeyUp={onKeyUp}
    />)
}

// ################# ALL #################

export function MenuShortcuts() {
    return (<div>
        <HotKeyDarkMode/>
        <HotKeyHomeScreen/>
        <HotKeyLogout/>
        <HotKeyNewStory/>
        <HotKeyAboutSider/>
        <HotKeyShortcutsModal/>
    </div>)
}