<?php

/**
 * 
 *  class encryption
 *  purpose: interface for the authentication encrytion methods
 * 
 *  @author: Oliver shwaba -> Qbit-hEx
 */

 namespace App\Http\Services\auth;


class encryption {

    /**
     *  encryption settings:
     * 
     */

    // PRIVATE SERVER KEY for the encryption
    const DEFAULT_SALT_LENGTH = 128;
    const HASHING_COMPLEXITY = 1;


    public function __construct() {
        //

  
    }

    /**
     *  
     *  Hashing Methods and randomization methods 
     * 
     */

    public function generateHash($password, $salt) {
        return hash('sha256', $password . $salt);
    }

    public function generateSalt() {
        return bin2hex(random_bytes(self::DEFAULT_SALT_LENGTH));
    }

    // by default the hash is going to hashed in rate rounds of 5 rounds 
    // does two things one is to make the hash more secure and the other is to make the hash more random
    // but thr more round the more cost in computing power it will endure so use with caution!
    
    public function generatePasswordHash($password, $salt, $rounds = self::HASHING_COMPLEXITY) {
        $hash = $this->generateHash($password, $salt);
         if ($rounds <= 0) {
             return $hash;
         }
        return $this->generatePasswordHash($hash, $salt, $rounds - 1);
    }

    /**
     *  
     *  Encryption Methods 
     * 
     */
        public function encrypt($data, $key) {
            $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
            $encrypted = openssl_encrypt($data, 'aes-256-cbc', $key, 0, $iv);
            return base64_encode($encrypted . '::' . $iv);
        }

        public function decrypt($data, $key) {
            list($encrypted_data, $iv) = explode('::', base64_decode($data), 2);
            return openssl_decrypt($encrypted_data, 'aes-256-cbc', $key, 0, $iv);
        }

}


?>