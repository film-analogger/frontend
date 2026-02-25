declare module '@material-ui/core/styles/createPalette' {
    interface Palette {
        secondary: Palette['primary'];
    }
    interface PaletteOptions {
        secondary: PaletteOptions['primary'];
    }
}
