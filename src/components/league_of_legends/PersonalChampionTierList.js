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
    Grid,
    Button,
    FormControl,
    InputLabel
} from "@mui/material"

import {
    addPersonalTierListChampion,
    removePersonalTierListChampion,
    setPersonalTierListChampions,
    addChampionGroup,
    removeChampionGroup,
    setChampionGroup
} from '../../features/league_of_legends/championsSlice'

import CloseIcon from "@mui/icons-material/Close"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

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
import CreateGroupPopout from "./CreateGroupPopout"
import ManageGroupsPopout from "./ManageGroupsPopout"

const PERSONAL_CHAMPION_TIER_LIST_SELECTION_KEY = "PERSONAL_CHAMPION_TIER_LIST_SELECTION"
const CHAMPION_GROUPS_SELECTION_KEY = "CHAMPION_GROUPS_SELECTION_KEY"

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

// Sorting methods
const RANK_SORT = 'RANK_SORT'
const TIER_SORT = 'TIER_SORT'
const WINRATE_SORT = 'WINRATE_SORT'
const PICKRATE_SORT = 'PICKRATE_SORT'
const BANRATE_SORT = 'BANRATE_SORT'
const GAMES_SORT = 'GAMES_SORT'

function PersonalChampionTierList(props){
    const dispatch = useDispatch()

    // 1 - ascending
    // -1 - descending
    const [sortingOrder, setSortingOrder] = useState(1)
    const [sortingMethod, setSortingMethod] = useState(RANK_SORT)

    const [selectedRole, setSelectedRole] = useState(null)
    const [selectedRank, setSelectedRank] = useState(PLATINUM_PLUS_TIER)
    const [selectedGroup, setSelectedGroup] = useState(null)

    const [showCreateGroup, setShowCreateGroup] = useState(false)
    const [showManageGroups, setShowManageGroups] = useState(false)

    const champions = useSelector((state) => state.leagueChampions)

    init()

    function init(){
        let personalTierListChampions = champions.personalTierListChampions
        if(!personalTierListChampions){
            // Check if you can load from localstorage
            const localStorageList = JSON.parse(localStorage.getItem(PERSONAL_CHAMPION_TIER_LIST_SELECTION_KEY))
            if(localStorageList){
                dispatch(setPersonalTierListChampions(localStorageList))
            }
        }else{
            localStorage.setItem(PERSONAL_CHAMPION_TIER_LIST_SELECTION_KEY, JSON.stringify(personalTierListChampions))
        }

        let championGroups = champions.championGroups
        if(!championGroups){
            // Check if you can load from localstorage
            const localStorageGroups = JSON.parse(localStorage.getItem(CHAMPION_GROUPS_SELECTION_KEY))
            if(localStorageGroups){
                dispatch(setChampionGroup(localStorageGroups))
            }
        }else{
            localStorage.setItem(CHAMPION_GROUPS_SELECTION_KEY, JSON.stringify(championGroups))
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

    function setSort(newMethod){
        if(sortingMethod === newMethod){
            setSortingOrder(sortingOrder * -1)
        }else{
            setSortingMethod(newMethod)
            setSortingOrder(1)
        }
    }

    // Open up the dialog to make a new group with the selected champions
    function openCreateGroupDialog(){
        if(champions.personalTierListChampions?.length > 0){
            setShowCreateGroup(true)
        }
    }

    // Open up a dialog to manage the groups
    function openManageGroupsDialog(){
        if(champions.championGroups && (Object.keys(champions.championGroups).length > 0)){
            setShowManageGroups(true)
        }
    }

    // Function to sort champions based on tier
    function sortChampions(championOne, championTwo){
        let championOneCriteria = null
        let championTwoCriteria = null

        switch(sortingMethod){
            case RANK_SORT:
                championOneCriteria = props.championTierListData['cid'][championOne.key]['rank']
                championTwoCriteria = props.championTierListData['cid'][championTwo.key]['rank']
            break
            case TIER_SORT:
                championOneCriteria = props.championTierListData['cid'][championOne.key]['tierIndex']
                championTwoCriteria = props.championTierListData['cid'][championTwo.key]['tierIndex']
            break
            case WINRATE_SORT:
                championOneCriteria = props.championTierListData['cid'][championOne.key]['winRate']
                championTwoCriteria = props.championTierListData['cid'][championTwo.key]['winRate']
            break
            case PICKRATE_SORT:
                championOneCriteria = props.championTierListData['cid'][championOne.key]['pickRate']
                championTwoCriteria = props.championTierListData['cid'][championTwo.key]['pickRate']
            break
            case BANRATE_SORT:
                championOneCriteria = props.championTierListData['cid'][championOne.key]['banRate']
                championTwoCriteria = props.championTierListData['cid'][championTwo.key]['banRate']
            break
            case GAMES_SORT:
                championOneCriteria = props.championTierListData['cid'][championOne.key]['numGames']
                championTwoCriteria = props.championTierListData['cid'][championTwo.key]['numGames']
            break
        }

        if(championOneCriteria > championTwoCriteria){
            return sortingOrder
        }else if(championOneCriteria < championTwoCriteria){
            return (-1 * sortingOrder)
        }else{
            return 0
        }
    }

    // Create a new group for the current champions
    function createGroup(groupName){
        if(champions.championGroups && Object.keys(champions.championGroups).includes(groupName)){
            console.log(`${groupName} already exists`)
            return
        }

        const newGroup = {}
        newGroup[groupName] = champions.personalTierListChampions.map((champion => champion.key))
        
        dispatch(addChampionGroup(newGroup))

        setShowCreateGroup(false)
    }

    // Group selected by the user
    function groupSelected(e){
        const groupName = e.target.value

        // Set the tier list champions
        const newTierListChampions = champions.championGroups[groupName].map(championId => {
            return Object.values(props.championData).filter(champion => champion.key === championId)[0]
        })
        dispatch(setPersonalTierListChampions(newTierListChampions))
    }

    // Edit Group
    function editGroup(){

    }

    // Delete Group
    function deleteGroup(groupName){
        dispatch(removeChampionGroup(groupName))
        setSelectedGroup(null)
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

            <Box sx={{display: 'flex', alignItems: 'center', marginBottom: 5}}>
                <Box sx={{mr: 3}} component='span'>
                    <Box component='span' sx={{'&:hover': {cursor: 'pointer'}}} onClick={() => roleSelected(TOP_LANE)}>
                        <img style={{border: selectedRole === TOP_LANE ? '2px solid gray' : 'none', borderRadius: '5px', padding: selectedRole === TOP_LANE ? '2px' : '4px'}} src={process.env.PUBLIC_URL + '/images/league_of_legends/top.png'}/>
                    </Box>
                    <Box component='span' sx={{'&:hover': {cursor: 'pointer'}}} onClick={() => roleSelected(JUNGLE_LANE)}>
                        <img style={{border: selectedRole === JUNGLE_LANE ? '2px solid gray' : 'none', borderRadius: '5px', padding: selectedRole === JUNGLE_LANE ? '2px' : '4px'}} src={process.env.PUBLIC_URL + '/images/league_of_legends/jungle.png'}/>
                    </Box>
                    <Box component='span' sx={{'&:hover': {cursor: 'pointer'}}} onClick={() => roleSelected(MIDDLE_LANE)}>
                        <img style={{border: selectedRole === MIDDLE_LANE ? '2px solid gray' : 'none', borderRadius: '5px', padding: selectedRole === MIDDLE_LANE ? '2px' : '4px'}} src={process.env.PUBLIC_URL + '/images/league_of_legends/mid.png'}/>
                    </Box>
                    <Box component='span' sx={{'&:hover': {cursor: 'pointer'}}} onClick={() => roleSelected(BOT_LANE)}>
                        <img style={{border: selectedRole === BOT_LANE ? '2px solid gray' : 'none', borderRadius: '5px', padding: selectedRole === BOT_LANE ? '2px' : '4px'}} src={process.env.PUBLIC_URL + '/images/league_of_legends/bot.png'}/>
                    </Box>
                    <Box component='span' sx={{'&:hover': {cursor: 'pointer'}}} onClick={() => roleSelected(SUPPORT_LANE)}>
                        <img style={{border: selectedRole === SUPPORT_LANE ? '2px solid gray' : 'none', borderRadius: '5px', padding: selectedRole === SUPPORT_LANE ? '2px' : '4px'}} src={process.env.PUBLIC_URL + '/images/league_of_legends/supp.png'}/>
                    </Box>
                </Box>
                <Select autoWidth value={selectedRank} onChange={rankSelected} sx={{marginRight: 5}}>
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
            </Box>
            <Box sx={{display: 'flex', alignItems: 'end'}}>
                <FormControl variant="standard" sx={{minWidth: 200, marginRight: 2}}>
                    <InputLabel id="label-group-id">Group</InputLabel>
                    <Select value={selectedGroup} onChange={groupSelected} label="Group" labelId="label-group-id">
                        {champions.championGroups && Object.keys(champions.championGroups).map(groupName => (
                            <MenuItem value={groupName}>
                                <Typography>{groupName}</Typography>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button color='secondary' variant='contained' onClick={() => openCreateGroupDialog()} sx={{marginRight: 2}}>
                    <AddIcon sx={{marginRight: 2}}/>
                    New Group
                </Button>
                <Button color='secondary' variant='outlined' onClick={() => openManageGroupsDialog()} sx={{marginRight: 2}}>
                    Manage Groups
                </Button>
            </Box>

            <List sx={{width: 1}}>
                <ListItem sx={{backgroundColor: 'primary.main', borderRadius: 3, marginBottom: 1, display: 'flex'}}>
                    <Grid container>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{display: 'inline', color: 'primary.contrastText'}}>Rank</Typography>
                            <IconButton onClick={() => setSort(RANK_SORT)}><ArrowDropDownIcon sx={{display: 'inline', color: 'primary.contrastText'}}/></IconButton>
                        </Grid>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{color: 'primary.contrastText'}}>Image</Typography>
                        </Grid>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{color: 'primary.contrastText'}}>Name</Typography>
                        </Grid>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{color: 'primary.contrastText'}}>Tier</Typography>
                            <IconButton onClick={() => setSort(TIER_SORT)}><ArrowDropDownIcon sx={{display: 'inline', color: 'primary.contrastText'}}/></IconButton>
                        </Grid>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{color: 'primary.contrastText'}}>Win Rate</Typography>
                            <IconButton onClick={() => setSort(WINRATE_SORT)}><ArrowDropDownIcon sx={{display: 'inline', color: 'primary.contrastText'}}/></IconButton>
                        </Grid>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{color: 'primary.contrastText'}}>Pick Rate</Typography>
                            <IconButton onClick={() => setSort(PICKRATE_SORT)}><ArrowDropDownIcon sx={{display: 'inline', color: 'primary.contrastText'}}/></IconButton>
                        </Grid>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{color: 'primary.contrastText'}}>Ban Rate</Typography>
                            <IconButton onClick={() => setSort(BANRATE_SORT)}><ArrowDropDownIcon sx={{display: 'inline', color: 'primary.contrastText'}}/></IconButton>
                        </Grid>
                        <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography sx={{color: 'primary.contrastText'}}>Games</Typography>
                            <IconButton onClick={() => setSort(GAMES_SORT)}><ArrowDropDownIcon sx={{display: 'inline', color: 'primary.contrastText'}}/></IconButton>
                        </Grid>
                    </Grid>
                </ListItem>
                {props.championTierListData && champions.personalTierListChampions?.slice().sort(sortChampions).filter((champion) => {
                    return true
                }).map((champion) => (
                    <ListItem sx={{backgroundColor: 'primary.light', borderRadius: 3, marginBottom: 1, display: 'flex'}}>
                        <Grid container>
                            <Grid item xs={1} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography sx={{color: 'primary.contrastText'}}>{props.championTierListData ? props.championTierListData['cid'][champion.key]['rank'] : ''}</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <img style={{maxWidth: 60}} src={champion.image.url}/>
                            </Grid>
                            <Grid item xs={1} justify="center" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography variant="h5" sx={{color: 'primary.contrastText'}}>{champion.name}</Typography>
                            </Grid>
                            <Grid item xs={1} justify="center" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography sx={{color: 'primary.contrastText'}}>{props.championTierListData ? props.championTierListData['cid'][champion.key]['tier'] : ''}</Typography>
                            </Grid>
                            <Grid item xs={1} justify="center" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography sx={{color: 'primary.contrastText'}}>{props.championTierListData ? props.championTierListData['cid'][champion.key]['winRate'].toFixed(2) : ''}</Typography>
                            </Grid>
                            <Grid item xs={1} justify="center" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography sx={{color: 'primary.contrastText'}}>{props.championTierListData ? props.championTierListData['cid'][champion.key]['pickRate'].toFixed(2) : ''}</Typography>
                            </Grid>
                            <Grid item xs={1} justify="center" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography sx={{color: 'primary.contrastText'}}>{props.championTierListData ? props.championTierListData['cid'][champion.key]['banRate'].toFixed(2) : ''}</Typography>
                            </Grid>
                            <Grid item xs={1} justify="center" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                <Typography sx={{color: 'primary.contrastText'}}>{props.championTierListData ? props.championTierListData['cid'][champion.key]['numGames'] : ''}</Typography>
                            </Grid>
                            <Grid item xs></Grid>
                            <Grid item xs={1} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'end'}}>
                                <IconButton sx={{width: 40, height: 40}}><CloseIcon sx={{color: 'primary.contrastText'}} onClick={() => removeChampion(champion)}/></IconButton>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>

            <Box sx={{
                display: showCreateGroup ? 'block' : 'none',
                position: 'fixed',
                left: '35%',
                top: '40%',
                right: '35%',
                backgroundColor: 'white',
                borderSize: 1,
                borderStyle: 'solid',
                padding: 3,
                borderRadius: 3
            }}>
                <CreateGroupPopout onCreate={(groupName) => createGroup(groupName)} onCancel={() => setShowCreateGroup(false)}/>
            </Box>
            <Box sx={{
                display: showManageGroups ? 'block' : 'none',
                position: 'fixed',
                left: '35%',
                top: '40%',
                right: '35%',
                backgroundColor: 'white',
                borderSize: 1,
                borderStyle: 'solid',
                padding: 3,
                borderRadius: 3
            }}>
                <ManageGroupsPopout groups={champions.championGroups} 
                onClose={() => setShowManageGroups(false)}
                onDelete={(groupName) => deleteGroup(groupName)}/>
            </Box>
        </Box>
    )
}


export default PersonalChampionTierList