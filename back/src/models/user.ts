import { Model, DataTypes } from 'sequelize';
import sequelize from './_sequelize';
import type { Database } from './index';

class User extends Model {
  public readonly id!: number;
  public role!: string;
  public phone_number!: string;
  public password!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date | null;

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
    phone_number: {
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
