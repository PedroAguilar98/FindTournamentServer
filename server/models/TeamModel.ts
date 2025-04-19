import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../db'
import { GeneralTables } from './GeneralTables';
import { Formation } from './FormationModel';



export const Team = sequelize.define('teams', {
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
    victories: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    defeats: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ties: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    titles: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    goals: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true
    },
    c_size: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'5'
    },
    n_table_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
    },
    id_formation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
    }

},{timestamps:false})

Team.hasOne(GeneralTables, {
    foreignKey: 'n_table',
    sourceKey: 'n_table_size',
});
Team.hasOne(GeneralTables, {
    foreignKey: 'c_data',
    sourceKey: 'c_size',
});

Team.hasOne(Formation, {
    foreignKey: 'id',
    sourceKey: 'id_formation',
});

GeneralTables.belongsTo(Team, { foreignKey: 'n_table' });
GeneralTables.belongsTo(Team, { foreignKey: 'c_data' });
Formation.belongsTo(Team, { foreignKey: 'id' });