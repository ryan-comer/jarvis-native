import {
    Box,
    IconButton,
    Typography
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'

function ManageGroupsPopout(props){
    return (
        <Box sx={{marginTop: 3}}>
            <IconButton sx={{position: 'absolute', top: '5%', right: '5%'}} onClick={() => props.onClose()}><CloseIcon/></IconButton>
            <Typography variant="h6" sx={{marginBottom: 1}}>Delete your created groups</Typography>
            <Box sx={{maxHeight: 200, overflowY: 'auto'}}>
                {props.groups && Object.keys(props.groups).map(groupName => (
                    <Box sx={{border: '1px solid lightgray', borderRadius: 3, padding: 1, display: 'flex'}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography variant="h6">{groupName}</Typography>
                        </Box>
                        <Box sx={{flexGrow: 1}}></Box>
                        <IconButton onClick={() => props.onDelete(groupName)}><DeleteIcon/></IconButton>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default ManageGroupsPopout