import { DataTypes } from 'sequelize';
import {sequelize} from '../db'
import { Tournament } from './TournamentModel';
import { Team } from './TeamModel';


export const Match = sequelize.define('matches', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    id_tournament:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    team_1:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    team_2:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    play_date:{
        type:DataTypes.DATE,
        allowNull: false,
    },
    goals_team_1:{
        type:DataTypes.INTEGER
    },
    goals_team_2:{
        type:DataTypes.INTEGER
    },
    winner:{
        type:DataTypes.INTEGER
    },
},{timestamps:false})

Tournament.hasMany(Match, {foreignKey: 'id_tournament', sourceKey:'id'})
Match.belongsTo(Tournament, {foreignKey:'id_tournament'})

/* Match.hasMany(Team, {foreignKey: 'id', sourceKey:'team_1'}) */
Match.belongsTo(Team, {
  foreignKey: 'team_1',
  as: 'team1'
});

/* Match.hasMany(Team, {foreignKey: 'id', sourceKey:'team_2'}) */
Match.belongsTo(Team, {
  foreignKey: 'team_2',
  as: 'team2'
});

Match.belongsTo(Team, {
  foreignKey: 'winner',
});