import { useAppContext } from "@/Context/appContext";
import HomeSmall from "./services/Components/HomeSmall";
import HomeBig from "./services/Components/HomeBig";

interface Props {}

const Home = () => {
  const { isLoadingUser, user } = useAppContext();
  return (
    <div>
      <div className="Plaptop:hidden Pdesktop:hidden PbigTablet:hidden Ptablet:hidden Pmobile:block Psmallmobile:block">
        <HomeSmall />
      </div>
      <div className="Plaptop:block Pdesktop:block PbigTablet:block Ptablet:block Pmobile:hidden Psmallmobile:hidden">
        <HomeBig />
      </div>
    </div>
  );
};

export default Home;
