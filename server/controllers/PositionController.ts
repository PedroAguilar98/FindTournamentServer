import { Get, JsonController, QueryParam, Res } from "routing-controllers";
import { Tournament } from "../models/TournamentModel";
import { GeneralTables } from "../models/GeneralTables";
import { Position } from "../models/PositionModel";
import { Team } from "../models/TeamModel";

@JsonController()
export class PositionController {
    @Get('/positionsTable')
    async getPositionsTable( @Res() response: any,  @QueryParam('id_tournament') id_tournament: number,){
        try{
            const tournament:any = await Tournament.findOne({
                attributes:['name', 'image'],
                where:{
                    id:id_tournament
                },
                include:[
                    {
                        model:GeneralTables,
                        attributes:['d_data'],
                        as:'players_per_team_data'
                    },
                    {
                        model:GeneralTables,
                        attributes:['d_data'],
                        as:'state'
                    }
                ]
            })
            const positions:any[] = await Position.findAll({
                attributes:['matches_played', 'matches_won', 'matches_defeated', 'matches_tied'],
                where:{id_tournament},
                include:
                    {
                        model:Team,
                        attributes:['name', 'id']
                    }
            })
            return response.json({ok:true, positions, tournament:tournament})
        } catch(err){
            console.log("error en getPositionsTable", err)
            return response.json({ok:false})
        }
        
    }
}