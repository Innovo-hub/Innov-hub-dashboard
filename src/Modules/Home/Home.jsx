import { Breadcrumbs, Link, CircularProgress } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { CiShoppingCart, CiUser, CiCircleInfo } from "react-icons/ci";
import { BiSolidOffer } from "react-icons/bi";
import HomeCard from "./Home-Components/HomeCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Shared/Loader/Loading";
import { CiClock1 } from "react-icons/ci";
const baseURL = import.meta.env.VITE_BASEURL;

const Home = () => {
  const [stats, setStats] = useState({
    UserCount: null,
    ProductCount: null,
    DealCount: null,
    ReportCount: null,
  });

  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Clock logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const [usersRes, productsRes, dealsRes, reportsRes] = await Promise.all(
          [
            axios.get(`${baseURL}/api/Dashboard/GetNumOfUsers`, config),
            axios.get(`${baseURL}/api/Dashboard/GetNumOfProducts`, config),
            axios.get(`${baseURL}/api/Dashboard/GetNumOfDeals`, config),
            axios.get(`${baseURL}/api/Dashboard/GetNumOfReports`, config),
          ]
        );

        setStats({
          UserCount: usersRes.data.UserCount,
          ProductCount: productsRes.data.ProductCount,
          DealCount: dealsRes.data.DealCount,
          ReportCount: reportsRes.data.ReportCount,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [token]);

  const cards = [
    { name: "Users", number: stats.UserCount, Icon: CiUser },
    { name: "Products", number: stats.ProductCount, Icon: CiShoppingCart },
    { name: "Deals", number: stats.DealCount, Icon: BiSolidOffer },
    { name: "Reports", number: stats.ReportCount, Icon: CiCircleInfo },
  ];

  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="px-4 sm:px-8 md:px-8 lg:px-8">
      <Breadcrumbs aria-label="breadcrumb" className="mb-4" color="primary">
        <Link component={RouterLink} to="/" underline="hover">
          Dashboard
        </Link>
        <Link component={RouterLink} to="/deals" underline="hover">
          Overview
        </Link>
      </Breadcrumbs>

      {/* Header Section */}
      <div className="bg-main p-6 rounded-xl my-6 shadow-md flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-white">
            Welcome to the Dashboard
          </h1>
          <p className="text-sm text-[#eee]">{formattedDate}</p>
        </div>
        <div className="text-xl flex justify-center items-center gap-2 font-mono text-white">
          <CiClock1 size={20} /> {formattedTime}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-10">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4">
          {cards.map((item, index) => (
            <HomeCard
              key={index}
              name={item.name}
              number={item.number}
              Icon={item.Icon}
            />
          ))}
        </div>
      )}
      <div className="flex flex-col">
        <h2 className="">Speed Access : </h2>
        <ul>
          <RouterLink to="/products" className="text-blue-500">
            Products
          </RouterLink>
          <li>
            <RouterLink to="/users" className="text-blue-500">
              Users
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/deals" className="text-blue-500">
              Deals
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/reports" className="text-blue-500">
              Reports
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/verifications" className="text-blue-500">
              verifications
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
