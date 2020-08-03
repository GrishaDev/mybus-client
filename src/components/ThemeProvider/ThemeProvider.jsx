import React from 'react';
import { lightTheme, darkTheme } from 'theme.js';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ThemeContext from './ThemeContext';
import CssBaseline from "@material-ui/core/CssBaseline";

const storage = {
    getItem(key) {
      if (localStorage) {
        return localStorage.getItem(key);
      }
    },
    setItem(key, value) {
      if (localStorage) {
        return localStorage.setItem(key, value);
      }
    }
  };

  
export default function ThemeProvider(props) {
    const [isDark, setIsDark] = React.useState(storage.getItem("darkTheme") === "true");

    const themeSwitch = () => {
        storage.setItem('darkTheme', !isDark)
        setIsDark(!isDark);
    };

    const contextValue = {
        themeSwitch: themeSwitch
    }

    // theme expression is swapped to make darktheme default
    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={isDark ? lightTheme : darkTheme}>  
                <CssBaseline />
                {props.children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}