export interface StandardHeaders
{
    'Json-Web-Token': string;
}

export interface Creds {
    email: string;
    hashedPassword: string;
}

export interface Filters {
    title: string;
    tagList?: number[];
    employerId: number;
    fieldId: number;
    cityId: number;
    pageNumber: number;
    jobsPerPage: number;
    workFromHome: boolean;
    ascendingOrder: boolean;
}

// Osnovni Entiteti

export interface Job
{
    title: string;
    description: string;
    employer: Employer;
    field: Field;
    tags: Tag[];
    workFromHome: boolean;
    city: City;
    
    id?: number;
    salary?: string;
    postDate?: Date;
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

export interface City
{
    id: number;
    name: string;
}

export interface Employer 
{
    name: string;

    id?: number;
    email?: string;
    pictureBase64?: string | null;
    phoneNumber?: string;
    address?: string;
    tin?: string;
    hashedPassword?: string;
}

export interface Applicant
{
    id: number;
    firstName: string;
    lastName: string;
    // ...
}

// Prilagodjene varijante

export interface PagedJobs {
    totalJobNumber: number;
    jobs: Job[];
}