const attachCookie = (res, token) => {
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    maxAge: new Date(Date.now() + oneDay),
    httpOnly: true,
    secure: true,
    sameSite: "none",
    sign: true,
  });
};

export default attachCookie;
