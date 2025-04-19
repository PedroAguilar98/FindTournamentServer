import 'reflect-metadata';
import { Controller, Param, Body, Get, Post, Put, Delete, Req, Res, CurrentUser, } from 'routing-controllers';
import { Tournament } from '../models/TournamentModel';
import { GeneralTables } from '../models/GeneralTables';

/* const service = new TournamentService() */



@Controller()
export class TournamentController {


    @Get('/tournaments')
    async getAll(@CurrentUser({ required: true }) user: any, @Res() response: any){
        return Tournament.findAll({
            
            include:[{
                model:GeneralTables,
                attributes:['d_data'],
                as:'category_data'
            },
            {
                model:GeneralTables,
                attributes:['d_data'],
                as:'players_per_team_data'
            },
            {
                model:GeneralTables,
                attributes:['d_data'],
                as:'modality_data'
            }
        
        ],
            
        }).then((data: any) => {
            console.log("torneoss", data[0].general_tables)
            return response.json({data:data})
        }).catch(err=>{
            console.log("err",err);
            return "error"
        })

        
    }

}