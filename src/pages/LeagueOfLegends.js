import { 
    Grid,
    Box,
    Typography,
    Card,
    Paper
} from "@mui/material"

import {
    GetChampions,
    GetChampionTierListData,
    DEFAULT_LANE,
    ALL_TIERS,
    PLATINUM_PLUS_TIER
} from '../services/leagueOfLegends'

import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import PersonalChampionTierList from "../components/league_of_legends/PersonalChampionTierList"

function LeagueOfLegends(){
    const champions = useSelector((state) => state.leagueChampions)

    const [championTierListData, setChampionTierListData] = useState(null)
    const [championData, setChampionData] = useState(null)

    let currentRole = DEFAULT_LANE
    let currentTier = PLATINUM_PLUS_TIER

    useEffect(() => {
        init()
    })

    async function handleRoleChange(newRole){
        currentRole = newRole

        const tierListData = await GetChampionTierListData(currentTier, currentRole)
        setChampionTierListData(tierListData)
    }

    async function handleTierChange(newTier){
        currentTier = newTier

        const tierListData = await GetChampionTierListData(currentTier, currentRole)
        setChampionTierListData(tierListData)
    }

    async function init(){
        if(!championData){
            const champions = await GetChampions()
            setChampionData(champions)
            return
        }

        if(!championTierListData){
            const tierListData = await GetChampionTierListData(currentTier, currentRole)
            setChampionTierListData(tierListData)
            return
        }
    }

    return (
        <Box>
            <Grid container spacing={2} padding={5}>
                <Grid item xs={12}>
                    <Paper sx={{padding: 2}}>
                        <PersonalChampionTierList championData={championData} championTierListData={championTierListData}
                            onRoleChange={(newRole) => handleRoleChange(newRole)}
                            onTierChange={(newTier) => handleTierChange(newTier)}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default LeagueOfLegends