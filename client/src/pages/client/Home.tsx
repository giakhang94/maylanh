import { useAppContext } from "@/Context/appContext";

interface Props {}

const Home = () => {
  const { isLoadingUser, user } = useAppContext();
  console.log(isLoadingUser);
  return <div>Home</div>;
};

export default Home;
