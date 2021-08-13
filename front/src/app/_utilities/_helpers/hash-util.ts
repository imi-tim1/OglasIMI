import * as CryptoJS from 'crypto-js'

export class Sha256 {
    
    static encrypt(text: string) {
        return CryptoJS.SHA512(text).toString(CryptoJS.enc.Hex);
    }

}