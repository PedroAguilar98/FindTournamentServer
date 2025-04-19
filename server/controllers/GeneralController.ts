import { Get, JsonController, Res } from "routing-controllers";
import { Formation } from "../models/FormationModel";
import { GeneralTables } from "../models/GeneralTables";

@JsonController()
export class GeneralController {
    @Get('/formations')
      async getAllFormations(@Res() response: any) {
        return await Formation.findAll().then(data=>{
          return response.json({
            ok:true,
            data
          })
        }).catch(err=>{
            console.log("error formations", err)
          return response.json({
            ok:false,
            err
          })
        })
    }

    @Get('/teamSizes')
      async getAllSizes(@Res() response: any) {
        return await GeneralTables.findAll({
          attributes:['c_data','d_data'],
          where:{
            n_table: 1
          }
        }).then(data=>{
          return response.json({
            ok:true,
            data
          })
        }).catch(err=>{
            console.log("error formations", err)
          return response.json({
            ok:false,
            err
          })
        })
    }
}