import { CurrentUser, Get, JsonController, Res } from "routing-controllers";
import { Team } from "../models/TeamModel";
import { Match } from "../models/MatchModel";
import { Op } from "sequelize";
import { Tournament } from "../models/TournamentModel";
import { getTeamByUser } from "../helper/GetTeamByUser";

const getValidMatchesByTeam = async (id_team:number, is_history:boolean) =>{
    return Match.findAll({
        where:{
            [Op.or]:[{team_1: id_team},{team_2: id_team}],
            play_date:is_history ? {[Op.lt]:new Date()} : {[Op.gte]:new Date()}
        },
        include:[{
            model:Tournament,
            attributes:['name', 'location', 'id']
        },
        {
            model: Team,
            as: 'team1',
            attributes: ['name']
        },
        {
            model: Team,
            as: 'team2',
            attributes: ['name']
        }
    ]
    }).then((data:any)=>{
        return data
    }).catch(err=>{
        console.log("error en getValidMatchesByTeam", err)
        return []
    })
}


@JsonController()
export class MatchController {
    @Get('/matches')
    async getPerTeam(@CurrentUser({ required: true }) user: any, @Res() response: any){
        let teamByUser = null
            if(teamByUser = await getTeamByUser(user.id)){
                const {id} = teamByUser;
                let matches = await getValidMatchesByTeam(id, false)
                return response.json({ok:true, matches})
            } else {
                return response.json({ok:false, matches:[]})
            }
    }

    @Get('/matchesHistory')
    async getMatchesHistory(@CurrentUser({ required: true }) user: any, @Res() response: any){
        let teamByUser = null
            if(teamByUser = await getTeamByUser(user.id)){
                const {id} = teamByUser;
                let matches = await getValidMatchesByTeam(id, true)
                let matchesResponse:any = {}
                for(let match of matches){
                    if(matchesResponse[match.id_tournament]){
                        matchesResponse[match.id_tournament].matches.push(match)
                    } else {
                        matchesResponse[match.id_tournament] = {matches:[match]}
                    }
                }
                return response.json({ok:true, matchesResponse})
            } else {
                return response.json({ok:false, matches:[]})
            }
    }
}