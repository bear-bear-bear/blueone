import { Model, DataTypes } from 'sequelize';
import sequelize from './_sequelize';
import type { Database } from './index';

class Work extends Model {
  public readonly id!: number;
  public readonly user_id!: number;
  public origin!: string;
  public waypoint!: string | null;
  public destination!: string;
  public car_model!: string;
  public charge!: number;
  public subsidy!: number | null;
  public remark!: string | null;
  public check_time!: Date | null;
  public end_time!: Date | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public static associate = (db: Database): void => {
    db.Work.belongsTo(db.User);
  };
}

Work.init(
  {
    origin: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    waypoint: {
      type: DataTypes.STRING(255),
    },
    destination: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    car_model: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    charge: {
      type: DataTypes.MEDIUMINT,
      allowNull: false,
    },
    subsidy: {
      type: DataTypes.MEDIUMINT,
    },
    remark: {
      type: DataTypes.TEXT,
    },
    check_time: {
      type: DataTypes.DATE,
    },
    end_time: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: 'work',
    modelName: 'Work',
    timestamps: true,
  },
);

export default Work;
