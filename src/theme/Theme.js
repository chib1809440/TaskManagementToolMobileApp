import {
    DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

const theme = {
    ...PaperDefaultTheme,
    roundness: 2,
    colors: {
        ...PaperDefaultTheme.colors,
        primary: '#62bd4e',
        accent: '#f1c40f',
        secondary: '#202c45',
        third: '#0179c0',
        error: '#ff3333',
        background: '#fff',
    },
};
export default theme;