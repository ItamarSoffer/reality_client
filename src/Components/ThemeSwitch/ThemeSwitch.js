import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
// import { Switch, Input, Typography } from "antd";
import { Tooltip } from "antd";
import Icon from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import {setThemeAction} from "../../Actions/siteActions";
import {CgDarkMode} from "react-icons/cg";

export default function ThemeSwitch() {
    // const [isDarkMode, setIsDarkMode] = React.useState();
    // const { switcher, currentTheme, themes } = useThemeSwitcher();
    const { status} = useThemeSwitcher();

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    // const toggleTheme = (isChecked) => {
    //     /*
    //     the switcher function is a hook that can replace the theme anywhere.
    //     I used the setThemeAction-
    //     that changes the theme in redux and then it is changed in App component.
    //     */
    //
    //     setIsDarkMode(isChecked);
    //     switcher({ theme: isChecked ? themes.dark : themes.light });
    //     dispatch(setThemeAction(isChecked))
    //
    // };

    const onThemeIconClick = () => {
        dispatch(setThemeAction(!state.sitesReducer.darkMode));


    };

    // Avoid theme change flicker
    if (status === "loading") {
        return null;
    }

    return (
        <div  style={{
            alignItems: 'center',
            justifyContent: 'center'}}>
            {/*<Typography.Text>Theme: {currentTheme}</Typography.Text>*/}
            {/*<Switch*/}
            {/*    defaultChecked*/}
            {/*    checked={isDarkMode}*/}
            {/*    onChange={toggleTheme} />*/}
            {/*    <br/>*/}
            <Tooltip title={"Switch theme"} placement='right'>
                <Icon component={CgDarkMode} style={{fontSize: 23}}  onClick={onThemeIconClick}/>
            </Tooltip>

        </div>
    );
}