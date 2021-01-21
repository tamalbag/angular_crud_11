import { Role } from './role';

export class User {
    id!: string;
    firstName!: string;
    lastName!: string;
    isDeleting: boolean = false;
    bgColor!: string;
}