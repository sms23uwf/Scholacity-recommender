import { Home, ContentPaste, Notifications, AccountCircle, Info, WorkOutline, Work, Assessment, ShoppingCart, PlaylistAddCheck } from '@material-ui/icons';

import DashboardPage from '../components/DashboardPage';
import PlannerDashboard from '../components/PlannerDashboard';
import RecommendationsDashboard from '../components/RecommendationsDashboard';
import PortfolioDashboard from '../components/PortfolioDashboard';
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
    path: '/portfolioDashboard',
    sidebarName: 'Portfolio',
    navbarName: 'Portfolio',
    icon: Work,
    component: PortfolioDashboard
  },
  {
    path: '/recommendationsDashboard',
    sidebarName: 'Recommendations',
    navbarName: 'Recommendations',
    icon: ShoppingCart,
    component: RecommendationsDashboard
  },
  {
    path: '/plannerDashboard',
    sidebarName: 'Planner',
    navbarName: 'Planner',
    icon: PlaylistAddCheck,
    component: PlannerDashboard
  },
  {
    path:'/aboutPage',
    sidebarName: 'About This App',
    navbarName: 'About This App',
    icon: Info,
    component: AboutPage,
    showModal:true
  }
  
];

export default SidebarRouterAlt;