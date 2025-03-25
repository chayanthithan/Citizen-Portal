import { Certificate } from "./Certificate";
import { EmploymentDto } from "./EmploymentDto";
import { GnDivisionResponse } from "./gnDivisionResponse";
import { Qualification } from "./Qualification";
import { Roles } from "./roles";
import { VotingDto} from "./VotingsDto";

export interface CitizenResponseDto{
    id:string,
username:string,
password:string,
firstName:string,
lastName:string,
gender:string,
age:string,
dateOfBirth:string,
email:string,
nic:string,
phone:string,
address:string,
city:string,
resetToken:string,
employments:EmploymentDto,
userRoles:Roles,
father:string,
mother:string,
child:string,
familyCardNo:string,
certificates:Certificate,
educationalQualifications:Qualification,
votings:VotingDto,
gramaNiladhariDivision:GnDivisionResponse,
}