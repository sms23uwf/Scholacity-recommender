import { Home, AssignmentSharp, Info } from '@material-ui/icons';
import DashboardPage from '../components/DashboardPage';
import AdminDashboard from '../components/AdminDashboard';
import AdminAboutPage from '../components/AdminAboutPage';

const SidebarRouterAlt = [
  {
    path: '/dashboard',
    sidebarName: 'Home',
    navbarName: 'Home',
    icon: Home,
    component: DashboardPage,
    showModal: false
  },
  {
    path: '/adminDashboard',
    sidebarName: 'Administration',
    navbarName: 'Administration',
    icon: AssignmentSharp,
    component: AdminDashboard
  },
  {
    path:'/adminAboutPage',
    sidebarName: 'About',
    navbarName: 'About',
    icon: Info,
    component: AdminAboutPage,
    showModal:true
  }
  
];

export default SidebarRouterAlt;
