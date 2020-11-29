import React from 'react';
import CreateSvgIcon from "@material-ui/icons/utils/createSvgIcon";
import { Home, Info, Work, ShoppingCart, PlaylistAddCheck } from '@material-ui/icons';
import svgIcon from '@material-ui/core/SvgIcon';
import EmoticonConfusedOutline from '../icons/emoticon-confused-outline.svg';
import EmojiObjectsSharpIcon from '@material-ui/icons/EmojiObjectsOutlined';
import DashboardPage from '../components/DashboardPage';
import PlannerDashboard from '../components/PlannerDashboard';
import RecommendationsDashboard from '../components/RecommendationsDashboard';
import RegisteredCoursesDashboard from '../components/RegisteredCoursesDashboard';
import AboutPage from '../components/AboutPage';

const PsychologyOutline = CreateSvgIcon(
  <path d="M15.82,7.22l-1,0.4c-0.21-0.16-0.43-0.29-0.67-0.39L14,6.17C13.98,6.07,13.9,6,13.8,6h-1.6c-0.1,0-0.18,0.07-0.19,0.17 l-0.15,1.06c-0.24,0.1-0.47,0.23-0.67,0.39l-1-0.4c-0.09-0.03-0.2,0-0.24,0.09l-0.8,1.38c-0.05,0.09-0.03,0.2,0.05,0.26l0.85,0.66 C10.02,9.73,10,9.87,10,10c0,0.13,0.01,0.26,0.03,0.39l-0.84,0.66c-0.08,0.06-0.1,0.17-0.05,0.25l0.8,1.39 c0.05,0.09,0.15,0.12,0.25,0.09l0.99-0.4c0.21,0.16,0.43,0.29,0.68,0.39L12,13.83c0.02,0.1,0.1,0.17,0.2,0.17h1.6 c0.1,0,0.18-0.07,0.2-0.17l0.15-1.06c0.24-0.1,0.47-0.23,0.67-0.39l0.99,0.4c0.09,0.04,0.2,0,0.24-0.09l0.8-1.39 c0.05-0.09,0.03-0.19-0.05-0.25l-0.83-0.66C15.99,10.26,16,10.13,16,10c0-0.14-0.01-0.27-0.03-0.39l0.85-0.66 c0.08-0.06,0.1-0.17,0.05-0.26l-0.8-1.38C16.02,7.22,15.91,7.19,15.82,7.22z M13,11.43c-0.79,0-1.43-0.64-1.43-1.43 S12.21,8.57,13,8.57s1.43,0.64,1.43,1.43S13.79,11.43,13,11.43z"/>,
  "Psychology"
);

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
    icon: PsychologyOutline,
    component: PlannerDashboard
  },
  {
    path: '/recommendationsDashboard',
    sidebarName: 'My Recommendations',
    navbarName: 'My Recommendations',
    icon: EmojiObjectsSharpIcon,
    component: RecommendationsDashboard
  },
  {
    path: '/registeredCoursesDashboard',
    sidebarName: 'My Courses',
    navbarName: 'My Courses',
    icon: ShoppingCart,
    component: RegisteredCoursesDashboard
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