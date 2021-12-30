<?php


/**
 * 
 *  @class: scheduleValidation
 * 
 * 
 * 
 *  @purpose: to perform any validation that is required by our schedule service
 * 
 * 
 */

 namespace App\Http\Services\Schedule;
 

// use DB

use Illuminate\Support\Facades\DB;



 class ScheduleValidation {



    
    /*
        * 
        *  @method: validateEmployeeID
        * 
        *  @purpose: to validate the employee id
        * 
        */
        public function validateEmployeeID($request) {
            $employeeDB = DB::table('employees')->where('employee_id', $request['employee_id'])->first();

            // does employee exist ?
            if ($employeeDB) {
                return true;
            }
            return false;
        }


        /**
         * 
         *  @method: doesScheduleExist
         * 
         * 
         * @purpose: to validate if the schedule exists
         * 
         * 
         */

         public function doesScheduleExist($request) : boolean {
             // might use a another
             // query inorder to validate the store id too
            $scheduleDB = DB::table('schedules')->where('employee_id', $request['employee_id'])->where('date', $request['date'])->first();
            // does schedule exist ?
            if ($scheduleDB) {
                return true;
            }
            return false;
        }


        /**
         * 
         *  @method: scheduleStatus
         *   
         *  @purpose: return the schedule status 
         * 
         *  @return: <INT>
         */

         public function scheduleStatus($request) : boolean  {
            $scheduleDB = DB::table('schedules')->where('employee_id', $request['employee_id'])->where('date', $request['date'])->first();
            // does schedule exist ?
            if ($scheduleDB) {
                return $scheduleDB->status;
            }
            return false;
        }


        /**
         *  
         *  @method: issueValidatationCert 
         * 
         * 
         *  @purpose: to issue a handshake that the rwquest was validated
         * 
         * 
         */

         private function issueValidationCert($hay = 32) : string {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < $hay; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
            return $randomString;
        }


        /**
         * 
         *  @method: issueBlockSize 
         * 
         * 
         *  @purpose: inorder to push handshakes in a block inorder to validate each 
         *            request that goes though our weighted graph
         * 
         */


        public function issueBlockSize($request) : string {
            $blockSize = $this->issueValidationCert(32);
            $blockShuffle = [];
            // shuffle the blocks inorder to init 
            // the weighted graph
            for ($i = 0; $i < 32; $i++) {
                $blockShuffle[$i] = mt_rand(0, strlen($blockSize) - 1);
            }

            // puish the block inorder to validate the request
            $block = strlen($blockSize) / 2 ;

            if ($block % 2 === 0 ) {
                $block = $block + 1;
            } else {
                $block = $block + 2;
            }   

            // return our blocks 
            return $block . $blockShuffle;
        }
    }

?>