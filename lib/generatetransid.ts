export default function generateTransId(length:number) {
    const numCount = 4; // Minimum count of numeric characters
    const smCount = 4; // Minimum count of alphabetic characters
    const cpCount = 4;

    // Characters to use in the OTP
    const numericCharacters = '123456789';
    const cpCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const smCharacters = 'abcdefghijklmnopqrstuvwxyz';

    let transId = '';

    // Generate minimum required numeric characters
    for (let i = 0; i < numCount; i++) {
        transId += numericCharacters.charAt(Math.floor(Math.random() * numericCharacters.length));
    }

    // Generate minimum required alphabetic characters
    for (let i = 0; i < smCount; i++) {
        transId += cpCharacters.charAt(Math.floor(Math.random() * cpCharacters.length));
    }

    // Generate minimum required alphabetic characters
    for (let i = 0; i < smCount; i++) {
        transId += smCharacters.charAt(Math.floor(Math.random() * smCharacters.length));
    }

    // Generate remaining characters randomly
    const remainingLength = length - (numCount + cpCount + smCount);
    const characters = numericCharacters + cpCharacters;

    for (let i = 0; i < remainingLength; i++) {
        transId += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Shuffle the OTP characters to randomize their positions
    transId = shuffleString(transId);

    return transId;
}

// const createOtp = generateOTP(6);

// Function to shuffle the characters in the OTP string
function shuffleString(str:string) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}
