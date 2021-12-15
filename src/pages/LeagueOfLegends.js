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

const LEAGUE_VERSION_URL = 'https://ddragon.leagueoflegends.com/api/versions.json'

const axios = require('axios')

function LeagueOfLegends(){
    const [championTierListData, setChampionTierListData] = useState(null)
    const [championData, setChampionData] = useState(null)

    const [currentRole, setRole] = useState(DEFAULT_LANE)
    const [currentTier, setTier] = useState(PLATINUM_PLUS_TIER)

    const [leagueVersion, setLeagueVersion] = useState(null)

    useEffect(() => {
        init()
    })

    async function handleRoleChange(newRole){
        setRole(newRole)

        const tierListData = await GetChampionTierListData(currentTier, newRole, leagueVersion)
        setChampionTierListData(tierListData)
    }

    async function handleTierChange(newTier){
        setTier(newTier)

        const tierListData = await GetChampionTierListData(newTier, currentRole, leagueVersion)
        setChampionTierListData(tierListData)
    }

    async function init(){
        if(!leagueVersion){
            let newVersion = await axios.get(LEAGUE_VERSION_URL)
            newVersion = newVersion.data[0].split('.').slice(0, 2).join('.')
            setLeagueVersion(newVersion)
            return
        }

        if(!championData){
            const champions = await GetChampions(leagueVersion)
            setChampionData(champions)
            return
        }

        if(!championTierListData){
            const champions = await GetChampions(leagueVersion)
            const tierListData = await GetChampionTierListData(currentTier, currentRole, leagueVersion)
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