import { Model, DataTypes } from 'sequelize';
import sequelize from './_sequelize';
import type { Database } from './index';

class User extends Model {
  public readonly id!: number;
  public role!: string;
  public phoneNumber!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  public static associate = (db: Database): void => {
    db.User.hasMany(db.Notice);
    db.User.hasMany(db.Work);
    db.User.hasOne(db.UserInfo);
  };
}

User.init(
  {
    role: {
      type: DataTypes.STRING(20),
      validate: {
        isIn: [['user, admin']],
      },
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      validate: {
        is: /^\d{7,15}$/,
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user',
    modelName: 'User',
    timestamps: true,
    paranoid: true,
  },
);

export default User;
