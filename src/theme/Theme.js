import {
    DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

const theme = {
    ...PaperDefaultTheme,
    roundness: 2,
    colors: {
        ...PaperDefaultTheme.colors,
        primary: '#2fc5ff',
        accent: '#f1c40f',
        secondary: '#202c45',
        third: '#025659',
        error: '#ff3333'
    },
};
export default theme;