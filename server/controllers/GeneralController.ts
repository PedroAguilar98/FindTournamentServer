import { Get, JsonController, QueryParam, Res } from "routing-controllers";
import { Formation } from "../models/FormationModel";
import { GeneralTables } from "../models/GeneralTables";
import { Op } from "sequelize";

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
    @Get('/generalData')
      async getGeneralData(@QueryParam('tables') tables: number[],@Res() response: any) {
        return await GeneralTables.findAll({
          attributes:['c_data','d_data', 'n_table'],
          where:{
            n_table:{[Op.in]:tables}
          }
        }).then((res:any[])=>{
          const groupbyTable:any = {};

          for (const item of res) {
            if (!groupbyTable[item.n_table]) {
              groupbyTable[item.n_table] = [];
            }
            groupbyTable[item.n_table].push(item);
          }
          return response.json({
            ok:true,
            data:groupbyTable
          })
        }).catch(err=>{
          console.log("error genres", err)
          return response.json({
            ok:false,
            err
          })
        })
      }
}