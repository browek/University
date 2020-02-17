import { User } from '../user/user';

export interface Files {
    id: string;
    name: string;
    user: User;
    creationDate: Date;
    file: string;
}
