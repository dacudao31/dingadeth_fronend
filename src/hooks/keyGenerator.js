/**
 * Generates a random 9-digit number string.
 * @returns {string} A 9-digit number string.
 */

export function generateAccessKey() {
    // Generate a random number between 100000000 and 999999999
    const min = 100000000; // Minimum 9-digit number
    const max = 999999999; // Maximum 9-digit number
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
    // Convert the number to a string
    return randomNumber.toString();
  }