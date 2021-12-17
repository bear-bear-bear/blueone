import { Model, DataTypes } from 'sequelize';
import sequelize from './_sequelize';
import type { Database } from './index';

class Notice extends Model {
  public readonly id!: number;
  public readonly user_id!: number;
  public title!: string;
  public content!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

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
