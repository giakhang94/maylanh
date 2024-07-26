import Client from "../models/clientModel.js";

const createClientAccount = async (phone, password, session) => {
  console.log(password);
  const newAccount = await Client.create({ phone, password });
  return newAccount;
};

export default createClientAccount;
