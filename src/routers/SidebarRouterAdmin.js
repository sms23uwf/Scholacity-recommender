import { Home, ContentPaste, Notifications, AccountCircle, Info, WorkOutline, Work, Assessment, ShoppingCart, LocalLibrarySharp, PlaylistAddCheck } from '@material-ui/icons';

import DashboardPage from '../components/DashboardPage';
import CoursesDashboard from '../components/CoursesDashboard';
import SelectionsDashboard from '../components/SelectionsDashboard';
import PortfolioDashboard from '../components/PortfolioDashboard';
import AdminDashboard from '../components/AdminDashboard';
import AboutPage from '../components/AboutPage';

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
    path: '/coursesDashboard',
    sidebarName: 'Courses By Domain',
    navbarName: 'Courses By Domain',
    icon: LocalLibrarySharp,
    component: CoursesDashboard
  },
  {
    path: '/adminDashboard',
    sidebarName: 'Administration',
    navbarName: 'Administration',
    icon: Work,
    component: AdminDashboard
  },
  {
    path:'/aboutPage',
    sidebarName: 'About',
    navbarName: 'About',
    icon: Info,
    component: AboutPage,
    showModal:true
  }
  
];

export default SidebarRouterAlt;
