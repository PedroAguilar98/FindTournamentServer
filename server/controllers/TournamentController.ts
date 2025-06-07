import 'reflect-metadata';
import { Controller, Param, Body, Get, Post, Put, Delete, Req, Res, CurrentUser, QueryParams, BodyParam, QueryParam } from 'routing-controllers';
import { Tournament } from '../models/TournamentModel';
import { GeneralTables } from '../models/GeneralTables';
import { Op } from 'sequelize';
import { getTeamByUser } from '../helper/GetTeamByUser';
import { Match } from '../models/MatchModel';

/* const service = new TournamentService() */



@Controller()
export class TournamentController {


    @Get('/tournaments')
    async getAll(
        @CurrentUser({ required: true }) user: any, 
        @Res() response: any, 
        @QueryParam('name') name?: string,
        @QueryParam('location') location?: string,
        @QueryParam('genres') genres?: string[],
        @QueryParam('sizes') sizes?: string[],
        @QueryParam('limit') limit?: number,
        @QueryParam('categories') categories?: string[],
    ){

        const where: any = {};
        if (name) where.name = name;
        if (location) where.location = location;
        if (genres) where.c_modality = {[Op.in]: genres}
        if (sizes) where.c_players_per_team = {[Op.in]: sizes}
        if (categories) where.c_category = {[Op.in]: categories}
    
        return Tournament.findAll({
            where,
            limit:limit ?? 100,
            include:[{
                model:GeneralTables,
                attributes:['d_data'],
                as:'category_data',
                where:{
                    n_table:3
                }
            },
            {
                model:GeneralTables,
                attributes:['d_data'],
                as:'players_per_team_data',
                where:{
                    n_table:1
                }
            },
            {
                model:GeneralTables,
                attributes:['d_data'],
                as:'modality_data',
                where:{
                    n_table:2
                }
            }
        
        ],
            
        }).then((data: any) => {
            return response.json({data})
        }).catch(err=>{
            console.log("err",err);
            return "error"
        })

        
    }

    @Get('/tournamentsByTeam')
    async getByTeam(
        @CurrentUser({ required: true }) user: any,
        @Res() response: any
    ){  
        try{
            let teamByUser = null
            if(teamByUser = await getTeamByUser(user.id)){
                let match:any = await Match.findOne({
                    where:{[Op.or]:[{team_1: teamByUser.id},{team_2: teamByUser.id}]}
                })
                if(match){
                    let tournaments = await Tournament.findAll({
                        where:{
                            id:match.id_tournament,
                            c_state:'C'
                        },
                        include:[{
                            model:GeneralTables,
                            attributes:['d_data'],
                            as:'category_data',
                            where:{
                                n_table:3
                            }
                        },
                        {
                            model:GeneralTables,
                            attributes:['d_data'],
                            as:'players_per_team_data',
                            where:{
                                n_table:1
                            }
                        },
                        {
                            model:GeneralTables,
                            attributes:['d_data'],
                            as:'modality_data',
                            where:{
                                n_table:2
                            }
                        }]
                    })
                    return response.json({tournaments})
                } else {
                    return response.json({tournaments:[]})
                }

            } else {
                return response.json({tournaments:[], msg:'No tienes equipo. Busca uno para empezar a jugar'})
            }
        } catch(err){
            console.log('err', err)
            return response.json({tournaments:[], ok:false})
        }
        
    }

}