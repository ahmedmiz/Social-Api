export default (): string => {  
    // Generate a random number between 0 and 999999  
    const randomNumber  : number = Math.floor(Math.random() * 1000000);  
    // Format the number as a 6-digit string (leading zeros included)  
    const token = randomNumber.toString().padStart(6, '0');  
    return token;  
}  