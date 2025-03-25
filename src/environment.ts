export const environment = {
    
  
  apiBaseUrl: 'http://localhost:3000/api', 
    authApi: 'http://localhost:3000/api/auth',
    userApi: 'http://localhost:3000/api/user',
    // loginApi:'http://192.168.93.136:8080/api/v1/auth/login',
    loginApi:'http://localhost:8080/api/v1/auth/login',
    citizenApi:'http://localhost:8080/api/v1/citizen',
    getAllCitizen:'http://localhost:8080/api/v1/citizen',
    getResetPasswordApi: "http://192.168.93.136:8080/api/v1/auth/forget-password-link",
    resetPasswordApi: "http://192.168.93.136:8080/api/v1/auth/password",

    addCertificateApi:'http://localhost:8080/api/v1/certificate-request',
    filterCertificate:'http://localhost:8080/api/v1/certificate-request/by-filter',
    approvedCertificateApi:"http://localhost:8080/api/v1/certificate-request/approve",
    rejectCertificateApi:"http://localhost:8080/api/v1/certificate-request/reject",

    getAllGnDivisionApi:"http://localhost:8080/api/v1/gn-division",
    filterCitizenApi:"http://localhost:8080/api/v1/citizen/by-filter",

    // -------------  gs
    addApi:"http://localhost:8080/api/v1/grama-niladhari",

    // jobs
    addJobApi:"http://localhost:8080/api/v1/jobs",

    // income
    addIncomeApi:"http://localhost:8080/api/v1/income",
  };

