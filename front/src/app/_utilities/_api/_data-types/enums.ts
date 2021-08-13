export enum UserRole {
    Visitor,
    Applicant,
    Employer,
    Admin
}

export enum ResponseCode {
    Unknown,
    Success,
    Forbidden,

    // Login
    WrongCredentials,
    SessionExpired
}
