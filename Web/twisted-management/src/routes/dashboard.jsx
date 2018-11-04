// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Group from "@material-ui/icons/Group";
import CalendarToday from "@material-ui/icons/CalendarToday";


// core components/views
import DashboardPage from "scenes/Dashboard/Dashboard";
import AssistantsView from "scenes/Assistants/Assistants";
import {AssistantProfile} from "scenes/Assistants/AssistantContainer";
import ClientsView from "scenes/Clients/Clients";
import SchedulesView from "scenes/Schedules/Schedules";

const dashboardRoutes = [
  { path: "/dashboard", sidebarName: "Dashboard", navbarName: "Twisted Cloud Dashboard", icon: Dashboard, component: DashboardPage },
  { path: "/schedules", sidebarName: "Schedule", navbarName: "Appointments", icon: CalendarToday, component: SchedulesView },
  { path: "/clients", sidebarName: "Clients", navbarName: "Clients", icon: Group, component: ClientsView },
  { path: "/assistants", sidebarName: "Assistants",  icon: Group, component: AssistantsView },
  { path: "/assistant/:id", component: AssistantProfile, invisible: true },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }];

export default dashboardRoutes;   