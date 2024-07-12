export const login = userInfo => {
  let { username, password } = userInfo;
  if (username == 13074187555 && password == 123456) {
    return {
      code: 200,
      msg: "登录成功",
      data: {
        loginname: "xuanmiaosama",
        token: "e1cb6468-60fc-4c1f-af71-14162517259c",
        avatar_url: "https://avatars.githubusercontent.com/u/10680120?v=4&s=120",
        score: 0
      }
    };
  } else {
    return {
      code: 400,
      msg: "用户名或密码错误",
      data: {}
    };
  }
};
