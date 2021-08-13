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
    field: Field;
    tags: Tag[];
    title: string;
    description: string;
    salary: string;
    city: City;
    postDate: Date;
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

export interface City
{
    id: number;
    name: string;
}

export interface Filters {
    title?: string;
    tagList?: number[];
    employerId: number;
    fieldId: number;
    cityId: number;
    pageNumber: number;
    jobsPerPage: number;
    workFromHome: boolean;
    ascendingOrder: boolean;
}