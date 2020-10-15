import { Home, HowToRegSharp, ContentPaste, Notifications, AccountCircle, Info, WorkOutline, Work, Assessment, ShoppingCart, LocalLibrarySharp, PlaylistAddCheck } from '@material-ui/icons';

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
    path: '/selectionsDashboard',
    sidebarName: 'My Selections',
    navbarName: 'My Selections',
    icon: ShoppingCart,
    component: SelectionsDashboard
  },
  {
    path: '/portfolioDashboard',
    sidebarName: 'My Courses',
    navbarName: 'My Courses',
    icon: Work,
    component: PortfolioDashboard
  },
  {
    path:'/aboutPage',
    sidebarName: 'How To Use',
    navbarName: 'How To Use',
    icon: Info,
    component: AboutPage,
    showModal:true
  }
  
];

export default SidebarRouterAlt;