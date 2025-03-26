import { Qualification } from "./Qualification";

export interface GramaNiladhariResponse{
    id:string,
    username: string,
        password: string,
        firstName: string,
        lastName: string,
        gender: string,
        age: number,
        dateOfBirth: string,
        email: string,
        phone: string,
        address: string,
        city: string,
        jobCardNo: string,
        serviceGrade: string,
        isPermanent: string,
        gnDivisionId:string,
        educationQualification:Qualification;
}