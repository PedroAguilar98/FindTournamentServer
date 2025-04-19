import { Sequelize, DataTypes } from 'sequelize';
import { Team } from './TeamModel';
import {sequelize} from '../db'


export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    document: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    password: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    genre:{
        type: DataTypes.CHAR,
        allowNull: false
    }

},{timestamps:false})

