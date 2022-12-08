import CryptoJS from "crypto-js";

export default class Hash {
    public static encrypt(item: string): string {
        const encodedWord = CryptoJS.enc.Utf8.parse(item);
        const encoded = CryptoJS.enc.Base64.stringify(encodedWord);
        const encodedHash = CryptoJS.AES.encrypt(encoded, process.env.SECRET_KEY!);
        return encodedHash.toString().split('').reverse().join('');
    }
    
    public static decrypt(hash: string): string {
        const reversedHash = hash.toString().split('').reverse().join('');
        const decodedAES = CryptoJS.AES.decrypt(reversedHash, process.env.SECRET_KEY!);
        const decodedHash = CryptoJS.enc.Utf8.stringify(decodedAES);
        const encodedWord = CryptoJS.enc.Base64.parse(decodedHash.toString());
        return encodedWord.toString(CryptoJS.enc.Utf8);
    }
}