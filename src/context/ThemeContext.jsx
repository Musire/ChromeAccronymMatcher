import { useContext, createContext, useState, useEffect } from "react"

const THEME_KEY = 'theme-mode'

const ThemeContext = createContext()

export const useThemeContext = () => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('no context found')
    return context
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'system')
    useEffect(() => {
        const root = document.documentElement

        const applyTheme = (mode) => {
            if (mode === 'light') {
                root.classList.remove('dark')
            } else if (mode === 'dark') {
                root.classList.add('dark')
            } else {
                const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                root.classList.toggle('dark', isDark)
            }
        }

        applyTheme(theme)
        localStorage.setItem(THEME_KEY, theme)

        const listener = (e) => {
            if (localStorage.getItem(THEME_KEY) === 'system') {
                applyTheme('system')
            }
        }

        const mql = window.matchMedia('(prefers-color-scheme: dark)')
        mql.addEventListener('change', listener)

        return () => mql.removeEventListener('change', listener)
    }, [theme])
    
    const themeContext = {
        theme,
        setTheme
    }
    return <ThemeContext.Provider value={themeContext}>{children}</ThemeContext.Provider>
}