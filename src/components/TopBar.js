import * as React from 'react'

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Box
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu'

const pages = [
    {
        name: 'League of Legends',
        route: 'league_of_legends',
        selected: false
    }
]

function TopBar(){

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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

    // Go to the new route
    const goToRoute = (page) => {

    }

    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        sx={{mr: 2}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h4' component="div" sx={{mr: 5}}>Jarvis</Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => goToRoute(page)}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default TopBar