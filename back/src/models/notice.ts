import { Model, DataTypes } from 'sequelize';
import sequelize from './_sequelize';
import type { Database } from './index';

class Notice extends Model {
  public readonly id!: number;
  public userId!: number;
  public title!: string;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate = (db: Database): void => {
    db.Notice.belongsTo(db.User);
  };
}

Notice.init(
  {
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'notice',
    modelName: 'Notice',
    timestamps: true,
  },
);

export default Notice;
