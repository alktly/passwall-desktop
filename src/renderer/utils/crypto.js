import CryptoJS from 'crypto-js'

const keySize = 256 // 32
const ivSize = 128 // 16
const iterations = 100
const iv = CryptoJS.lib.WordArray.random(ivSize / 8)

export const isBase64 = value => {
  try {
    return btoa(atob(value)) == value
  } catch (_) {
    return false
  }
}

export default class CryptoUtils {
  static transmissionKey
  static encryptKey

  static hmac(msg, transmissionKey = this.transmissionKey) {
    const encrypted = CryptoJS.HmacSHA256(msg, transmissionKey)
    return encrypted.toString()
  }

  static encrypt(message, password = this.encryptKey) {
    const salt = CryptoJS.lib.WordArray.random(128 / 8)

    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: keySize / 32,
      iterations: iterations
    })

    const encrypted = CryptoJS.AES.encrypt(message, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
      hasher: CryptoJS.algo.SHA256
    })

    // salt, iv will be hex 32 in length
    // append them to the ciphertext for use  in decryption
    const transitMessage = salt.toString() + iv.toString() + encrypted.toString()
    return transitMessage
  }

  static decrypt(transitMessage, pass = this.encryptKey) {
    const salt = CryptoJS.enc.Hex.parse(transitMessage.substr(0, 32))
    const iv = CryptoJS.enc.Hex.parse(transitMessage.substr(32, 32))
    const encrypted = transitMessage.substring(64)

    const key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize / 32,
      iterations: iterations
    })

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
      hasher: CryptoJS.algo.SHA256
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
  }

  static pbkdf2Encrypt(masterPassword = this.encryptKey, secret) {
    const cipher = CryptoJS.PBKDF2(masterPassword, secret, {
      keySize: 256 / 32,
      iterations: 100000,
      hasher: CryptoJS.algo.SHA256
    })

    return cipher.toString()
  }

  static sha256Encrypt(value) {
    return CryptoJS.SHA256(value).toString()
  }

  static aesEncrypt(value, key = this.transmissionKey) {
    return CryptoJS.AES.encrypt(value, key).toString()
  }

  static aesDecrypt(value, key = this.transmissionKey) {
    return CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8)
  }

  static encryptFields(data, encryptKey = this.encryptKey) {
    Object.keys(data).forEach(key => {
      data[key] = this.encrypt(data[key], encryptKey)
    })
  }

  static decryptFields(data, keyList, encryptKey = this.encryptKey) {
    Object.keys(data).forEach(key => {
      if (data[key] && keyList.includes(key)) {
        data[key] = this.decrypt(data[key].toString(), encryptKey)
      }
    })
  }

  static encryptPayload(
    data,
    keyList,
    encryptKey = this.encryptKey,
    transmissionKey = this.transmissionKey
  ) {
    Object.keys(data).forEach(key => {
      if (keyList.includes(key)) {
        data[key] = this.encrypt(data[key], encryptKey)
      }
    })

    const payload = {
      data: this.aesEncrypt(JSON.stringify(data), transmissionKey)
    }

    return payload
  }
}
