import { useAppContext } from "@/Context/appContext";

interface Props {}
const OrderByClient = (props: Props): React.JSX.Element => {
  const { isLoadingClient, client } = useAppContext();
  console.log(client);
  if (isLoadingClient) return <div>Loading...</div>;
  return <div>{client.phone}</div>;
};

export default OrderByClient;
