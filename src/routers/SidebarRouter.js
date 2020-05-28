import { Home, ContentPaste, Notifications, AccountCircle, Info, WorkOutline, Work, Assessment, ShoppingCart, PlaylistAddCheck } from '@material-ui/icons';

import DashboardPage from '../components/DashboardPage';
import PlannerDashboard from '../components/PlannerDashboard';
import RecommendationsDashboard from '../components/RecommendationsDashboard';
import PortfolioDashboard from '../components/PortfolioDashboard';
import AboutPage from '../components/AboutPage';

const SidebarRouter = [
  {
    path: '/dashboard',
    sidebarName: 'Home',
    navbarName: 'Home',
    icon: Home,
    component: DashboardPage,
    showModal: false
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
    path: '/portfolioDashboard',
    sidebarName: 'My Courses',
    navbarName: 'Portfolio',
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

export default SidebarRouter;