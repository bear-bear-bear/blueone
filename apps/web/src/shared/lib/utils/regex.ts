const regex = Object.freeze({
  phoneNumber: /^\d{7,20}$/,
  dateOfBirth: /^\d{6}$/,
  licenseNumber: /^[-\d가-힣ㄱ-ㅎ]{1,32}$/,
  insuranceNumber: /^[-\d]{1,32}$/,
});

export default regex;
