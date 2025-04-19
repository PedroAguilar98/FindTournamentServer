
import { Controller, Param, Body, Get, Post, Put, Delete, Req, Res, BodyParam, UseBefore, JsonController, CurrentUser, Patch} from 'routing-controllers';
import { Team } from '../models/TeamModel';

@JsonController()
export class TeamController {
  @Get('/teams')
  async getAll(@Res() response: any) {
    return await Team.findAll().then(data=>{
      return response.json({
        ok:true,
        data
      })
    }).catch(err=>{
      return response.json({
        ok:false,
        err
      })
    })
  }


  @Post('/teams')
  async post(@Body() team: any, @Res() response: any) {
    return await Team.create(team).then(()=>{
        return response.json({
          ok:true
        })
          
        }).catch(err=>{
          return response.json({
            ok:false,
            err
          })
            
        })
  }

  @Patch('/teams/:id')
  async patchTeam(@Param('id') id: number, @Body() body: any[]) {
    try{
      return await Team.update(body, {where:{id}}); 
    } catch(err:any) {
      console.log("err", err)
    }
    
}
}