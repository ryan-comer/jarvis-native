import {
    Box,
    Typography
} from '@mui/material'

import ChangelogItem from './ChangelogItem'

function Changelog(props){
    const changelog = require('./changelog.json')

    return (
        <Box>
            <Box sx={{marginBottom: 1}}>
                <Typography variant='h4'>
                    What's new?
                </Typography>
            </Box>
            <Box sx={{marginBottom: 1, borderRadius: 1, backgroundColor: 'primary.light', height: 2}}>
            </Box>
            {changelog.map(change => (
                <Box sx={{marginBottom: 1}}>
                    <ChangelogItem change={change}/>
                </Box>
            ))}
        </Box>
    )
}

export default Changelog