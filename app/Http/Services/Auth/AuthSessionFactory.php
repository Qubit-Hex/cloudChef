<?php




/**
 * 
 * @class: AuthSessionFactory 
 * 
 * 
 *  @purpose: to generate a session factory for the user 
 *            we need to generate a object factory for the user some how ?
 *            and encrypt the user data and store it with the random private key
 *            and the public key is used to decrypt the data
 * 
 */


 namespace App\Http\Services\Auth;



 class AuthSessionFactory {

    
        /**
         * 
         *  @method: generateSessionFactory 
         * 
         *  @purpose: to make a factory for the session
         * 
         */



        public function __construct()
        {
                
        }


        /**
         * 
         * 
         *  @metod: generateSessionFactory
         * 
         *  @purpose: to generate a session factory for the user inorder to store the user data
         * 
         */

        static function generateSessionFactory()
        {
            $sessionFactory = new AuthSessionFactory();
        // return the factory to the user in encrypted form :/
            return $sessionFactory;
        }




 }
?>