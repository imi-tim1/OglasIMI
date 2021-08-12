import * as CryptoJS from 'crypto-js'

export class Sha256 {
    
    static encrypt(text: string) {
        return CryptoJS.SHA256(text).toString(CryptoJS.enc.Base64);
    }

}