import { Home, ContentPaste, Notifications, AccountCircle, Info, WorkOutline, Work, Assessment, ShoppingCart, LocalLibrarySharp, PlaylistAddCheck } from '@material-ui/icons';

import DashboardPage from '../components/DashboardPage';
import OfferingsDashboard from '../components/OfferingsDashboard';
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
    path: '/offeringsDashboard',
    sidebarName: 'Course Offerings',
    navbarName: 'Course Offerings',
    icon: LocalLibrarySharp,
    component: OfferingsDashboard
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
