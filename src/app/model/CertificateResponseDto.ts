export interface CertificateResponseDto {
    id: string,
    typeOfCertificate: string,
    reason: string,
    requestedOrganization: string,
    status: string,
    rejectionReason: string,
    requestedDate: string,
    requestStatusUpdateDate: string,
    requestedBy: string,
    citizenId: string,
}