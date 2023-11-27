// color design tokens export
export const colorTokens = {
    primary: {
        0: "#FFFFFF",
        1: "#EEEEEE",
        2: "#DEDEDE",
        3: "rgba(41, 0, 92, 0.12)",
        4: "rgba(41, 0, 92, 0.32)",
        5: "rgba(41, 0, 92, 0.84)",
        6: "#29005C",
    },
    secondary: {
        0: "#DEDEDE",
        1: "#ffffff",
        2: "#DEDEDE",
        3: "#909090",
        4: "#000000",
        5: "#00D5FA",
        6: "#1a082a",
    },
};

// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "light"
                ? {
                    // palette values for light mode
                    textColor: {
                        dark: colorTokens.primary[6],
                        light: colorTokens.primary[0],
                    },
                    component: {
                        darkMax: colorTokens.primary[6],
                        dark: colorTokens.primary[5],
                        darkMin: colorTokens.primary[4],
                        medium: colorTokens.primary[3],
                        lightMax: colorTokens.primary[2],
                        light: colorTokens.primary[1],
                        lightMin:colorTokens.primary[0],
                    },
                    background: {
                        default: colorTokens.primary[1],
                    },
                }
                : {
                    // palette values for dark mode
                    textColor: {
                        dark: colorTokens.secondary[6],
                        light: colorTokens.secondary[0],
                    },
                    component: {
                        darkMax: colorTokens.secondary[6],
                        dark: colorTokens.secondary[5],
                        darkMin: colorTokens.secondary[4],
                        medium: colorTokens.secondary[3],
                        lightMax: colorTokens.secondary[2],
                        light: colorTokens.secondary[1],
                        lightMin:colorTokens.secondary[0],
                    },
                    background: {
                        default: colorTokens.secondary[1],
                    },
                }),
        },
        typography: {
            fontFamily: ["Koulen", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};