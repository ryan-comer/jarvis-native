import Home from './pages/Home'
import LeagueOfLegends from './pages/LeagueOfLegends'
import Music from './pages/Music'
import TopBar from './components/TopBar'
import './App.css'

import CssBaseline from '@mui/material/CssBaseline'

import {
  ThemeProvider,
  Box
} from '@mui/material'

import {
  createTheme
} from '@mui/material/styles'

import {
    Routes,
    Route
} from 'react-router-dom'

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
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/league_of_legends' element={<LeagueOfLegends/>}/>
            <Route path='/music' element={<Music/>}/>
          </Routes>
        </Box>
      </ThemeProvider>
  );
}

export default App;
