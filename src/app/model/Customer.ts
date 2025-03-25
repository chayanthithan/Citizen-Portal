import { Representative } from "./Representative";

// src/app/domain/customer.ts
export interface Customer {
    id?: number;
    name?: string;
    country?: {
        name: string;
        code: string;
    };
    company?: string;
    date?: Date | string;
    status?: string;
    activity?: number;
    representative?: Representative;
    verified?: boolean;
    balance?: number;
}