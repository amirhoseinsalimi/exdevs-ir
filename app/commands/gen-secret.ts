export const generateSecretKey = (length) => {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length),
    );
  }

  if (process.env.NODE_ENV !== 'testing') {
    console.log(result);
  }

  return result;
}

generateSecretKey(32);

export default generateSecretKey;
