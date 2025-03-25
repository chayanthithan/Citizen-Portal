import { GnQualification } from "./Qualification";

export interface GramaNiladhari {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    dateOfBirth: Date,
    email: string,
    phone: string,
    address: string,
    city: string,
    jobCardNo: string,
    serviceGrade: string,
    isPermanent: string,
    educationQualification:GnQualification;
}