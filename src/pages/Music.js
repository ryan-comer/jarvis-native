import {
    Box,
    Typography,
    Grid,
    Paper
} from '@mui/material'

function Music(){
    return (
        <Box>
            <Grid container spacing={2} padding={5}>
                <Grid item xs={12}>
                    <Paper sx={{padding: 2}}>
                        <Typography variant="h3">Music</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Music