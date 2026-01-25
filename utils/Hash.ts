import CryptoJS from "crypto-js";

export default class Hash { // Nome de classe ruim, Hash é via de mão unica, não existe decrypt em hash
    public static encrypt(item: string): string {

        const encodedWord = CryptoJS.enc.Utf8.parse(item); // Isso não é encriptação, é apenas conversão de string para WordArray, só aumenta complexidade desnecessária

        /*
            Base64 não é um método de encriptação, é apenas uma codificação, conversão de bytes para string legível,
            isso só aumenta o tamanho do dado antes de encriptar, não trás nenhum ganho de segurança.
        */
        const encoded = CryptoJS.enc.Base64.stringify(encodedWord); 

        /* 
            AES é um método de encriptação simétrico, mas o uso de uma chave fixa (SECRET_KEY) pode ser um problema de segurança se a chave for vazada. 
            Além disso, a encriptação simétrica não é ideal para armazenar senhas, onde o hashing com sal (salt) seria mais apropriado.
        */
        const encodedHash = CryptoJS.AES.encrypt(encoded, process.env.SECRET_KEY!); 

        /*
            Inverter a string encriptada não adiciona segurança real, é apenas uma ofuscação superficial, trazendo mais complexidade e uma falsa sensação de segurança.
        */
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