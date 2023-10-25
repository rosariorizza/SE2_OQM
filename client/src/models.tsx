// #region Services

export interface Service{
    id: number;
    description: string;
    //type: ServiceTypeEnum
    type: string
}

export interface ServiceCreation{
    description: string;
    //type: ServiceTypeEnum
    type: string
}

export enum ServiceTypeEnum {
    CUSTOMER_SUPPORT = 'CUSTOMER_SUPPORT',
    TECHNICAL_ASSISTANCE = 'TECHNICAL_ASSISTANCE',
    BILLING = 'BILLING',
    MEMBERSHIP = 'MEMBERSHIP',
}

// #endregion


// #region User

export interface User{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRoleEnum
}
export interface UserCreation{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRoleEnum
}

export enum UserRoleEnum {
    CUSTOMER = 'CUSTOMER',
    COUNTER_OFFICER = 'COUNTER_OFFICER',
    ADMINISTRATOR = 'ADMINISTRATOR',
}

// #endregion

// #region Time
export interface Time{
    hour: number;
    minutes: number;
}

// #endregion

