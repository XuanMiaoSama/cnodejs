export const telReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/gi;
export const validateUser = (_, value, callback) => {
  console.log(value, "username");
  if (value == "") {
    console.log("first");
    return callback(new Error("请输入手机号"));
  }
  return callback();
};

export const validatePass = (_, value, callback) => {
  console.log(value, "password");
  if (value == "") {
    console.log("ssss");
    return callback(new Error("请输入密码"));
  }
  return callback();
};
