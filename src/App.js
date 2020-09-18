import React from 'react';
import { connect } from 'react-redux';

import AppRouter from './Structure/AppRouter';



import './App.css';
import 'antd/dist/antd.css';
import './main.css'
import {checkJwt} from "./Actions/jwtActions";
import {ThemeSwitcherProvider} from "react-css-theme-switcher";


const themes = {
    dark: `${process.env.PUBLIC_URL}/themes/dark-theme.css`,
    light: `${process.env.PUBLIC_URL}/themes/light-theme.css`,
};

class App extends React.Component{
    componentDidMount() {
        document.title = "Story";
    }


    render() {
        const currentTheme = this.props.darkMode? 'dark': 'light';
        return (
            <ThemeSwitcherProvider themeMap={themes} defaultTheme={currentTheme}>
                <AppRouter
                    isLogged={checkJwt(this.props.jwtToken)}
                />
            </ThemeSwitcherProvider>

        );
    }
}

const mapStateToProps = state => {
    return {
        jwtToken: state.usersReducer.jwtToken,
        darkMode: state.sitesReducer.darkMode
    }
};

const mapDispatchToProps = disaptch => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
