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


    private $log_file = 'log.txt';

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
         *  @method: create_log_file
         *
         *  @purpose: inorder to create the log file
         *
         */
        public function create_log_file()
        {
            // CREATE THE LOG FILE AND FOLDER IF IT DOESNT EXIST
            
        }
 }
?>
