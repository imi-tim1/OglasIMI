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

// Osnovni Entiteti (Modeli sa svim podacima)

export interface Job
{
    title: string;
    description: string;
    employer: Employer;
    field: Field;
    tags: Tag[];
    workFromHome: boolean;
    city: City;
    
    id: number;
    salary?: string;
    postDate: Date;
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

    id: number;
    email: string;
    pictureBase64: string | null;
    phoneNumber: string;
    address: string;
    tin: string;
    hashedPassword: string;
}

export interface Applicant
{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    pictureBase64: string | null;
    hashedPassword: string;
}

export interface JobComment
{
    id: number;
    parentId: number;
    authorName: string;
    text: string;
    postDate: Date;
}

export interface RatingResponse 
{
    rating: number;
    alreadyRated: boolean;
}

export interface RegistrationBrief 
{
    id: number;
    name: string;
    email: string;
    pictureBase64: string | null;
}

// Prilagodjene varijante

export interface PagedJobs {
    totalJobNumber: number;
    jobs: Job[];
}

export interface NewJob {
    // Obavezni podaci. Regularni format
    title: string;
    description: string;
    workFromHome: boolean;
    field: Field; // Format: Objekat, name = '', bitan samo id
    
    
    // Ne obavezni, Objekat, name = '', bitan samo id
    city: City | null;      // null, ako nema grada
    tags: Tag[];            // [], ako nema tagova
    
    salary: string;         // prazan string ako ne treba
    
    // Uvek null
    postDate: null;
    employer: null;
}

export interface NewEmployer 
{
    name: string;
    email: string;
    phoneNumber: string;
    tin: string;
    address: string;
    pictureBase64: string | null;
    hashedPassword: string;
}

export interface NewApplicant 
{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    pictureBase64: string | null;
    hashedPassword: string;
}