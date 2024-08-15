import { useEffect } from "react";
import Stats from "./Stats";

interface Props {}
const Dashboard = (props: Props): React.JSX.Element => {
  return (
    <div className="w-full h-full">
      <Stats />
    </div>
  );
};

export default Dashboard;
