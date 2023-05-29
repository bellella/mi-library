import React from "react";
import defaultTheme from "./defaultTheme";
import { Theme } from "types";

const makeSetTheme = ({ set, createSet, ...rest }: Theme): Theme => ({
  ...rest,
  createSet,
  set: {
    ...(set && set),
    ...(createSet && createSet(rest))
  }
})

const setDefaultTheme = makeSetTheme(defaultTheme);

export const ThemeContext = React.createContext({ theme: setDefaultTheme, setTheme: null });

interface MiProviderInterface extends React.PropsWithChildren {
  theme: Theme
}

export const MiProvider: React.FC<MiProviderInterface> = ({ theme, children }) => {
  const [contextTheme, setContextTheme] = React.useState<Theme>(theme ? makeSetTheme(theme) : setDefaultTheme);

  const setTheme = (theme: Theme) => {
    setContextTheme(t => makeSetTheme(Object.assign(t, theme)));
  }

  return (
    <ThemeContext.Provider value={{ theme: contextTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}