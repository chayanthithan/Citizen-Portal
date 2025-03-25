import { Inject, Injectable } from '@angular/core';
import { Login } from '../model/Login';
import { Customer } from '../model/Customer';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from '../model/loginDto';
import { StorageService } from './storage.service';
import { Register } from '../model/register';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { ForgetPassword } from '../model/ForgetPassword';
import { Certificate } from '../model/Certificate';
import { DOCUMENT } from '@angular/common';
import { FilterCertificateDto } from '../model/FilterCertificateDto';
import { GnDivisionResponse } from '../model/gnDivisionResponse';
import { CitizenResponseDto } from '../model/citizenResponseDto';
import { CertificateResponseDto } from '../model/CertificateResponseDto';
import { ApprovedByDto } from '../model/approvedByDto';
import { RejectDto } from '../model/RejectDto';
import { Job } from '../model/Job';
import { IncomeDto } from '../model/incomeDto';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient, private storageService: StorageService, @Inject(DOCUMENT) private document: HTMLDocument) {
    this.loadLoginDtoFromSessionStorage();
    console.log("loginDto:", this.loginDto)
  }



  loginData!: Login;
  isMinimized: boolean = true;
  isHeaderAction: boolean = false;
  isAction: boolean = false;
  isLogged: boolean = true;
  // this is for if gs reject user certificate request
  isReject: boolean = true;
  isRole: String = '';  //user , GS , DS

  loginDto: LoginDto = {
    lastName: '',
    email: '',
    roles: [],
    userId: '',
    firstName: ''
  }


  resetMenu() {
    document.getElementById('home_screen')?.classList.remove(...['menu__select']);
    document.getElementById('gs_screen')?.classList.remove(...['menu__select']);
    document.getElementById('certificate_screen')?.classList.remove(...['menu__select']);
    document.getElementById('user_screen')?.classList.remove(...['menu__select']);
    document.getElementById('reports_screen')?.classList.remove(...['menu__select']);
    document.getElementById('vote_screen')?.classList.remove(...['menu__select']);
    document.getElementById('employment_screen')?.classList.remove(...['menu__select']);
    document.getElementById('notification_screen')?.classList.remove(...['menu__select']);
    document.getElementById('setting_screen')?.classList.remove(...['menu__select']);
    document.getElementById('logout_screen')?.classList.remove(...['menu__select']);
  }



  toggle() {
    this.isMinimized = !this.isMinimized;
  }

  toggleHeaderAction() {
    this.isHeaderAction = !this.isHeaderAction;
  }

  isAuthenticated(): boolean {
    return !!this.loginDto.lastName || !!this.loginDto.email || this.loginDto.roles.length > 0;
  }


  loadLoginDtoFromSessionStorage(): void {
    const loginDtoJson = this.storageService.getItem('loginDto');
    if (loginDtoJson) {
      this.loginDto = JSON.parse(loginDtoJson);
    }
  }

  saveLoginDtoToSessionStorage(loginDto: LoginDto): void {
    this.storageService.setItem('loginDto', JSON.stringify(loginDto));
  }

  clearLoginDtoFromSessionStorage(): void {
    this.storageService.removeItem('loginDto');
  }



  // components

  // ----------------------        register
  registerUser(registerDetails: Register): Observable<any> {
    return this.http.post(environment.citizenApi, registerDetails);
  }


  // -----------------------------reset password
  getUserForgetPassword(email: String): Observable<any> {
    return this.http.get(`${environment.getResetPasswordApi}?email=${email}`);
  }
  resetForgetPassword(forgetPasswordDto: ForgetPassword): Observable<any> {
    return this.http.post(environment.resetPasswordApi, forgetPasswordDto);
  }

  // ----------------------------   request certificates apies

  // certificates request
  addRequestCertificate(certificateDto: Certificate): Observable<any> {
    return this.http.post(environment.addCertificateApi, certificateDto);
  }

  rejectCertificates(rejectDto: RejectDto): Observable<any> {
    return this.http.post(environment.rejectCertificateApi, rejectDto);
  }

  approvedCertificates(approvedDto: ApprovedByDto): Observable<any> {
    return this.http.post(environment.approvedCertificateApi, approvedDto);
  }

  //filter certificates
  filetrCertificateRequest(filterCertificateDto: FilterCertificateDto): Observable<CertificateResponseDto[]> {
    return this.http.get<CertificateResponseDto[]>(`${environment.filterCertificate}?typeOfCertificate=${filterCertificateDto.typeOfCertificate}&requestStatus=${filterCertificateDto.requestStatus}&requestedDateFrom=${filterCertificateDto.requestedDateFrom}&requestStatus=${filterCertificateDto.requestStatus}&requestedDateTo=${filterCertificateDto.requestedDateTo}`)
  }

  //get All certificate Details
  getAllCertificateRequestDetails(): Observable<any> {
    return this.http.get(environment.addCertificateApi);
  }

  // gn division api calls
  getAllGnDivisions(): Observable<GnDivisionResponse[]> {
    return this.http.get<GnDivisionResponse[]>(environment.getAllGnDivisionApi);
  }


  getDataWithCookies() {
    return this.http.get('your-api-endpoint', { observe: 'response' })
      .subscribe(response => {
        // Get all cookies from response headers
        const cookies = response.headers.get('set-cookie');
        console.log('All cookies:', cookies);

        // To extract specific cookie like JSESSIONID
        if (cookies) {
          const jsessionId = cookies.split(';')
            .find(c => c.trim().startsWith('JSESSIONID='))
            ?.split('=')[1];
          console.log('JSESSIONID:', jsessionId);
        }
      });
  }

  // citizen apies
  getAllCitizenDetails(): Observable<CitizenResponseDto[]> {
    return this.http.get<CitizenResponseDto[]>(environment.getAllCitizen)
  }
  
  filterCitizenDetails(nic: string | null, firstName: string | null, familyCardNo: string | null, ageFrom: string, ageTo: string, gnId: string): Observable<CitizenResponseDto[]> {
    return this.http.get<CitizenResponseDto[]>(`${environment.filterCitizenApi}?nic=${nic}&firstName=${firstName}&ageFrom=${ageFrom}&ageTo=${ageTo}&gnId=${gnId}&familyCardNo=${familyCardNo}`)
  }
  
  // add job 
  addJobDetails(jobDto:Job): Observable<Job> {
    return this.http.post<Job>(environment.addJobApi,jobDto)
  }

  // add income details
  addIncomeDetails(incomeDto:IncomeDto): Observable<IncomeDto> {
    return this.http.post<IncomeDto>(environment.addIncomeApi,incomeDto)
  }


}
