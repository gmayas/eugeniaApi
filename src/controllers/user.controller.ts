import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import pool from './../database/database';
import format from 'pg-format';
import { encrypPassword } from './../libs/Validations';
import * as _ from 'lodash';

/*   
format(fmt, ...)
%% outputs a literal % character.
%I outputs an escaped SQL identifier.
%L outputs an escaped SQL literal.
%s outputs a simple string.
*/

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const sqlString: string = format('SELECT id_user, name_user, last_name_user, email_user, password_user, apartment_num_user FROM %s Order by id_user DESC', 'eugenia.users');
        const response: QueryResult = await pool.query(sqlString);
        return res.status(200).json({
            message: 'Query succesfully',
            data: response.rows
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in query',
            error: e
        })
    }
};

// Get User by Email
export const getUserbyEmail = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email } = req.params;
        let sqlString: string = format('SELECT id_user, name_user, last_name_user, email_user, password_user, apartment_num_user FROM %s WHERE email_user = %L', 'eugenia.users', email);
        const response: QueryResult = await pool.query(sqlString);
        return res.status(200).json({
            message: 'Query succesfully',
            data: response.rows
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in query',
            error: e
        })
    }
};



// Email exists
export const emailExists = async (email_user: string) => {
    try {
        const sqlString: string = format('SELECT id_user FROM %s WHERE email_user = %L', 'eugenia.users', email_user);
        const emailuserExists: QueryResult = await pool.query(sqlString);
        console.log('emailuserExists firt: ', _.get(emailuserExists.rows[0], 'id_user'));
        if (emailuserExists.rowCount > 0) {

            return { Ok: true, id_user: _.get(emailuserExists.rows[0], 'id_user') }
        } else {
            return { Ok: false, id_user: null }
        }
    }
    catch (e) {
        console.log(e);
        return { Ok: false, id_user: null }
    }
};

// Id user exists
export const userDataCount = async (id_user: any) => {
    try {
        const sqlString: string = format('SELECT Count (*) UsersCount FROM eugenia.userdata WHERE id_user_userdata = %L', id_user);
        const UsersCount: QueryResult = await pool.query(sqlString);
        const dataReturn = _.toNumber(_.get(UsersCount.rows[0], 'userscount'));
        return { Ok: true, count: dataReturn }
    }
    catch (e) {
        console.log(e);
        return { Ok: false, count: 0 }
    }
};

// Create user 
export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        let sqlString: string;
        let emailuserExists: any;
        const newUser: any = {
            name_user: req.body.name_user,
            last_name_user: req.body.last_name_user,
            email_user: req.body.email_user,
            password_user: await encrypPassword(req.body.password_user),
            apartment_num_user: req.body.apartment_num_user
        };
        // Email Validation
        emailuserExists = await emailExists(newUser.email_user);
        console.log('emailuserExists:', emailuserExists)
        if (emailuserExists.Ok) return res.status(400).json('Email already exists');
        // insert newUser
        sqlString = format('INSERT INTO eugenia.users(name_user, last_name_user, email_user,  password_user, apartment_num_user) '
                            + 'VALUES %L', [[newUser.name_user, newUser.last_name_user, newUser.email_user, newUser.password_user, newUser.apartment_num_user]]);
        console.log('sqlString Insert: ', sqlString)
        const saveUser: QueryResult = await pool.query(sqlString);
        emailuserExists = await emailExists(newUser.email_user);
        if (emailuserExists.Ok) { newUser.id_user = emailuserExists.id_user }
        newUser.success = true;
        return res.status(200).json(newUser);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in create user',
            error: e
        })
    }
};


// Modify password 
export const modifyPassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        let sqlString: string;
        const { id_user } = req.params;
        const newPassword: any = await encrypPassword(req.body.password_user);
        // Update
        sqlString = format('UPDATE eugenia.users SET password_user = %L WHERE id_user = %L', newPassword, id_user);
        console.log('sqlString Update: ', sqlString)
        const saveUser: QueryResult = await pool.query(sqlString);
        return res.status(200).json(
            {
                message: 'Query succesfully',
                success: true,
                error: 'Not error'
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in create user',
            success: false,
            error: e
        })
    }
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        let sqlString: string;
        const { id_user } = req.params;
        // Verifica si tiiene datos de usuario
        const UsersCount = await userDataCount(id_user);
        console.log('UsersCount:', UsersCount)
        //{ Ok: true, count: 0 }
        if (UsersCount.count > 0) {
            // Elimina si tiene datos de usuario   
            sqlString = format('DELETE FROM eugenia.invitations WHERE id_user_inv = %L', id_user);
            console.log('sqlString DeleteUserData: ', sqlString)
            const delUserData: QueryResult = await pool.query(sqlString);
        }
        // Delete user
        sqlString = format('DELETE FROM eugenia.users WHERE id_user = %L', id_user);
        console.log('sqlString Delete User: ', sqlString)
        const delUser: QueryResult = await pool.query(sqlString);
        return res.status(200).json(
            {
                message: 'Query succesfully',
                success: true,
                error: 'Not error'
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in create user',
            success: false,
            error: e
        })
    }
};