// export const environment = {
//   apiBaseUrl: 'http://localhost:3000/api',
//   authApi: 'http://localhost:3000/api/auth',
//   userApi: 'http://localhost:3000/api/user',
//   // loginApi:'http://192.168.93.136:8080/api/v1/auth/login',
//   loginApi: 'http://localhost:8080/api/v1/auth/login',
//   citizenApi: 'https://cf24-112-135-31-31.ngrok-free.app/api/v1/citizen',
//   getAllCitizen: 'http://localhost:8080/api/v1/citizen',
//   getResetPasswordApi:
//     'http://192.168.93.136:8080/api/v1/auth/forget-password-link',
//   resetPasswordApi: 'http://192.168.93.136:8080/api/v1/auth/password',

//   addCertificateApi: 'http://localhost:8080/api/v1/certificate-request',
//   filterCertificate:
//     'http://localhost:8080/api/v1/certificate-request/by-filter',
//   approvedCertificateApi: 'http://localhost/api/v1/certificate-request/approve',

//   getAllGnDivisionApi:
//     'https://cf24-112-135-31-31.ngrok-free.app/api/v1/gn-division',
//   filterCitizenApi: 'http://localhost:8080/api/v1/citizen/by-filter',

//   // -------------  gs
//   addApi: 'http://localhost:8080/api/v1/grama-niladhari',
// };

const BaseUrl = 'http://localhost:8080';
const nodeBaseUrl = 'http://localhost:8080';

export const environment = {
  apiBaseUrl: nodeBaseUrl,
  authApi: `${nodeBaseUrl}/auth`,
  userApi: `${nodeBaseUrl}/user`,

  // loginApi: `${BaseUrl}/api/v1/auth/login`,
  // getResetPasswordApi: `${BaseUrl}/api/v1/auth/forget-password-link`,
  // resetPasswordApi: `${BaseUrl}/api/v1/auth/password`,

  // citizenApi: `${BaseUrl}/api/v1/citizen`,
  // getAllCitizen: `${BaseUrl}/api/v1/citizen`,
  // filterCitizenApi: `${BaseUrl}/api/v1/citizen/by-filter`,

  // addCertificateApi: `${BaseUrl}/api/v1/certificate-request`,
  // filterCertificate: `${BaseUrl}/api/v1/certificate-request/by-filter`,
  // approvedCertificateApi: `${BaseUrl}/api/v1/certificate-request/approve`,

  // getAllGnDivisionApi: `${BaseUrl}/api/v1/gn-division`,

  // addApi: `${BaseUrl}/api/v1/grama-niladhari`,
  // addjob: `${BaseUrl}/api/v1/jobs`,
  // getjob: `${BaseUrl}/api/v1/jobs`,
  // addemployee: `${BaseUrl}/api/v1/employment`,

  // apiBaseUrl: 'http://localhost:3000/api', 
  //   authApi: 'http://localhost:3000/api/auth',
  //   userApi: 'http://localhost:3000/api/user',
    // loginApi:'http://192.168.93.136:8080/api/v1/auth/login',
    loginApi:'http://localhost:8080/api/v1/auth/login',
    
    // citizen
    citizenApi:'http://localhost:8080/api/v1/citizen',
    getAllCitizen:'http://localhost:8080/api/v1/citizen',
    filterCitizenApi:"http://localhost:8080/api/v1/citizen/by-filter",
    
    getResetPasswordApi: "http://192.168.93.136:8080/api/v1/auth/forget-password-link",
    resetPasswordApi: "http://192.168.93.136:8080/api/v1/auth/password",
// certificates
    addCertificateApi:'http://localhost:8080/api/v1/certificate-request',
    filterCertificate:'http://localhost:8080/api/v1/certificate-request/by-filter',
    approvedCertificateApi:"http://localhost:8080/api/v1/certificate-request/approve",
    rejectCertificateApi:"http://localhost:8080/api/v1/certificate-request/reject",
// gn division
    getAllGnDivisionApi:"http://localhost:8080/api/v1/gn-division",
    addGnDivisionApi:"http://localhost:8080/api/v1/gn-division",
    deleteGnDivisionApi:"http://localhost:8080/api/v1/gn-division",

    // -------------  gs
    addApi:"http://localhost:8080/api/v1/grama-niladhari",

    // jobs
    addJobApi:"http://localhost:8080/api/v1/jobs",
    getjob: `${BaseUrl}/api/v1/jobs`,

    // income
    addIncomeApi:"http://localhost:8080/api/v1/income",


    // employee
    addemployee: `${BaseUrl}/api/v1/employment`,

    // google authendiction
    googleApi:"http://localhost:8080/oauth2/authorization/google",
    googleResponseApi:"http://localhost:8080/api/v1/auth/google/login",
    currentApi:"http://localhost:8080/api/v1/auth/current-user",
    meApi:"http://localhost:8080/api/v1/auth/me",
};
