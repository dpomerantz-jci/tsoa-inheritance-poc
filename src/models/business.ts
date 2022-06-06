//import { Optional } from 'sequelize';

export interface BusinessAttributes {
  businessId: string,
  businessName: string,
  businessAreaCode: string
}

export declare type BusinessPk = "businessId";
// export declare type BusinessOptionalAttributes = "businessAreaCode";
// export declare type BusinessCreationAttributes = Optional<BusinessAttributes, BusinessOptionalAttributes>;
// export declare type Business_IdOnly = Pick<BusinessCreationAttributes, BusinessPk> & Partial<Omit<BusinessCreationAttributes, BusinessPk>>;
export declare type Business_IdOnly = Pick<BusinessAttributes, BusinessPk> & Partial<Omit<BusinessAttributes, BusinessPk>>;

export declare type Business_IdOnly_Aliased = Business_IdOnly;

export interface Business extends BusinessAttributes {}

export interface Business_IdOnly_Omitted extends Omit<Business_IdOnly, "none"> {
  businessName?: string;
}

export declare type Business_IdOnly_Omitted_IdOnly = Pick<Business_IdOnly_Omitted, BusinessPk> & Partial<Omit<Business_IdOnly_Omitted, BusinessPk>>;
