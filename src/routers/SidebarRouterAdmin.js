import { Home, AssignmentSharp, Info, LocalLibrarySharp } from '@material-ui/icons';
import DashboardPage from '../components/DashboardPage';
import AdminDashboard from '../components/AdminDashboard';
import AdminAboutPage from '../components/AdminAboutPage';
import AdminOfferingsDashboard from '../components/AdminOfferingsDashboard';

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
    sidebarName: 'View Registrations',
    navbarName: 'View Registrations',
    icon: AssignmentSharp,
    component: AdminDashboard
  },
  {
    path: '/adminOfferingsDashboard',
    sidebarName: 'View Courses',
    navbarName: 'View Courses',
    icon: LocalLibrarySharp,
    component: AdminOfferingsDashboard
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
