declare namespace Express {
    export interface Request {
        id_user: number;
        name_user: string;
        last_name_user: string;
        email_user: string;
        apartment_num_user: string;
        success: boolean;
    }
}