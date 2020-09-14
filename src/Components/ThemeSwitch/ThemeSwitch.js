import React from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Switch, Input, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {setThemeAction} from "../../Actions/siteActions";

export default function ThemeSwitch() {
    const [isDarkMode, setIsDarkMode] = React.useState();
    const { switcher, currentTheme, status, themes } = useThemeSwitcher();

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const toggleTheme = (isChecked) => {
        setIsDarkMode(isChecked);
        switcher({ theme: isChecked ? themes.dark : themes.light });
        dispatch(setThemeAction(isChecked))

    };

    // Avoid theme change flicker
    if (status === "loading") {
        return null;
    }

    return (
        <div className="main fade-in">
            <Typography.Text>Theme: {currentTheme}</Typography.Text>
            <Switch
                defaultChecked
                checked={isDarkMode}
                onChange={toggleTheme} />

        </div>
    );
}