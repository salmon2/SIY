const backURL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.webworks.kr'
    : 'http://localhost:8000';
const frontURL =
  process.env.NODE_ENV === 'production'
    ? 'https://webworks.kr'
    : 'http://localhost:3000';

module.exports = { backURL, frontURL,};
