import { Button, createTheme, CSSVariablesResolver } from "@mantine/core";
import buttonClasses from '@/styles/button.module.css';

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
    components: {
        Button: Button.extend({
            classNames: buttonClasses,
        }),
    },
    other: {
        headerHeight: '60px',
        toolbarHeight: '36px',
        footerHeight: '48px',
    }
});

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
    variables: {
        '--rover-header-height': theme.other.headerHeight,
        '--rover-toolbar-height': theme.other.toolbarHeight,
        '--rover-footer-height': theme.other.footerHeight,
    },
    light: {},
    dark: {},
});
