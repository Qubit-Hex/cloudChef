<?php

/**
 * @file: logger.php
 *
 *
 *  @purpose: inorder to log any request that are made the server via file sytem
 *
 *
 */





 namespace App\Http\Services\Schedule\core;



 class _LOGGER {


    private $log_file = '../storage/logs/Schedule_logs.log';

        /**
         *
         *  @method: constructor
         *
         *  @purpose: inorder to bootstrap our class and initialize the class
         */

        public function __construct() {
            // CHECK IF THE LOG FILE EXISTS
            if(!file_exists($this->log_file)) {
                // CREATE THE LOG FILE
                $this->create_log_file();
            }
        }


        /**
         *
         *  @method: log
         *
         *  @purpose: inorder to log any request that are made the server via file sytem
         *
         */

         public function log($payload) {
            // write to the log file

            // add ip address index and user agent to the payload
            $payload['ip_address'] = $_SERVER['REMOTE_ADDR'];
            $payload['user_agent'] = $_SERVER['HTTP_USER_AGENT'];



            $arr_to_string = json_encode($payload);

            $fopen = fopen($this->log_file, 'a');

            // write the payload to the log file
            // append to new line
            fwrite($fopen, $arr_to_string . "\n");

            // close the file
            fclose($fopen);

            return true;
         }

        /**
         *
         *  @method: create_log_file
         *
         *  @purpose: inorder to create the log file
         *
         */
        public function create_log_file()
        {
            // CREATE THE LOG FILE AND FOLDER IF IT DOESNT EXIST
            if(!file_exists($this->log_file)) {
                // CREATE THE LOG FILE
                $fstream = fopen($this->log_file, 'w');
                // close the file stream
                fclose($fstream);
            }
            // check was the log file created
            if(file_exists($this->log_file)) {
                // return true
                return true;
            }
        }
 }
?>
