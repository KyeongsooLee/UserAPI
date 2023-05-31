import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { sequelizeConnection } from '../../database';

interface IUser {
  id: number;
  userName: string;
  password: string;
}

interface UserCreationAttributes extends Optional<IUser, 'id'> {}

class sqlUser extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: number;
  public userName!: string;
  public password!: string;
}

sqlUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'users',
  }
);

export default sqlUser;