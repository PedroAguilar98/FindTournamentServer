import { Player } from "../models/PlayerModel"
import { Team } from "../models/TeamModel"

export const getTeamByUser = async (id_user:string) =>{
    return Player.findOne({
        attributes:['id_team'],
        where:{
            id_user
        },
        include:{
            model:Team,
        }
    }).then((data:any)=>{
        return data.team
    }).catch(err=>{
        console.log("error en getTeambyuser", err)
        return null
    })
}