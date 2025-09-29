export function PasscodeGenerator(length = 20) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charLength = chars.length;

  // Create a typed array of random values
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % charLength];
  }

  console.log("Generated passcode:", result);
  return result;
}
