import {
    Box,
    Typography,
    TextField,
    Button
} from '@mui/material'

import {
    useState
} from 'react'

function CreateGroupPopout(props){
    const [groupName, setGroupName] = useState('')

    function createGroup(){
        props.onCreate(groupName)
        setGroupName('')
    }

    return (
        <Box sx={{textAlign: 'center'}}>
            <Typography variant="p">Saves the currently selected champions into a group</Typography>
            <TextField value={groupName} onInput={(e) => setGroupName(e.target.value)} variant='standard' placeholder='Group Name' sx={{marginBottom: 2, width: '80%'}}/>
            <Box sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center'
            }}>
                <Button color="secondary" variant="contained" onClick={() => createGroup()}>Create Group</Button>
                <Button variant="outlined" onClick={() => props.onCancel()}>Cancel</Button>
            </Box>
        </Box>
    )
}

export default CreateGroupPopout