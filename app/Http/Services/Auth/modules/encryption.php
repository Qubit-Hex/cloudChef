<?php



/**
 * 
 *  @class: ModuleEncryption 
 * 
 *  @purpose: this class is to provide encryption and hashing function for the auth Service 
 */

 namespace App\Http\Services\Auth\modules;

 class encryption {

    /**
     *  @method: generateToken 
     * 
     *  @purpose: to generate random token for the user 
     */

     public function random($length = 32) {
       return bin2hex(random_bytes($length));
     }




     /**
      *  @method: generatePasswordHash 
      *
      * @purpose: to generate random password for the user
      */

      public function generatePasswordHash($data, $salt, $algo) {
            return hash($algo, $data . $salt);
      }
      
      

      /**
       * 
       *  @method: encrypt
       * 
       * 
       * @purpose: inorder todo public / private key encryption
       *
       */

       public function encrypt($data, $key) {
           $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
           $encrypted = openssl_encrypt($data, 'aes-256-cbc', $key, 0, $iv);
           return base64_encode($encrypted . '::' . $iv);
       }


       /**
        * 
        *  @method: decrypt
        * 
        * 
        * @purpose: inorder todo public / private key decryption
        *
        */

        public function decrypt($data, $key) {
            list($encrypted_data, $iv) = explode('::', base64_decode($data), 2);
            return openssl_decrypt($encrypted_data, 'aes-256-cbc', $key, 0, $iv);
        }

 }
?>