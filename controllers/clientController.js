import Client from "../models/clientModel.js";

const createClientAccount = async (phone, password, session) => {
  return await Client.create({ phone, password }, { session: session });
};

export default createClientAccount;
