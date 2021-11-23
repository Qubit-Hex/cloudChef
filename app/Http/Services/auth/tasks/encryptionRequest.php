<?php


/**
 * 
 *  @class: encryptionRequest 
 * 
 * 
 *  @purpose; inorder to provide a encryption request with our system
 * 
 *  @author: oliver shwaba -> Qubit-hEx
 * 
 */


namespace App\Http\Services\auth\tasks;


 class encryptionRequest {

    public function __construct() {

    }
    
    /**
     *  @method: encrypt 
     * 
     *  @purpose: inorder to encrypt the datq
     * 
     *  @param: data to be encrypted
     *  @param: key to encrypt the data
     * 
     * 
     *  @return: encrypted text
     */

     public function encrypt($data, $key) {

        $data = json_encode($data);
        $encrypted = openssl_encrypt($data, 'AES-128-ECB', $key);

        return $encrypted;
     }


     /**
      * @method: decryptRequest
      *
      *
      * @purpose: encrypt a string of data 
      * 
      * @param: array $request
      * 
      * @return decrypted request object 
      */


      public function decrypt($data, $key) {

        $decrypted = openssl_decrypt($data, 'AES-128-ECB', $key);
        $decrypted = json_decode($decrypted, true);

        return $decrypted;

      }


      /** 
       *  @method: hashString / signature function 
       * 
       *  @parm: password to be hashed
       *  
       *  @return: hashed password
       */

       public function hashString($string, $salt, $algo = 'sha256') {

        return hash($algo, $string . $salt);
       }

        /*
         * 
         * @method: generateKey / Generate Salt
         *
         * @purpose: generate a random key
         * @return: random key
         * 
         */

         public function generateKey($length = 25) {
            return bin2hex(random_bytes($length));
         }


         /**
          *  @method: generateSalt / Generate Salt

            *  @purpose: generate a random salt
            *  @return: random salt 
          */

            public function generateSalt($length = 25) {
               return bin2hex(random_bytes($length));
            }
            
            
            
            /**
             *  @method: generate jwt signature
             * 
             *    @purpose: generate a signature
             *
             *    @param: string $string 
             */

               public function generateSignature($string) {
                  return hash('sha1', $string);
               }



            
            /**
             * @method: makeJWT
             * 
             *  @purpose: make a jwt token
             * 
             *  @param: array $payload
             * /
             */ 

               public function makeJWT($payload) {
   
                  $payload = json_encode($payload); 
                  $signature = $this->viewJWTSignature($payload);       
                  return $this->encrypt($payload, $signature);
               }


               /**
                * @method: viewJWTSignature 
                *
                  * @purpose: view the signature of the jwt token

                  * @param: string $token
                */

                public function viewJWTSignature($payload) {
                   return $this->generateSignature($payload);

                 }                

               /**
                * @method: decodeJWT
                  *
                  * @purpose: decode a jwt token
                  *
                  * @param: string $token
                  *

                  * @return: decoded token   
                */

                public function decodeJWT($token, $key) {
                  $decrypted = $this->decrypt($token, $key);
                  return $decrypted;
                }
            }
?>