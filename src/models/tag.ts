import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize';

/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255),
 * description TEXT,
 * username VARCHAR(255),
 * usage INT
 * );
 */

export interface TagAttributes {
  name: string;
  description: string;
  username: string;
  usage_count?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Tag extends Model<TagAttributes> implements TagAttributes {
  public description: string;

  public name: string;

  public usage_count: number;

  public username: string;

  public createdAt?: Date;

  public updatedAt?: Date;
}

Tag.init({
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  description: DataTypes.TEXT,
  username: DataTypes.STRING,
  usage_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
}, {
  tableName: 'tag',
  sequelize,
});
