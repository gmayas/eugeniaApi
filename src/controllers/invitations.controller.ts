import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import pool from '../database/database';
import format from 'pg-format';
//
export const getInvId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id_inv } = req.params;
        let sqlString: string = format('SELECT id_user, name_user, last_name_user, id_inv, expiration_date_inv, eugenia.timestatus(expiration_date_inv) as time_status, status_inv '
            + 'FROM eugenia.users '
            + 'Left JOIN eugenia.invitations on (id_user = id_user_inv ) '
            + 'Left JOIN eugenia.invstatus on (id_inv_status = id_status) '
            + 'WHERE id_inv = %L', id_inv);
        console.log('sqlString Insert: ', sqlString)
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

//
export const getInvUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id_user } = req.params;
        let sqlString: string = format('SELECT id_user, name_user, last_name_user, id_inv, creation_date_inv, entry_date_time_inv, expiration_date_inv, eugenia.timestatus(expiration_date_inv) as time_status, status_inv '
            + 'FROM eugenia.users '
            + 'LEFT JOIN eugenia.invitations on (id_user = id_user_inv ) '
            + 'LEFT JOIN eugenia.invstatus on (id_inv_status = id_status) '
            + 'WHERE id_user = %L Order by id_inv', id_user);
        console.log('sqlString Insert: ', sqlString)
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
//
// Get all users invitations.
export const getUsersInv = async (req: Request, res: Response): Promise<Response> => {
    try {
        let sqlString: string = 'SELECT id_user, name_user, last_name_user, id_inv, creation_date_inv, entry_date_time_inv, expiration_date_inv, eugenia.timestatus(expiration_date_inv) as time_status, status_inv '
            + 'FROM eugenia.users'
            + 'LEFT JOIN eugenia.invitations on (id_user = id_user_inv ) ';
            + 'LEFT JOIN eugenia.invstatus on (id_inv_status = id_status) Order by id_user'
        console.log('sqlString: ', sqlString);
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

//
export const createInvUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id_user_inv , id_inv_status , entry_date_time_inv, expiration_date_inv } = req.body;
        // insert newInvition
        let sqlString: string = `INSERT INTO eugenia.invitations(id_user_inv, id_inv_status, creation_date_inv, entry_date_time_inv, expiration_date_inv)
                                 VALUES ('${id_user_inv}', '${id_inv_status}', eugenia.creationdate(), '${entry_date_time_inv}', '${expiration_date_inv}');`
        console.log('sqlString Insert: ', sqlString)
        const saveInv: QueryResult = await pool.query(sqlString);
        return res.status(200).json(
            {
                message: 'Query succesfully',
                success: true,
                error: 'Not error'                
            });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error in create user',
            success: false,
            error: e
        })
    }
};

// Modify Expiration Date Invitation Id
export const modifyExpDateInvId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id_inv } = req.params;
        const { new_expiration_date_inv } = req.body;
        // Update
        let sqlString: string = format('UPDATE eugenia.invitations SET expiration_date_inv = %L WHERE id_inv = %L', new_expiration_date_inv, id_inv);
        console.log('sqlString Update: ', sqlString)
        const saveInv: QueryResult = await pool.query(sqlString);
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

// Modify Status Invitation Id
export const modifyStatusInvId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id_inv } = req.params;
        const { new_id_status } = req.body;
        // Update
        let sqlString: string = format('UPDATE eugenia.invitations SET id_inv_status = %L WHERE id_inv = %L', new_id_status, id_inv);
        console.log('sqlString Update: ', sqlString)
        const saveInv: QueryResult = await pool.query(sqlString);
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


// Delete Invitation Id
export const deleteInvId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id_inv } = req.params;
        let sqlString: string = format('DELETE FROM eugenia.invitations WHERE id_inv = %L', id_inv);
        console.log('sqlString DeleteInvitation: ', sqlString)
        const delInv: QueryResult = await pool.query(sqlString);
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

