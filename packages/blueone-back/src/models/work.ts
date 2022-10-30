import { Model, DataTypes } from 'sequelize';
import sequelize from './_sequelize';
import type { Database } from './index';

class Work extends Model {
  public readonly id!: number;
  public userId!: number;
  public origin!: string;
  public waypoint!: string | null;
  public destination!: string;
  public carModel!: string;
  public charge!: number;
  public subsidy!: number | null;
  public remark!: string | null;
  public checkTime!: Date | null;
  public endTime!: Date | null;
  public penalty!: boolean;
  public bookingDate!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

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
    carModel: {
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
    checkTime: {
      type: DataTypes.DATE,
    },
    endTime: {
      type: DataTypes.DATE,
    },
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    penalty: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
