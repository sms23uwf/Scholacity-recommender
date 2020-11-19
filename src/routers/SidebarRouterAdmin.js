import { Home, AssignmentSharp, Info, LocalLibrarySharp, EditSharp } from '@material-ui/icons';
import DashboardPage from '../components/DashboardPage';
import AdminDashboard from '../components/AdminDashboard';
import AdminAboutPage from '../components/AdminAboutPage';
import AdminOfferingsDashboard from '../components/AdminOfferingsDashboard';
import MaintenanceDashboard from '../components/MaintenanceDashboard';
import AdminDOWDashboard from '../components/AdminDOWDashboard';

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
    sidebarName: 'View Courses by Area',
    navbarName: 'View Courses by Area',
    icon: LocalLibrarySharp,
    component: AdminOfferingsDashboard
  },
  {
    path: '/adminDOWDashboard',
    sidebarName: 'View Courses by Day',
    navbarName: 'View Courses by Day',
    icon: LocalLibrarySharp,
    component: AdminDOWDashboard
  },
  {
    path: '/maintenanceDashboard',
    sidebarName: 'Maintain Courses',
    navbarName: 'Maintain Courses',
    icon: EditSharp,
    component: MaintenanceDashboard
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
