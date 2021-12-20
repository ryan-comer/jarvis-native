import * as React from 'react'

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Box,
    Link
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
    console.log(location)

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

                <Link className='titlebar-button' href='/' underline='none' variant='h4' sx={{mr: 5}} color='primary.contrastText'>
                    Jarvis
                </Link>

                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    {pages.map((page) => (
                        <Button
                            className='titlebar-button'
                            key={page.name}
                            href={page.route}
                            sx={{mx: 2, color: 'white', display: 'block',
                                borderRadius: 0,
                                borderBottom: (location.pathname === page.route) ? '1px solid white' : ''
                            }}
                        >
                            {page.name}
                        </Button>
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