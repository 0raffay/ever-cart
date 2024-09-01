const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}


function validate(fieldsArray) {
  for (let i = 0; i < fieldsArray.length; i++) {
    const [fieldValue, fieldName] = fieldsArray[i];

    if (!fieldValue) {
      return {
        isValid: false,
        message: `${fieldName} is required`
      };
    }
  }

  return { isValid: true };
}

module.exports = {generateToken, validate}