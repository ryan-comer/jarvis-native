import {
    Box,
    Typography
} from '@mui/material'

function AppOverview(props){
    return (
        <Box>
            <Typography color={props.color} variant='h3' align='center' sx={{
                marginBottom: 4
            }}>Jarvis</Typography>
            <Typography variant='body1' component='p' color={props.color} align='center'>
                Jarvis is a general purpose companion app for gamers that want an improved experience while 
                playing their favorite games. Click on each of the tabs at the top to learn more about what Jarvis can do for you.
            </Typography>
        </Box>
    )
}

export default AppOverview