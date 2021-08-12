export interface StandardHeaders
{
    'Json-Web-Token': string;
}

export interface Creds {
    email: string;
    hashedPassword: string;
}

export interface Job 
{
    id: number;
    employer: Employer;
    title: string;
    description: string;
    field: Field;
    tags: Tag[];
    salary: string;
    city: string;
    workFromHome: boolean;
}

export interface Field 
{
    id: number;
    name: string;
}

export interface Tag 
{
    id: number;
    name: string;
}

export interface Employer 
{
    id: number;
    name: string;
}