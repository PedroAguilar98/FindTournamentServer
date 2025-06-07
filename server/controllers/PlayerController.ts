import { Body, CurrentUser, Get, JsonController, Param, Patch, Post, Put, Res } from "routing-controllers";
import { Team } from "../models/TeamModel";
import { Player } from "../models/PlayerModel";
import { User } from "../models/UserModel";
import { sequelize } from "../db";
import { getPositionLogic } from "../helper/PositionLogic";
import { where } from "sequelize";


const getTeamByUser = async (id_user:string) =>{
    return Player.findOne({
        attributes:['id_team'],
        where:{
            id_user
        },
        include:{
            model:Team,
            /* attributes:['name', 'icon','id_formation', 'c_size'] */
        }
    }).then((data:any)=>{
        console.log("dataa", data.team)
        return data.team
    }).catch(err=>{
        console.log("error en getTeambyuser", err)
        return null
    })
}

const getPlayersByTeam = async (id_team:number) =>{
    return Player.findAll({
        include:[{
            model:Team,
            attributes:[],
            where:{
                id:id_team
            }
        },{
            model:User,
            attributes:['name', 'last_name'],
        }]
    }).then(data=>{
        return data;
    }).catch(err=>{
        console.log("erro en getplayerbyteam", err)
    })
}

@JsonController()
export class PlayerController {
    @Get('/players')
    async getPerTeam(@CurrentUser({ required: true }) user: any, @Res() response: any){
        try{
            let teamByUser = null
            if(teamByUser = await getTeamByUser(user.id)){
                const {id} = teamByUser;
                if(id){
                    const players = await getPlayersByTeam(id)
                    return response.json({ok:true, players, team:teamByUser})
                }
                return response.json({ok:true, players:[]})
            } else {
                return response.json({ok:false})
            }
            
        } catch (err:any){
            console.log("error", err)
            return response.json({ok:false})
        }
        
    }

    @Patch('/players/:id')
      async patchPlayersPerTeam( @Body() body: any, @Param('id') team_id:number) {
        const t = await sequelize.transaction();
        try{
            const team = body.team
            await Team.update({id_formation:team?.id_formation, c_size:team?.c_size, icon:team?.icon}, {where:{id:team_id}});
            for(let player of body.players){
                if(!player.id_team && !player.id_user){
                    await Player.destroy({where:{id:player.id}});
                } else {
                    await Player.update(player, {where:{id:player.id}});
                }
            }
            t.commit()
            return {ok:true}
        } catch (err:any){
            t.rollback()
            console.log("error", err)
            return {ok:false}
        }  
    }

    async getPositionsPerTeam(id_team:number){
        try{
            const players:any[] = await Player.findAll({where:{id_team}})
            return players.map(player=>player?.position)
        }catch(err){
            console.log("err",err)
        }
    }

    @Post('/player')
    async addPlayer( @Body() player: any) {
        try{
            const positionsTaken = await this.getPositionsPerTeam(player.id_team)
            console.log("player", player)
            console.log("positionsTaken", positionsTaken)
            player.position = getPositionLogic(player.position, positionsTaken ?? [])
            player.id = null
            return await Player.create(
                player
            )
        } catch(err:any) {
            console.log("err",err)
        }
        
    }

    @Patch('/player/:id')
    async updatePlayerTeam(@Body() body: any, @Param('id') id:number){
        //Incorporar lógica para solicitar unirse

        const id_team = body.id_team
        try{
            const updated = await Player.update(
                {
                    id_team,
                    is_captain:false
                },
                {
                where:{id}
            })
            return {ok:true}
        } catch(err){
            console.log("err", err)
        }
    }

}