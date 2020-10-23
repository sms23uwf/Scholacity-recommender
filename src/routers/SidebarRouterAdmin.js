import { Home, AssignmentSharp, DateRangeSharp, ContentPaste, Notifications, AccountCircle, Info, WorkOutline, Work, Assessment, ShoppingCart, LocalLibrarySharp, PlaylistAddCheck } from '@material-ui/icons';
import DashboardPage from '../components/DashboardPage';
import PlannerDashboard from '../components/PlannerDashboard';
import RecommendationsDashboard from '../components/RecommendationsDashboard';
import OfferingsDashboard from '../components/OfferingsDashboard';
import DOWDashboard from '../components/DOWDashboard';
import SelectionsDashboard from '../components/SelectionsDashboard';
import RegisteredCoursesDashboard from '../components/RegisteredCoursesDashboard';
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
