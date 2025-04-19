import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../db'


export const GeneralTables = sequelize.define('general_tables', {
    n_table: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    c_data:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    d_data:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{timestamps:false})