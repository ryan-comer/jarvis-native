import {configureStore} from '@reduxjs/toolkit'
import leagueChampionsReducer from '../features/league_of_legends/championsSlice'

export default configureStore({
    reducer: {
        leagueChampions: leagueChampionsReducer
    },
})