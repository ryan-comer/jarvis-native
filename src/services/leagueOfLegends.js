import { ConstructionOutlined } from '@mui/icons-material'

const axios = require('axios')

const DDRAGON_CDN_URL = 'http://ddragon.leagueoflegends.com/cdn'
const LEAGUE_VERSION = '11.24'
const DDRAGON_IMG_PATH = '/img/champion/'
const DDRAGON_CHAMPIONS_PATH = '/data/en_US/champion.json'

const LOLALYTICS_URL = 'https://axe.lolalytics.com/tierlist/1'

// LANE NAMES
const DEFAULT_LANE = 'default'
const TOP_LANE = 'top'
const JUNGLE_LANE = 'jungle'
const MIDDLE_LANE = 'middle'
const SUPPORT_LANE = 'support'
const BOT_LANE = 'bottom'

// TIER NAMES
const IRON_TIER = 'iron'
const BRONZE_TIER = 'bronze'
const SILVER_TIER = 'silver'
const GOLD_TIER = 'gold'
const PLATINUM_TIER = 'platinum'
const DIAMOND_TIER = 'diamond'
const MASTER_TIER = 'master'
const GRANDMASTER_TIER = 'grandmaster'
const CHALLENGER_TIER = 'challenger'
const GOLD_PLUS_TIER = 'gold_plus'
const MASTER_PLUS_TIER = 'master_plus'
const DIAMOND_PLUS_TIER = 'diamond_plus'
const DIAMOND2_PLUS_TIER = 'd2_plus'
const PLATINUM_PLUS_TIER = 'platinum_plus'
const ALL_TIERS = 'all'


async function pullChampionData(){
    // Get the champion data
    let championData = await axios.get(`${DDRAGON_CDN_URL}/${LEAGUE_VERSION}.1${DDRAGON_CHAMPIONS_PATH}`)
    championData = championData.data.data
    for(let key in championData){
        championData[key].image.url = `${DDRAGON_CDN_URL}/${LEAGUE_VERSION}.1${DDRAGON_IMG_PATH}${championData[key].image.full}`
    }

    return championData
}

// Get a mapping of champion ID to tier list data
// Data format [rank, PBI, tier_index(0 -> S+, 1 -> S, ...), ?, num_games, ?, ban_rate, rank (best_worldwide), win_rate(best_worldwide), games(best_worldwide), ?]
async function GetChampionTierListData(tier, lane){
    const parameters = new URLSearchParams({
        lane,
        tier,
        patch: LEAGUE_VERSION,
        queue: '420',
        region: 'all'
    })

    const URL = `${LOLALYTICS_URL}?${parameters.toString()}`
    console.log(URL)

    const response = await axios.get(URL)

    return response.data
}

// Get the champion data from the u.gg site
async function GetChampions(){
    return (await pullChampionData())
}

export {
    GetChampions,
    GetChampionTierListData,

    // Lanes
    DEFAULT_LANE,
    TOP_LANE,
    JUNGLE_LANE,
    MIDDLE_LANE,
    BOT_LANE,
    SUPPORT_LANE,

    // Tiers
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
    MASTER_PLUS_TIER,
    DIAMOND_PLUS_TIER,
    DIAMOND2_PLUS_TIER,
    PLATINUM_PLUS_TIER,
    ALL_TIERS
}