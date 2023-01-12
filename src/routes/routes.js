import Dashboard from "../views/backend/Dashboard";
import Profile from "../views/backend/settings/Profile";
import Settings from "../views/backend/settings/Settings";

const routes = [
  { path: "/admin", exact: true, name: "Admin" },
  {
    path: "/admin/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/admin/profile",
    exact: true,
    name: "Profile",
    component: Profile,
  },
  {
    path: "/admin/settings",
    exact: true,
    name: "Settings",
    component: Settings,
  },
];

export default routes;
