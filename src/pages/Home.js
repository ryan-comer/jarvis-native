import {
    Typography,
    Box,
    Grid,
    Paper
} from '@mui/material'

function Home(){
    return (
        <Box>
            <Grid container spacing={2} padding={5}>
                <Grid item xs={12}>
                    <Paper sx={{padding: 2}}>
                        <Typography variant='h3'>Home</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home