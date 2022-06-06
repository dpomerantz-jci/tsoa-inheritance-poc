//import { Optional } from 'sequelize';
import { Business, Business_IdOnly, Business_IdOnly_Aliased, Business_IdOnly_Omitted, Business_IdOnly_Omitted_IdOnly } from './business';

export interface UserAttributes {
  userId: string,
  firstName: string,
  middleName: string,
  lastName: string
}

export declare type UserPk = "userId";
//export declare type UserOptionalAttributes = "middleName";
//export declare type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;
//export declare type User_IdOnly = Pick<UserCreationAttributes, UserPk> & Partial<Omit<UserCreationAttributes, UserPk>>;
export declare type User_IdOnly = Pick<UserAttributes, UserPk> & Partial<Omit<UserAttributes, UserPk>>;

export interface UserRead extends UserAttributes {
  business: Business;
}

export interface UserWrite extends UserAttributes {
  business1?: Business_IdOnly,
  business2?: Business_IdOnly_Aliased,
  business3?: Business_IdOnly_Omitted,
  business4?: Business_IdOnly_Omitted_IdOnly,
}
