// Enum u formatu objekta
// export const UserRole = {
//     Visitor: 'visitor',
//     Applicant: 'applicant',
//     Employer: 'amplyer',
//     Admin: 'admin'
// }

export enum UserRole {
    Visitor = '',
    Applicant = 'applicant',
    Employer = 'employer',
    Admin = 'admin'
}

export namespace UserRole {
    export function fromString(s: string): UserRole {
        switch (s) {
            case UserRole.Admin: return UserRole.Admin;
            case UserRole.Employer: return UserRole.Employer;
            case UserRole.Applicant: return UserRole.Applicant;
            default: return UserRole.Visitor;
        }
    }
}

export enum ResponseCode {
    Unknown,
    Success,
    Forbidden,

    // Login
    WrongCredentials,
    SessionExpired
}
