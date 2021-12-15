import Index from './pages/Index';
import LeagueOfLegends from './pages/LeagueOfLegends';
import TopBar from './components/TopBar'
import './App.css';

import CssBaseline from '@mui/material/CssBaseline'

import {
  ThemeProvider,
  Box
} from '@mui/material'

import {
  createTheme
} from '@mui/material/styles'

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#4f5b62',
        main: '#263238',
        dark: '#000a12',
        contrastText: '#fff',
      },
      secondary: {
        light: '#62ebff',
        main: '#00b8d4',
        dark: '#0088a3',
        contrastText: '#000',
      },
      background: {
        default: '#4f5b62'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <TopBar/>
      <Box sx={{marginTop:8}}>
        <LeagueOfLegends/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
