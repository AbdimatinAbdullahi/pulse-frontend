export function PasscodeGenerator(){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // declare characters
    
    const charLength = chars.length
    
    const randomValues = new Uint32Array(length)
    
    crypto.getRandomValues(randomValues) // Fills randomValues with just rundom values of upto or close to 4billion

    const result = ""
    
    for(let i = 0; i <= length; i++){

        // Take chars at the position of reminder of that random value
        result += chars[ randomValues[i] % charLength] 
    }

    console.log("The passcode: ", result)
    return result

}