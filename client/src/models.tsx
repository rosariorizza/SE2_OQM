// #region Services

export interface Service{
    id: number;
    description: string;
    //type: ServiceTypeEnum
    type: string;
    time: number;
}

export interface ServiceCreation{
    description: string;
    //type: ServiceTypeEnum
    type: string
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


// #region Counter

export interface Counter{
    id: number;
    type: string;
    description: string;
}

// #endregion

