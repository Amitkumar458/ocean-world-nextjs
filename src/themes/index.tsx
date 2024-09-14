"use client"
import { createContext, useState, useMemo, PropsWithChildren } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
type modeStateType = "dark" | "light";


// createing desing tokens
/**
 * gray -> #666666
 * primary -> #141b2d
 * success -> #4cceac
 * danger ->#db4f4a
 * blue -> #6870fa
 */

export const colorToken = () => ({
  ...{
    grey: {
      50: "#e9eaea",
      100: "#bbbdbf",
      200: "#9a9d9f",
      300: "#6c7074",
      400: "#505459",
      500: "#24292f",
      600: "#21252b",
      700: "#1a1d21",
      800: "#14171a",
      900: "#0f1114",
    },

    primary: {
      100: "#ffffff",
      200: "#ffffff",
      300: "#ffffff",
      400: "#ffffff",
      500: "#ffffff",
      600: "#cccccc",
      700: "#999999",
      800: "#666666",
      900: "#333333",
    },

    greenAccent: {
      50: "#e6f7ef",
      100: "#b0e5cc",
      200: "#8ad8b4",
      300: "#54c691",
      400: "#33bb7c",
      500: "#00aa5b",
      600: "#009b53",
      700: "#007941",
      800: "#005e32",
      900: "#004726",
    },
    greenV2Accent: {
      50: "#e6f6f4",
      100: "#b2e2dd",
      200: "#8cd4cd",
      300: "#58c0b6",
      400: "#38b4a8",
      500: "#06a192",
      600: "#059385",
      700: "#047268",
      800: "#035950",
      900: "#03443d",
    },

    redAccent: {
      100: "#ffcccc",
      200: "#ff9999",
      300: "#ff6666",
      400: "#ff3333",
      500: "#ff0000",
      600: "#cc0000",
      700: "#990000",
      800: "#660000",
      900: "#330000",
    },

    blueAccent: {
      100: "#cde9e7",
      200: "#9bd4ce",
      300: "#69beb6",
      400: "#37a99d",
      500: "#059385",
      600: "#04766a",
      700: "#035850",
      800: "#023b35",
      900: "#011d1b",
    },
    orange: {
      100: "#ffebcc",
      200: "#ffd699",
      300: "#ffc266",
      400: "#ffad33",
      500: "#ff9900",
      600: "#cc7a00",
      700: "#995c00",
      800: "#663d00",
      900: "#331f00",
    },
    teal: {
      100: "#d7f0ee",
      200: "#afe1dc",
      300: "#88d2cb",
      400: "#60c3b9",
      500: "#38b4a8",
      600: "#2d9086",
      700: "#226c65",
      800: "#164843",
      900: "#0b2422",
    },
  },
});

// export const colorToken = (mode: modeStateType) => ({
//   ...(mode === "dark"
//     ? {
//         gray: {
//           100: "#e0e0e0",
//           200: "#c2c2c2",
//           300: "#a3a3a3",
//           400: "#858585",
//           500: "#666666",
//           600: "#525252",
//           700: "#3d3d3d",
//           800: "#292929",
//           900: "#141414",
//         },

//         primary: {
//           100: "#d0d1d5",
//           200: "#a1a4ab",
//           300: "#727681",
//           400: "#1F2A40",
//           500: "#141b2d",
//           600: "#101624",
//           700: "#0c101b",
//           800: "#080b12",
//           900: "#040509",
//         },

//         greenAccent: {
//           100: "#004726",
//           200: "#005e32",
//           300: "#007941",
//           400: "#009b53",
//           500: "#00aa5b",
//           600: "#33bb7c",
//           700: "#54c691",
//           800: "#8ad8b4",
//           900: "#b0e5cc",
//         },

//         redAccent: {
//           100: "#f8dcdb",
//           200: "#f1b9b7",
//           300: "#e99592",
//           400: "#e2726e",
//           500: "#db4f4a",
//           600: "#af3f3b",
//           700: "#832f2c",
//           800: "#58201e",
//           900: "#2c100f",
//         },

//         blueAccent: {
//           100: "#e1e2fe",
//           200: "#c3c6fd",
//           300: "#a4a9fc",
//           400: "#868dfb",
//           500: "#6870fa",
//           600: "#535ac8",
//           700: "#3e4396",
//           800: "#2a2d64",
//           900: "#151632",
//         },
//       }
//     : {
//         gray: {
//           100: "#141414",
//           200: "#292929",
//           300: "#3d3d3d",
//           400: "#525252",
//           500: "#666666",
//           600: "#858585",
//           700: "#a3a3a3",
//           800: "#c2c2c2",
//           900: "#e0e0e0",
//         },

//         primary: {
//           100: "#040509",
//           200: "#080b12",
//           300: "#0c101b",
//           400: "#f2f0f0",
//           500: "#141b2d",
//           600: "#434957",
//           700: "#727681",
//           800: "#a1a4ab",
//           900: "#d0d1d5",
//         },

//         greenAccent: {
//           100: "#b0e5cc",
//           200: "#8ad8b4",
//           300: "#54c691",
//           400: "#33bb7c",
//           500: "#00aa5b",
//           600: "#009b53",
//           700: "#007941",
//           800: "#005e32",
//           900: "#004726",
//         },

//         redAccent: {
//           100: "#2c100f",
//           200: "#58201e",
//           300: "#832f2c",
//           400: "#af3f3b",
//           500: "#db4f4a",
//           600: "#e2726e",
//           700: "#e99592",
//           800: "#f1b9b7",
//           900: "#f8dcdb",
//         },

//         blueAccent: {
//           100: "#151632",
//           200: "#2a2d64",
//           300: "#3e4396",
//           400: "#535ac8",
//           500: "#6870fa",
//           600: "#868dfb",
//           700: "#a4a9fc",
//           800: "#c3c6fd",
//           900: "#e1e2fe",
//         },
//       }),
// });

// mui theme setting

export const themeSetting = (mode: modeStateType) => {
  const colors = colorToken();
  return {
    palette: {
      mode: mode,
      ...{
        praimary: {
          main: colors.primary[100],
        },
        secondary: {
          main: colors.greenAccent[500],
        },
        neutral: {
          dark: colors.grey[700],
          main: colors.grey[500],
          light: colors.grey[100],
        },
        background: {
          // default: "#ffffff",
          default: colors.primary[500],
        },
      },
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};



// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { }
});

export const useMode = () => {
  const [mode, setMode] = useState<modeStateType>("light");
  
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );
  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode]);
  
  return { theme, colorMode };
};



export const CustomColorModeProvider = (props: PropsWithChildren<unknown>) => {
  const {theme, colorMode} = useMode();
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}