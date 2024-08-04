const attachCookie = (res, tokenName, token) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const name = tokenName ? tokenName : "token";
  res.cookie(name, token, {
    maxAge: new Date(Date.now() + oneDay),
    httpOnly: true,
    secure: true,
    sameSite: "none",
    sign: true,
  });
};

export default attachCookie;
