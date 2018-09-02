import Dashboard from "@material-ui/icons/Dashboard";

// core components/views
import DashboardPage from "../scenes/Dashboard/Dashboard";

const dashboardRoutes = [
    {
      path: "/dashboard",
      sidebarName: "Dashboard",
      navbarName: "Material Dashboard",
      icon: Dashboard,
      component: DashboardPage
    },
    { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }];

    export default dashboardRoutes;   