import {
    Box,
    Typography
} from '@mui/material'

import {
    useState
} from 'react'

import ArrowDownIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpIcon from '@mui/icons-material/ArrowUpward'

function ChangelogItem(props){
    const date = new Date(props.change.timestamp * 1000)

    const [selected, setSelected] = useState(false)

    return (
        <Box>
            <Box sx={{
                padding: 2,
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                    cursor: 'pointer'
                }
            }}
            onClick={() => setSelected(!selected)}
            >
                <Typography variant="h5" sx={{color: 'primary.contrastText'}}>{props.change.version} - {date.toLocaleDateString('en-US')}</Typography>
                <Box sx={{flexGrow: 1}}/>
                {selected ? <ArrowUpIcon sx={{color: 'primary.contrastText'}}/> : <ArrowDownIcon sx={{color: 'primary.contrastText'}}/>}
            </Box>
            {selected &&
                <Box
                sx={{
                    backgroundColor: 'primary.light',
                    padding: 2
                }}
                >
                    <Typography
                    sx={{
                        color: 'primary.contrastText',
                        whiteSpace: 'pre-line'
                    }}
                    >
                        <div dangerouslySetInnerHTML={{__html: props.change.content}}/>
                    </Typography>
                </Box>
            }
        </Box>
    )
}

export default ChangelogItem