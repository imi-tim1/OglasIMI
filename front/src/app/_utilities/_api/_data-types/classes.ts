export class Job 
{
    public id: number;
    public employer: Employer;
    public title: string;
    public description: string;
    public field: Field;
    public tags: Tag[];
    public salary: string;
    public city: string;
    public workFromHome: boolean;


    constructor(id: number, em: Employer, ti: string, de: string, fi: Field, ta: Tag[], sa: string, ci: string, wfh: boolean) {
        this.id = id;
        this.employer = em;
        this.title = ti;
        this.description = de;
        this.field = fi;
        this.tags = ta;
        this.salary = sa;
        this.city = ci;
        this.workFromHome = wfh;
    }
}

export class Field 
{
    public name: string = 'IT';

    constructor() {}
}

export class Tag 
{
    public name: string = 'java';

    constructor() {}
}

export class Employer 
{
    public id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}