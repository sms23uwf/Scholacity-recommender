import { Home, DateRangeSharp, ContentPaste, Notifications, AccountCircle, Info, WorkOutline, Work, Assessment, ShoppingCart, LocalLibrarySharp, PlaylistAddCheck } from '@material-ui/icons';

import DashboardPage from '../components/DashboardPage';
import PlannerDashboard from '../components/PlannerDashboard';
import RecommendationsDashboard from '../components/RecommendationsDashboard';
import OfferingsDashboard from '../components/OfferingsDashboard';
import DOWDashboard from '../components/DOWDashboard';
import SelectionsDashboard from '../components/SelectionsDashboard';
import RegisteredCoursesDashboard from '../components/RegisteredCoursesDashboard';
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
    path: '/dowDashboard',
    sidebarName: 'Daily Offerings',
    navbarName: 'Daily Offerings',
    icon: DateRangeSharp,
    component: DOWDashboard
  },
  {
    path: '/plannerDashboard',
    sidebarName: 'My Interests',
    navbarName: 'My Interests',
    icon: PlaylistAddCheck,
    component: PlannerDashboard
  },
  {
    path: '/recommendationsDashboard',
    sidebarName: 'My Recommendations',
    navbarName: 'My Recommendations',
    icon: ShoppingCart,
    component: RecommendationsDashboard
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
