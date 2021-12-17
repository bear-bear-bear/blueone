import dayjs from 'dayjs';
import { Model, DataTypes, ModelValidateOptions } from 'sequelize';
import sequelize from './_sequelize';
import type { Database } from './index';

const identificationNumberValidate: ModelValidateOptions = {
  is: /^[\d-]+$/,
};

class UserInfo extends Model {
  public readonly id!: number;
  public readonly user_id!: number;
  public realname!: string;
  public resident_registration_number!: string;
  public license_number!: string;
  public license_type!: string;
  public insurance_number!: string;
  public insurance_expiration_date!: Date;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public static associate = (db: Database): void => {};
}

UserInfo.init(
  {
    realname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    resident_registration_number: {
      type: DataTypes.STRING(30),
      validate: identificationNumberValidate,
      allowNull: false,
    },
    license_number: {
      type: DataTypes.STRING(30),
      validate: identificationNumberValidate,
      allowNull: false,
    },
    license_type: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    insurance_number: {
      type: DataTypes.STRING(30),
      validate: identificationNumberValidate,
      allowNull: false,
    },
    insurance_expiration_date: {
      type: DataTypes.DATEONLY,
      get() {
        return dayjs(this.getDataValue('insurance_expiration_date')).format(
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
