import { Home, DateRangeSharp, Info, Work, ShoppingCart, LocalLibrarySharp } from '@material-ui/icons';
import DashboardPage from '../components/DashboardPage';
import OfferingsDashboard from '../components/OfferingsDashboard';
import DOWDashboard from '../components/DOWDashboard';
import SelectionsDashboard from '../components/SelectionsDashboard';
import RegisteredCoursesDashboard from '../components/RegisteredCoursesDashboard';
import AltAboutPage from '../components/AltAboutPage';

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
    sidebarName: 'Courses By Domain',
    navbarName: 'Courses By Domain',
    icon: LocalLibrarySharp,
    component: OfferingsDashboard
  },
  {
    path: '/dowDashboard',
    sidebarName: 'Courses By Day',
    navbarName: 'Courses By Day',
    icon: DateRangeSharp,
    component: DOWDashboard
  },
  {
    path: '/selectionsDashboard',
    sidebarName: 'My Selections',
    navbarName: 'My Selections',
    icon: ShoppingCart,
    component: SelectionsDashboard
  },
  {
    path: '/registeredCoursesDashboard',
    sidebarName: 'My Courses',
    navbarName: 'My Courses',
    icon: Work,
    component: RegisteredCoursesDashboard
  },
  {
    path:'/altAboutPage',
    sidebarName: 'How To Use',
    navbarName: 'How To Use',
    icon: Info,
    component: AltAboutPage,
    showModal:true
  }
  
];

export default SidebarRouterAlt;