
import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../db'
import { GeneralTables } from './GeneralTables';

export const Tournament = sequelize.define('tournaments', {
    // Model attributes are defined here
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      d_start: {
        type: DataTypes.DATE,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      is_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      d_close_register: {
        type: DataTypes.DATE,
        allowNull: false
      },
      state: {
        type: DataTypes.CHAR,
        allowNull: false
      },
      prize: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cost_per_player: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      c_players_per_team: {
        type: DataTypes.STRING,
        allowNull: false
      },
      c_modality: {
        type: DataTypes.STRING,
        allowNull: false
      },
      c_category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      players_per_team_table: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      modality_table: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      category_table: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    
  }, {
    timestamps:false
  });

  Tournament.hasOne(GeneralTables, {
    foreignKey: 'n_table',
    sourceKey: 'category_table',
  });
  Tournament.hasOne(GeneralTables, {
    foreignKey: 'c_data',
    sourceKey: 'c_category',
    as: 'category_data'
  });
  
  Tournament.hasOne(GeneralTables, {
    foreignKey: 'n_table',
    sourceKey: 'modality_table',
  });
  Tournament.hasOne(GeneralTables, {
    foreignKey: 'c_data',
    sourceKey: 'c_modality',
    as: 'modality_data'
  });
  
  Tournament.hasOne(GeneralTables, {
    foreignKey: 'n_table',
    sourceKey: 'players_per_team_table',
  });
  Tournament.hasOne(GeneralTables, {
    foreignKey: 'c_data',
    sourceKey: 'c_players_per_team',
    as: 'players_per_team_data'
  });
  
  GeneralTables.belongsTo(Tournament, { foreignKey: 'n_table' });
  GeneralTables.belongsTo(Tournament, { foreignKey: 'c_data' });
  