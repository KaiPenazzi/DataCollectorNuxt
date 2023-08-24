export default function hexToBase64(hexString:String) {
    // Konvertiere den Hex-String in ein Buffer-Objekt
    const buffer = Buffer.from(hexString, 'hex');

    // Konvertiere den Buffer in einen Base64-String
    const base64String = buffer.toString('base64');

    return base64String;
}