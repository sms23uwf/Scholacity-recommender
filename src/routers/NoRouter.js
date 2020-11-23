import { Home, Info, Work, ShoppingCart, PlaylistAddCheck } from '@material-ui/icons';
import DashboardPage from '../components/DashboardPage';
import PlannerDashboard from '../components/PlannerDashboard';
import RecommendationsDashboard from '../components/RecommendationsDashboard';
import RegisteredCoursesDashboard from '../components/RegisteredCoursesDashboard';
import AboutPage from '../components/AboutPage';

const NoRouter = [
  {
    path: '/dashboard',
    sidebarName: 'Home',
    navbarName: 'Home',
    icon: Home,
    component: DashboardPage,
    showModal: false
  },
];

export default NoRouter;