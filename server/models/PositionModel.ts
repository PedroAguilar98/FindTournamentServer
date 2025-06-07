import { DataTypes } from 'sequelize'
import {sequelize} from '../db'
import { Tournament } from './TournamentModel';
import { Team } from './TeamModel';

export const Position = sequelize.define('positions', {
    id_tournament:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

    id_team:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

    matches_played:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },

    matches_won:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },

    matches_defeated:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },

    matches_tied:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
})

Position.belongsTo(Tournament, {
  foreignKey: 'id_tournament',
});

Position.belongsTo(Team, {
  foreignKey: 'id_team',
});