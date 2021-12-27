import * as React from 'react'

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Box
} from '@mui/material'

import {
    MAXIMIZE_WINDOW_IPC,
    MINIMIZE_WINDOW_IPC,
    CLOSE_WINDOW_IPC
} from '../CONSTANTS'

import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import SquareIcon from '@mui/icons-material/CropSquare'
import RemoveIcon from '@mui/icons-material/Remove'

import {
    Link,
    useLocation
} from 'react-router-dom'

const pages = [
    {
        name: 'Home',
        route: '/'
    },
    {
        name: 'League of Legends',
        route: '/league_of_legends'
    },
    {
        name: 'Music',
        route: '/music'
    }
]

function TopBar(){

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const location = useLocation()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function minimizeApplication(){
        window.ipcRenderer.send(MINIMIZE_WINDOW_IPC)
    }

    function maximizeAppliction(){
        window.ipcRenderer.send(MAXIMIZE_WINDOW_IPC)
    }

    function closeApplication(){
        window.ipcRenderer.send(CLOSE_WINDOW_IPC)
    }

    return (
        <AppBar className='titlebar' position='fixed'>
            <Toolbar sx={{display: 'flex'}}>
                <IconButton
                    className='titlebar-button'
                    size='large'
                    edge='start'
                    color='inherit'
                    sx={{mr: 2}}
                >
                    <MenuIcon />
                </IconButton>

                <Box className='titlebar-button' sx={{marginRight: 2}}>
                    <Link to='/' style={{color: 'white', textDecoration: 'none'}}>
                        <Typography variant="h5">
                            Jarvis
                        </Typography>
                    </Link>
                </Box>

                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    {pages.map((page) => (
                        <Box
                            className='titlebar-button'
                            key={page.name}
                            sx={{mx: 2, color: 'white', display: 'block',
                                borderRadius: 0,
                                borderBottom: (location.pathname === page.route) ? '1px solid white' : ''
                            }}
                        >
                            <Link to={page.route} style={{color: 'white', textDecoration: 'none'}}>
                                {page.name}
                            </Link>
                        </Box>
                    ))}
                </Box>

                <Box sx={{flexGrow: 1}}></Box>

                <Box sx={{display: 'flex', gap: '10px'}}>
                        <IconButton className="titlebar-button" sx={{color: 'primary.contrastText'}} onClick={() => minimizeApplication()}><RemoveIcon/></IconButton>
                        <IconButton className="titlebar-button" sx={{color: 'primary.contrastText'}} onClick={() => maximizeAppliction()}><SquareIcon/></IconButton>
                        <IconButton className="titlebar-button" sx={{color: 'primary.contrastText'}} onClick={() => closeApplication()}><CloseIcon/></IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar