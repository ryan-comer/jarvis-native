import {
    Typography,
    Box,
    Grid,
    Paper
} from '@mui/material'

import Changelog from '../components/home/Changelog'
import AppOverview from '../components/home/AppOverview'

function Home(){
    return (
        <Box>
            <Grid container spacing={2} padding={5}>
                <Grid item xs={12} sx={{marginBottom: 2}}>
                    <Box sx={{px: 16}}>
                        <AppOverview color='primary.contrastText'/>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{padding: 2}}>
                        <Changelog/>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home