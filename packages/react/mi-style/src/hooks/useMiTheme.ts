import { useContext } from "react"
import { ThemeContext } from "theme/MiProvider"
import defaultTheme from "theme/defaultTheme";
import { Theme } from "types";

export const useMiTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return {
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
    addTheme: (group: string, value: string | number) => {
    }
  }
}