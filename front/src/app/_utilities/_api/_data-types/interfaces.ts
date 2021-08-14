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

export interface PagedJobs {
    totalJobNumber: number;
    jobs: Job[];
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
    id?: number;
    name: string;
    email?: string;
    pictureBase64?: string | null;
    phoneNumber?: string;
    address?: string;
    tin?: string;

    hashedPassword?: string;
}

// "id": 4,
// "email": "laza@vass.org",
// "pictureBase64": null,
// "phoneNumber": "063123456",
// "name": "Lažarus d.o.o",
// "address": "Keba Kraba, 3",
// "tin": "123456789"

export interface Applicant
{
    id: number;
    firstName: string;
    lastName: string;

}

export interface City
{
    id: number;
    name: string;
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