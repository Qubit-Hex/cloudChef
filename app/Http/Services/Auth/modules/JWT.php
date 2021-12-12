<?php 

/**
 * 
 *  @file: JWT.php
 * 
 * @description: This class is used to generate and verify JWT token
 * 
 */


 namespace App\Http\Services\Auth\modules;


 use App\Http\Services\Auth\modules\encryption;


 // LIBS TO BE INCLUDED

 use Illuminate\Support\Facades\DB;


 class JWT extends encryption {

    // SETTING FOR OUR JWT TOKEN

    private $privateKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBALhRQ/PJ6WHLSDJH
    SOXGADhG6sODkCFxE0xRgyPqi3QD8uFk0Fv3KyoZ6aZZ/sJgIo6UA3O9xpEushu3
    CIWtmm7HE5SS2X6zV4O09o3o3sf7ZcWDl9g2sdgI01g1PrkBpLf0wuMb8kZaPMs7
    Izr41eewHrK7C8wA8lLnW0J216cTAgMBAAECgYA1NgDQGLJvsSgem8XHz+mwVYjg
    +NJbVTGlDsM1Uzj/PUSZHWmpoymq9eAmTkTmCKrxTnnQqDDzKO/yYFzterjiVNnM
    CEy3yl5i+/zIJh9t84d7nG89t2WFEm/zg/G0Rcf0THEXKG66AdUlGVvoknmYxfKL
    nwfHRL5mVOkEGMjCQQJBANq/PAJVS+9O9CGibuIFrbrXBGXr9LZfg8o00i/UdI0b
    NMeSjLQElrbDRq9LDK7YTiDMG9mRyPQWVGUA/JXmBk0CQQDXtP8728R56P0yIKYT
    19tSWDXcCUZ0shDO806ntlxiZyunpkawlvLZ7vpyEYZQdLvhOCgELWW1bcJHsUnc
    AdLfAkBhxQ+hS1aBQ5zCW8OLqlYYKHqCw4/A47gX7Lv1PNRLLVnNyaax30strOIu
    /zBQBcYFyrS37f0Pe9uEuYgrx4ARAkBXEfJs4Rr/8rIxh8hB/kHDjWPAO+Y6uJ3c
    S44WWKAWAHs4ov+pzGSe374sSTKkS1qDYL2WYhTKFVH0ynV73yiVAkEApZtsmjDn
    Io4pvhoajkoaOgGj4jLQxjJZ9XiCi3+RMHLjXhFzFB449ZrQLAtS6Vgp9Rxw184z
    F2ySdJCtyyOXlg==';

    
   /**
    *
    * @method: create 
    *
    * @description: This method is used to create JWT token
    */

    static function create(array $payload, $key) {
            
            // SETTING THE HEADER FOR OUR JWT TOKEN
    
            $header = [
                'typ' => 'JWT',
                'alg' => 'RS256'
            ];
    
            // SETTING THE PAYLOAD FOR OUR JWT TOKEN
    
            $payload = array_merge($payload, [
                'iat' => time(),
                'exp' => time() + (60 * 60),
            ]);
    
            // SETTING THE HEADER AND PAYLOAD FOR OUR JWT TOKEN
    
            $jwt = base64_encode(json_encode($header)) . '.' . base64_encode(json_encode($payload));
    
            // SETTING THE SIGNATURE FOR OUR JWT TOKEN
    
            $signature = self::sign($jwt, $key . self::$privateKey, 'sha256');
    
            // RETURNING THE JWT TOKEN
    
            return $jwt . '.' . base64_encode($signature);
        }


    /**
     *  
     *  @method: sign
     * 
     * 
     *  @purpose: inorder to sign our jWT TOKEN we need to use the private key
     * 
     */

     static function sign($data, $key, $alg = 'sha256') {
        $header = ['typ' => 'JWT', 'alg' => $alg];
        $segments = [
            base64_encode(json_encode($header)),
            base64_encode($data)
        ];
        $signing_input = implode('.', $segments);
        return hash($alg, $signing_input . $key);
    }

    /**
     * 
     *  @method: decode  
     * 
     *  @purpose: This method is used to encode the jWT token
     */


    static function decode($jwt) {
        $segs = explode('.', $jwt);
        $content = json_decode(base64_decode($segs[0]), true);
        $signature = json_decode(base64_decode($segs[1]), true);
        return explode('.', $content)[1]; // return payload
    }
    


    /**
     * 
     *  @method: verify
     * 
     *  @purpose: This method is used to verify the jWT token
     */

     public function verify($jwt, $key) {
        $segs = explode('.', $jwt);
        $content = json_decode(base64_decode($segs[0]), true);
        $signature = json_decode(base64_decode($segs[1]), true);
        $signing_input = implode('.', [
            $segs[0],
            $segs[1]
        ]);
        return self::sign($signing_input, $key, 'sha256') === $signature ? $content : false;
       }


}




?>