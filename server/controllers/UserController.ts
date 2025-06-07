import 'reflect-metadata';
import { User } from '../models/UserModel';
import { Controller, Param, Body, Get, Post, Put, Delete, Req, Res, BodyParam, UseBefore, JsonController, CurrentUser } from 'routing-controllers';
import { json } from 'body-parser'
import jwt from 'jsonwebtoken';
import { Sequelize } from 'sequelize';
import { Player } from '../models/PlayerModel';
import { sequelize } from '../db'
import { Team } from '../models/TeamModel';
import { getPositionLogic } from '../helper/PositionLogic';


@JsonController()
export class UserController {
  @Get('/users')
  getAll() {
    return 'This action returns all users';
  }

  @Get('/users/:user')
  async getOne(@Param('user') user: string, @Res() response: any) {
    return await User.findOne({
      where: {
        mail: user
      }
    }).then(data => {
      if (data) {
        return response.json({
          data
        })
      } else {
        return response.json({
          data: null
        })
      }
    }).catch(err => {
      console.log('Err', err)
    })
  }

  @Post('/users')
  async post(@Body() user: any, @Res() response: any) {
    const t = await sequelize.transaction();
    try {
      await User.create(user.user, { transaction: t }).then(async (result: any) => {
        console.log("userr", user.user)
        const main_user = user.user;
        const players = user.players;
        let positionsTaken:number[] = [main_user.position]
        if (!main_user.isAdmin) {
          let team: any = null;
          if (!main_user.idTeam && main_user.newTeam) {
            team = await Team.create({ name: main_user.teamName, victories: 0, defeats: 0, ties: 0, titles: 0, goals: 0, is_public: false }, { transaction: t })
          }
          for (let player of players) {
            if (player.mail == main_user.mail) {
              await Player.create({
                id_team: team ? team.id : main_user.idTeam, id_user: result.id,
                victories: 0, defeats: 0, ties: 0, goals: 0, is_captain: true,
                position:main_user.position
              }, { transaction: t })
            } else {


              if (player.id_user) {
                //si tiene un mail, se busca si ya existe para mandar un mensaje al usuario de la cuenta
                //no crea jugador, manda mensaje al usuario existente
                /* const exist_user:any = await User.findOne({ where: { mail: players[i].mail },transaction:t })
                if (exist_user && exist_user.mail == main_user.mail) {
                  
                  
                } else {
                  await Player.create({
                    id_team: team?team.id:team, name: players[i].name, last_name: players[i].last_name,
                    victories: 0, defeats: 0, ties: 0, goals: 0, is_captain: false
                  }, { transaction: t })
                } */
              } else {
                await Player.create({
                  id_team: team ? team.id : team, name: player.name, last_name: player.last_name,
                  victories: 0, defeats: 0, ties: 0, goals: 0, is_captain: false, position:getPositionLogic(player.position, positionsTaken)
                }, { transaction: t })
              }
            }


          }

        }
      })
      t.commit()
      return response.json({ ok: true })
    } catch (err) {
      t.rollback();
      console.log("error en registro", err)
      return response.json({ ok: false })
    }

  }

  @Post('/users/login')
  async login(@Body() user: any, @Res() response: any) {
    const { password } = user.data
    const { mail } = user.data
    try {
      return await Player.findOne({
        attributes:['id','is_captain', 'id_team'],
        include:{
          model:User,
          where: {
            mail,
            password
          },
        }
      }).then((data: any) => {
        if (data) {
          const payload = {
            id: data?.user.id,
            mail: mail,
            password: password
          }
          var token = jwt.sign(payload, 'secret_key');
          return response.json({
            ok: true,
            token,
            id_player:data.id,
            is_captain:data.is_captain,
            id_team:data.id_team
          })
        } else {
          return response.json({
            ok: false
          })
        }

      })
    } catch(err:any) {
      console.log("err en login",err)
      return response.json({
        ok: false
      })
    }
  }

  @Put('/users/:id')
  put(@Param('id') id: number, @Body() user: any) {
    return 'Updating a user...';
  }

  @Delete('/users/:id')
  remove(@Param('id') id: number) {
    return 'Removing user...';
  }
}