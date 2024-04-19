import { createTheme, CSSVariablesResolver } from '@mantine/core';

export const theme = createTheme({
    primaryColor: 'paleblue',
    colors: {
        paleblue: [
            '#eef3ff',
            '#dce4f5',
            '#b9c7e2',
            '#94a8d0',
            '#748dc1',
            '#5f7cb8',
            '#5474b4',
            '#44639f',
            '#39588f',
            '#2d4b81'
        ]
    },
    autoContrast: true,
    other: {
        headerHeight: '60px',
    }
});

export const resolver: CSSVariablesResolver = (theme) => ({
    variables: {
        '--rover-header-height': theme.other.headerHeight,
    },
    light: {},
    dark: {},
});
