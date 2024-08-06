import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import  pool  from '../database/database';
import format from 'pg-format';
import * as _ from 'lodash';
import {  encrypPassword, validatePassword } from '../libs/Validations'
import jwt from 'jsonwebtoken';

// Create user 
export const signUp = async (req: Request, res: Response): Promise<Response> => {
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
        // get token
        const token: string = jwt.sign({ emailuser: newUser.emailuser }, process.env['TOKEN_SECRET'] || '', {
            expiresIn: 60 * 60 * 24  // Duracion de 24 hrs
        });
        emailuserExists = await emailExists(newUser.email_user);
        if (emailuserExists.Ok) { newUser.id_user = emailuserExists.id_user }
        newUser.token = token;
        newUser.success = true;
        return res.header('auth-token', token).status(200).json(newUser);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in create user',
            error: e
        })
    }
};

export const signIn = async (req: Request, res: Response): Promise<Response> => {
    try{
        console.log('req.body: ', req.body);
        const { email_user, password_user } = req.body;
        const queryUser: QueryResult = await pool.query('SELECT * FROM eugenia.users WHERE email_user = $1', [email_user]);
        if ( queryUser.rowCount <=0 ) return res.status(400).json('Email or Password is wrong');
        const dataResult = queryUser.rows.find(f => f.email_user == email_user);
        console.log( _.get(dataResult,'passworduser',''))
        const correctPassword = await validatePassword(password_user, _.get(dataResult,'password_user',''));
        if (!correctPassword)
        {   
            dataResult.success = false;
            dataResult.token = '';
            dataResult.message = 'Invalid Password';
            return res.status(400).json(dataResult);
        } 
        // Get Token
        const token: string = jwt.sign({ email_user: _.get( dataResult, 'email_user','') }, process.env['TOKEN_SECRET'] || '',  {
            expiresIn: 60 * 60 * 24 // Duracion de 24 hrs
        });
        dataResult.token = token;
        dataResult.success = true;
        console.log('dataResult: ', dataResult); 
        return res.header('auth-token', token).status(200).json(dataResult);
     } catch ( e ){
         console.log(e);
         return res.status(500).json({
            message: 'Error in query',
            error: e
        })
     }  
};

export const profile = async (req: Request, res: Response): Promise<Response> => {
    try{
        const { email_user } = req.body;
        const response: QueryResult = await pool.query('SELECT * FROM eugenia.users WHERE email_user = $1 ORDER BY id ASC LIMIT 1', [email_user]);
        return res.status(200).json({
            message: 'Query succesfully',
            data: response.rows
        });
     } catch ( e ){
         console.log(e);
         return res.status(500).json({
            message: 'Error in query',
            error: e
        })
     }  
};

export const logOut = async (req: Request, res: Response): Promise<Response> => {
        try{
           return res.status(200).json({
                message: 'Come back soon',
                data: {}
            });
         } catch ( e ){
             console.log(e);
             return res.status(500).json({
                message: 'Error in query',
                error: e
            })
         }  
}; 

// Modify password 
export const modifyPasswordUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id_user } = req.params;
        const newPassword: any = await encrypPassword(req.body.password_user);
        // Update
        let sqlString: string = format('UPDATE eugenia.users SET password_user = %L WHERE id_user = %L', newPassword, id_user);
        console.log('sqlString Update: ', sqlString)
        const response: QueryResult = await pool.query(sqlString);
        return res.status(200).json(
            {
                message: 'Query succesfully',
                success: true,
                data: response,
                error: 'Not error'
            }
        );
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in create user',
            success: false,
            data: {},
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