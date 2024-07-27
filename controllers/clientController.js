import Client from "../models/clientModel.js";

const createClientAccount = async (phone, password, session) => {
  const newAccount = await Client.create({ phone, password }, { session });
  return newAccount;
};

export default createClientAccount;
