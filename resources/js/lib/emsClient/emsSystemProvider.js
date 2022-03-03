/**
 *
 *  @emsSystemProvider
 *
 *
 *  @author   qubit-hex
 *
 *  @purpose: inorder to have a interface the will provider intration the the system as a whole
 *
 *
 */

import { _cook } from './modules/cook.mjs';

class ESP
{
    constructor(userID, token) {

    }

    /**
     *  @method employee
     *
     *  @purpose : to get the employee data from the server
     *
     */

    employee(callback) {
        // this will return the employee data

        return new _cook();
    }
}

// automatated system for the system
// tets data

const employeeID = '123';
const token = '123';
const ems = new ESP(employeeID, token);
const cook = ems.employee();
// some values to test the cook score
const test = {
    'employeeID': '123',
    'token': '123',
    'sales': [ 1200, 1500, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000 ],
    'complaints': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    'billTime': [8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48],
    'cleanliness': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    'attendance': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

//  next lets get the cook data
console.table(cook.score(test));
