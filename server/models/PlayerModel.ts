import { Sequelize, DataTypes } from 'sequelize';
import { Team } from './TeamModel';
import {sequelize} from '../db'
import { User } from './UserModel';


export const Player = sequelize.define('players', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    id_team: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    goals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    is_captain: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    victories:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    ties:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    defeats:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    position:{
        type: DataTypes.INTEGER,
        allowNull: false
    }

},{timestamps:false})


Player.hasOne(User, {foreignKey: 'id', sourceKey:'id_user'})
User.belongsTo(Player, {foreignKey: 'id'})

Player.hasOne(Team, {foreignKey: 'id', sourceKey:'id_team'})
Team.belongsTo(Player, {foreignKey: 'id'})

