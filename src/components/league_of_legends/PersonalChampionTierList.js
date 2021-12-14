import { 
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    Autocomplete,
    List,
    ListItem,
    IconButton,
    Grid
} from "@mui/material"

import {
    addPersonalTierListChampion,
    removePersonalTierListChampion,
    setPersonalTierListChampions
} from '../../features/league_of_legends/championsSlice'

import CloseIcon from "@mui/icons-material/Close"

import {
    ALL_TIERS,
    IRON_TIER,
    BRONZE_TIER,
    SILVER_TIER,
    GOLD_TIER,
    PLATINUM_TIER,
    DIAMOND_TIER,
    MASTER_TIER,
    GRANDMASTER_TIER,
    CHALLENGER_TIER,
    GOLD_PLUS_TIER,
    PLATINUM_PLUS_TIER,
    DIAMOND_PLUS_TIER,
    DIAMOND2_PLUS_TIER,
    MASTER_PLUS_TIER,

    DEFAULT_LANE,
    TOP_LANE,
    JUNGLE_LANE,
    MIDDLE_LANE,
    SUPPORT_LANE,
    BOT_LANE
} from '../../services/leagueOfLegends'

import {useSelector, useDispatch} from 'react-redux'

import React, {useState, useEffect} from 'react'

const PERSONAL_CHAMPION_TIER_LIST_SELECTION_KEY = "PERSONAL_CHAMPION_TIER_LIST_SELECTION"

// Used to map tier index to a tier letter
const tiers = [
    'S+',
    'S',
    'S-',
    'A+',
    'A',
    'A-',
    'B+',
    'B',
    'B-',
    'C+',
    'C',
    'C-'
]

function PersonalChampionTierList(props){
    const dispatch = useDispatch()

    const [selectedRole, setSelectedRole] = useState(null)
    const [selectedRank, setSelectedRank] = useState(PLATINUM_PLUS_TIER)

    const champions = useSelector((state) => state.leagueChampions)

    init()

    function init(){
        let personalTierListChampions = champions.personalTierListChampions
        if(personalTierListChampions.length === 0){
            // Check if you can load from localstorage
            const localStorageList = JSON.parse(localStorage.getItem(PERSONAL_CHAMPION_TIER_LIST_SELECTION_KEY))
            if(localStorageList){
                dispatch(setPersonalTierListChampions(localStorageList))
            }
        }else{
            localStorage.setItem(PERSONAL_CHAMPION_TIER_LIST_SELECTION_KEY, JSON.stringify(personalTierListChampions))
        }
    }

    // Add a champion to the tier list
    function addChampion(champion){
        dispatch(addPersonalTierListChampion(champion))
    }

    function removeChampion(champion){
        dispatch(removePersonalTierListChampion(champion))
    }

    // User selected a new rank to sort with
    function rankSelected(e){
        setSelectedRank(e.target.value)
        props.onTierChange(e.target.value)
    }
    
    // User set their role
    function roleSelected(newRole){
        if(selectedRole === newRole){
            newRole = DEFAULT_LANE
        }

        setSelectedRole(newRole)
        props.onRoleChange(newRole)
    }

    // Function to sort champions based on tier
    function sortChampions(championOne, championTwo){
        const championOneRank = props.championTierListData['cid'][championOne.key][0]
        const championTwoRank = props.championTierListData['cid'][championTwo.key][0]

        if(championOneRank > championTwoRank){
            return 1
        }else if(championOneRank < championTwoRank){
            return -1
        }else{
            return 0
        }
    }

    return (
        <Box>
            <Typography variant="h5">Personal Champion Tier List</Typography>
            <Typography sx={{mb: 1}}>Add champions to create your own personal tier list</Typography>
            <Autocomplete
                id='champion_name'
                options={props.championData ? Object.values(props.championData) : []}
                getOptionLabel={(option) => option.name}
                sx={{maxWidth: 400, mb: 5}}
                renderOption={(props, option) => (
                    <Box component="li" alignItems='center' 
                        sx={{
                                p: 1, 
                                flexShrink: 0, 
                                'img': {mr: 2},
                                '&:hover': {
                                    cursor: 'pointer',
                                    backgroundColor: '#DDD'
                                },
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        onClick={() => addChampion(option)}
                        >
                        <img
                            loading="lazy"
                            src={option.image.url}
                            width={50}
                        />
                        <Typography variant="h5" component="span">{option.name}</Typography>
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Champion Name"
                        inputProps={{
                            ...params.inputProps
                        }}
                    />
                )}
            />

            <Box sx={{mr: 3}} component='span'>
                <Box component='span' sx={{'&:hover': {cursor: 'pointer'}}} onClick={() => roleSelected(TOP_LANE)}>
                    <img style={{border: selectedRole === TOP_LANE ? '2px solid gray' : 'none', borderRadius: '5px', padding: selectedRole === 0 ? '2px' : '4px'}} src={process.env.PUBLIC_URL + '/images/league_of_legends/top.png'}/>
                </Box>
                <Box component='span' sx={{'&:hover': {cursor: 'pointer'}}} onClick={() => roleSelected(JUNGLE_LANE)}>
                    <img style={{border: selectedRole === JUNGLE_LANE ? '2px solid gray' : 'none', borderRadius: '5px', padding: selectedRole === 1 ? '2px' : '4px'}} src={process.env.PUBLIC_URL + '/images/league_of_legends/jungle.png'}/>
                </Box>
                <Box component='span' sx={{'&:hover': {cursor: 'pointer'}}} onClick={() => roleSelected(MIDDLE_LANE)}>
                    <img style={{border: selectedRole === MIDDLE_LANE ? '2px solid gray' : 'none', borderRadius: '5px', padding: selectedRole === 2 ? '2px' : '4px'}} src={process.env.PUBLIC_URL + '/images/league_of_legends/mid.png'}/>
                </Box>
                <Box component='span' sx={{'&:hover': {cursor: 'pointer'}}} onClick={() => roleSelected(BOT_LANE)}>
                    <img style={{border: selectedRole === BOT_LANE ? '2px solid gray' : 'none', borderRadius: '5px', padding: selectedRole === 3 ? '2px' : '4px'}} src={process.env.PUBLIC_URL + '/images/league_of_legends/bot.png'}/>
                </Box>
                <Box component='span' sx={{'&:hover': {cursor: 'pointer'}}} onClick={() => roleSelected(SUPPORT_LANE)}>
                    <img style={{border: selectedRole === SUPPORT_LANE ? '2px solid gray' : 'none', borderRadius: '5px', padding: selectedRole === 4 ? '2px' : '4px'}} src={process.env.PUBLIC_URL + '/images/league_of_legends/supp.png'}/>
                </Box>
            </Box>
            <Select autoWidth value={selectedRank} onChange={rankSelected}>
                <MenuItem value={PLATINUM_PLUS_TIER}>Platinum+</MenuItem>
                <MenuItem value={DIAMOND_PLUS_TIER}>Diamond+</MenuItem>
                <MenuItem value={DIAMOND2_PLUS_TIER}>Diamond 2+</MenuItem>
                <MenuItem value={MASTER_PLUS_TIER}>Master+</MenuItem>
                <MenuItem value={ALL_TIERS}>All Ranks</MenuItem>
                <MenuItem value={CHALLENGER_TIER}>Challenger</MenuItem>
                <MenuItem value={GRANDMASTER_TIER}>Grandmaster</MenuItem>
                <MenuItem value={MASTER_TIER}>Master</MenuItem>
                <MenuItem value={DIAMOND_TIER}>Diamond</MenuItem>
                <MenuItem value={PLATINUM_TIER}>Platinum</MenuItem>
                <MenuItem value={GOLD_TIER}>Gold</MenuItem>
                <MenuItem value={SILVER_TIER}>Silver</MenuItem>
                <MenuItem value={BRONZE_TIER}>Bronze</MenuItem>
                <MenuItem value={IRON_TIER}>Iron</MenuItem>
            </Select>

            <List sx={{width: 1}}>
                <ListItem sx={{backgroundColor: 'primary.main', borderRadius: 3, marginBottom: 1, display: 'flex'}}>
                    <Grid container>
                        <Grid item xs={1}>
                            <Typography sx={{color: 'primary.contrastText'}}>Rank</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography sx={{color: 'primary.contrastText'}}>Image</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography sx={{color: 'primary.contrastText'}}>Name</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography sx={{color: 'primary.contrastText'}}>Tier</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography sx={{color: 'primary.contrastText'}}>Games</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
                {props.championTierListData && champions.personalTierListChampions.slice().sort(sortChampions).filter((champion) => {
                    return props.championTierListData ? props.championTierListData['cid'][champion.key][0] != 0 : false
                }).map((champion) => (
                    <ListItem sx={{backgroundColor: 'primary.light', borderRadius: 3, marginBottom: 1, display: 'flex'}}>
                        <Grid container>
                            <Grid item xs={1} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography sx={{color: 'primary.contrastText'}}>{props.championTierListData ? props.championTierListData['cid'][champion.key][0] : ''}</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <img style={{maxWidth: 60}} src={champion.image.url}/>
                            </Grid>
                            <Grid item xs={2} justify="center" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography variant="h5" sx={{color: 'primary.contrastText'}}>{champion.name}</Typography>
                            </Grid>
                            <Grid item xs={2} justify="center" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography sx={{color: 'primary.contrastText'}}>{props.championTierListData ? tiers[props.championTierListData['cid'][champion.key][2]-1] : ''}</Typography>
                            </Grid>
                            <Grid item xs={2} justify="center" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography sx={{color: 'primary.contrastText'}}>{props.championTierListData ? props.championTierListData['cid'][champion.key][5] : ''}</Typography>
                            </Grid>
                            <Grid item xs></Grid>
                            <Grid item xs={1} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <IconButton sx={{width: 40, height: 40}}><CloseIcon sx={{color: 'primary.contrastText'}} onClick={() => removeChampion(champion)}/></IconButton>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}


export default PersonalChampionTierList