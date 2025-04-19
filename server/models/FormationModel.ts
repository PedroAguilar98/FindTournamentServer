import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../db'
import { GeneralTables } from './GeneralTables';


export const Formation = sequelize.define('formations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    c_team_size:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    n_table_team_size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    first_pivot: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    second_pivot: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},{timestamps:false})


Formation.hasOne(GeneralTables, {
    foreignKey: 'n_table',
    sourceKey: 'n_table_team_size',
});
Formation.hasOne(GeneralTables, {
    foreignKey: 'c_data',
    sourceKey: 'c_team_size',
});

GeneralTables.belongsTo(Formation, { foreignKey: 'n_table' });
GeneralTables.belongsTo(Formation, { foreignKey: 'c_data' });