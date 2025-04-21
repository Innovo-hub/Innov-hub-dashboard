import { Breadcrumbs, Link } from "@mui/material";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { Link as RouterLink } from "react-router-dom";
import HomeCard from "./Home-Components/HomeCard";
const dummyData = [
  { name: "Users", number: 1023, Icon: CiUser },
  { name: "Products", number: 158, Icon: CiShoppingCart },
  { name: "Reports", number: "5", Icon: CiCircleInfo },
];

const Home = () => {
  return (
    <div >
      <Breadcrumbs aria-label="breadcrumb" className="mb-4">
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Dashboard
        </Link>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Overview
        </Link>
      </Breadcrumbs>

      {/* Responsive grid: 1 column on mobile, 2 on sm, 3 on md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:px-24 my-4">
        {dummyData.map((item, index) => (
          <HomeCard key={index} name={item.name} number={item.number} Icon={item.Icon} />
        ))}
      </div>
    </div>
  );
};

export default Home;
