import {createSlice} from '@reduxjs/toolkit'

export const championsSlice = createSlice({
    name: 'leagueChampions',
    initialState: {
        allChampions: null,
        personalTierListChampions: null
    },
    reducers: {
        // Set the all champions list for user selection
        setAllChampions: (state, action) => {
            state.allChampions = action.payload
        },
        // Set the personal tier list champions
        setPersonalTierListChampions: (state, action) => {
            state.personalTierListChampions = action.payload
        },
        // Add a champion to the personal tier list
        addPersonalTierListChampion: (state, action) => {
            if(!state.personalTierListChampions){
                state.personalTierListChampions = []
            }

            if(state.personalTierListChampions.filter(champion => champion.name === action.payload.name).length === 0){
                state.personalTierListChampions.push(action.payload)
            }
        },
        // Remove a champion from the personal tier list
        removePersonalTierListChampion: (state, action) => {
            if(!state.personalTierListChampions) return

            state.personalTierListChampions = state.personalTierListChampions.filter(champion => {
                return champion.name !== action.payload.name
            })
        }
    }
})

export const {setAllChampions, addPersonalTierListChampion, removePersonalTierListChampion, setPersonalTierListChampions} = championsSlice.actions
export default championsSlice.reducer