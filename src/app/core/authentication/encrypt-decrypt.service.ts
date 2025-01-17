import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {
  private secretKey = 'a7f8a79b34f1e4d7b9d5e3fa20863a2e'; // Replace with the actual key used for encryption and decryption
  private iv = '1234567890abcdef1234567890abcdef'; // Replace with the actual IV (if applicable)
  decryptData(encryptedData: string): string {
    // eslint-disable-next-line no-debugger
    const key = CryptoJS.enc.Utf8.parse(this.secretKey);
    const ivBytes = CryptoJS.enc.Hex.parse(this.iv);
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, { iv: ivBytes });
    // console.log(decrypted);
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }

  encryptData(data: any): { encryptedData: string } {
    const key = CryptoJS.enc.Hex.parse(this.secretKey); // Parse the secret key
    const ivBytes = CryptoJS.enc.Hex.parse(this.iv); // Parse the IV

    // Stringify the object for encryption
    const dataString = JSON.stringify(data);

    // Encrypt the data
    const encrypted = CryptoJS.AES.encrypt(dataString, key, {
      iv: ivBytes,
      mode: CryptoJS.mode.CBC, // Use CBC mode
      padding: CryptoJS.pad.Pkcs7, // Use PKCS7 padding
    }).toString();

    return { encryptedData: encrypted };
  }


  encryptDataLocal(data: any): string {
    const key = CryptoJS.enc.Utf8.parse(this.secretKey);
    const iv = CryptoJS.enc.Utf8.parse(this.iv);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      iv,
    }).toString();
    return encrypted;
  }

  // Decrypt Data
  decryptDataLocal(encryptedData: string): any {
    const key = CryptoJS.enc.Utf8.parse(this.secretKey);
    const iv = CryptoJS.enc.Utf8.parse(this.iv);
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, { iv });
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedText);
  }

  decryptDataLocalWithStorage(localStorageValue: string,): any {
    const userJson = localStorage.getItem(localStorageValue) as string;
    // console.log('-------------------------'+userJson);
    if(userJson !== null && userJson !== undefined && userJson)
    {
      const key = CryptoJS.enc.Utf8.parse(this.secretKey);
      const iv = CryptoJS.enc.Utf8.parse(this.iv);
      const decrypted = CryptoJS.AES.decrypt(userJson, key, { iv });
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedText);
    }else
    {
      return userJson;
    }

  }

}
