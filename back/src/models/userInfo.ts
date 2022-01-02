import dayjs from 'dayjs';
import { Model, DataTypes, ModelValidateOptions } from 'sequelize';
import sequelize from './_sequelize';
import type { Database } from './index';

const dateOfBirthValidate: ModelValidateOptions = {
  is: /^\d{6}$/,
};
const identificationNumberValidate: ModelValidateOptions = {
  is: /^[\d-]+$/,
};

class UserInfo extends Model {
  public readonly id!: number;
  public userId!: number;
  public realname!: string;
  public dateOfBirth!: string;
  public licenseNumber!: string;
  public licenseType!: string;
  public insuranceNumber!: string;
  public insuranceExpirationDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate = (db: Database): void => {
    db.UserInfo.belongsTo(db.User);
  };
}

UserInfo.init(
  {
    realname: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.STRING(32),
      validate: dateOfBirthValidate,
      allowNull: false,
    },
    licenseNumber: {
      type: DataTypes.STRING(32),
      validate: identificationNumberValidate,
      allowNull: false,
    },
    licenseType: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    insuranceNumber: {
      type: DataTypes.STRING(32),
      validate: identificationNumberValidate,
      allowNull: false,
    },
    insuranceExpirationDate: {
      type: DataTypes.DATEONLY,
      get() {
        return dayjs(this.getDataValue('insuranceExpirationDate')).format(
          'YYYY-MM-DD',
        );
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user_info',
    modelName: 'UserInfo',
    timestamps: true,
  },
);

export default UserInfo;
