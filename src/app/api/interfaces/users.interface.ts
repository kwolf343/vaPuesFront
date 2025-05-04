export interface user{
    email: string;
    first_names: string;
    last_names: string;
    document: string;
    is_admin: boolean;
    userAccess: access[];
}

export interface access{
    access: string;
    icon: string;
    link: string;
}