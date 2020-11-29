import React from 'react';
import CreateSvgIcon from "@material-ui/icons/utils/createSvgIcon";
import { Home, Info, Work, ShoppingCart, PlaylistAddCheck } from '@material-ui/icons';
import svgIcon from '@material-ui/core/SvgIcon';
import EmojiObjectsSharpIcon from '@material-ui/icons/EmojiObjectsOutlined';
import DashboardPage from '../components/DashboardPage';
import PlannerDashboard from '../components/PlannerDashboard';
import RecommendationsDashboard from '../components/RecommendationsDashboard';
import RegisteredCoursesDashboard from '../components/RegisteredCoursesDashboard';
import AboutPage from '../components/AboutPage';

const PsychologyOutline = CreateSvgIcon(
  <g>
  <path d="M15.82,7.22l-1,0.4c-0.21-0.16-0.43-0.29-0.67-0.39L14,6.17C13.98,6.07,13.9,6,13.8,6h-1.6c-0.1,0-0.18,0.07-0.19,0.17 l-0.15,1.06c-0.24,0.1-0.47,0.23-0.67,0.39l-1-0.4c-0.09-0.03-0.2,0-0.24,0.09l-0.8,1.38c-0.05,0.09-0.03,0.2,0.05,0.26l0.85,0.66 C10.02,9.73,10,9.87,10,10c0,0.13,0.01,0.26,0.03,0.39l-0.84,0.66c-0.08,0.06-0.1,0.17-0.05,0.25l0.8,1.39 c0.05,0.09,0.15,0.12,0.25,0.09l0.99-0.4c0.21,0.16,0.43,0.29,0.68,0.39L12,13.83c0.02,0.1,0.1,0.17,0.2,0.17h1.6 c0.1,0,0.18-0.07,0.2-0.17l0.15-1.06c0.24-0.1,0.47-0.23,0.67-0.39l0.99,0.4c0.09,0.04,0.2,0,0.24-0.09l0.8-1.39 c0.05-0.09,0.03-0.19-0.05-0.25l-0.83-0.66C15.99,10.26,16,10.13,16,10c0-0.14-0.01-0.27-0.03-0.39l0.85-0.66 c0.08-0.06,0.1-0.17,0.05-0.26l-0.8-1.38C16.02,7.22,15.91,7.19,15.82,7.22z M13,11.43c-0.79,0-1.43-0.64-1.43-1.43 S12.21,8.57,13,8.57s1.43,0.64,1.43,1.43S13.79,11.43,13,11.43z"/>,
  <path d="M19.94,9.06c-0.43-3.27-3.23-5.86-6.53-6.05C13.27,3,13.14,3,13,3C9.47,3,6.57,5.61,6.08,9l-1.93,3.48 C3.74,13.14,4.22,14,5,14h1v2c0,1.1,0.9,2,2,2h1v3h7v-4.68C18.62,15.07,20.35,12.24,19.94,9.06z M14.89,14.63L14,15.05V19h-3v-3H8 v-4H6.7l1.33-2.33C8.21,7.06,10.35,5,13,5c2.76,0,5,2.24,5,5C18,12.09,16.71,13.88,14.89,14.63z"/>
  "PsychologyOutline",
  </g>
);

const LightBulbOutline = CreateSvgIcon(
  <svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
  <g id="line">
    <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="m52.55 23.75c0 3.985-1.785 5.908-3.754 10.5-0.5028 1.172-4.211 13.38-4.211 13.38h-17.17s-2.981-11.67-3.546-12.62c-2.37-3.998-4.419-6.91-4.419-11.26 0-9.141 7.41-16.55 16.55-16.55 9.141 0 16.55 7.41 16.55 16.55z"/>
    <line x1="36" x2="36" y1="47.22" y2="35.28" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
    <line x1="41.97" x2="30.03" y1="35.28" y2="35.28" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
    <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.696" d="m44.16 58.79c0 3.24-3.651 5.867-8.155 5.867-4.504 0-8.155-2.627-8.155-5.867z"/>
    <line x1="27.99" x2="44.01" y1="54.98" y2="51.51" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.965"/>
    <line x1="38.2" x2="43.98" y1="56.07" y2="54.89" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
    <line x1="28.02" x2="33.8" y1="51.6" y2="50.42" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
  </g>
</svg>
);

const PensiveFaceOutline = CreateSvgIcon(
  <svg id="emoji" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <g id="line">
    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M28.9,44.5c2.4-0.7,11.9,0.5,14.1,2.1"/>
    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22.4,22.5c1.3-0.9,2.8-1.3,4.4-1.1c1.6,0,3.1,0.6,4.2,1.7"/>
    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M51.1,26.5c-2.7-0.7-5.5-0.8-8.2-0.3"/>
    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M42,58.4c12.3-3.3,19.5-15.9,16.2-28.2S42.3,10.7,30,14c-10,2.7-17,11.8-17,22.2c0,4.6,1.4,9.2,4,13"/>
    <path d="M31,30.7c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3S31,29,31,30.7"/>
    <path d="M48,33.7c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3S48,32,48,33.7"/>
    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.7,56.7c-1,1.6-1.2,3.7-0.5,5.5c1.1,3.3,4,5.2,7.2,4.2l4.9-1.4l1-0.3c0.8-0.2,1.3-1.1,1.1-1.8l0,0 c-0.2-0.5-0.6-0.9-1.2-1l1.2-0.3c0.8-0.2,1.3-1.1,1.1-1.8c-0.2-0.5-0.6-1-1.2-1.1l1.2-0.4c0.8-0.2,1.3-1.1,1.1-1.8 c-0.1-0.5-0.5-0.9-1-1l6.4-1.9c0.8-0.2,1.3-1.1,1.1-1.8s-1.1-1.3-1.8-1.1l0,0l-10.2,3l-5.1,1.5l0.6-7.8c0.1-0.9-1.5-1.2-2.1,0.2 L19.7,56.7z"/>
  </g>
</svg>
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
    icon: PensiveFaceOutline,
    component: PlannerDashboard
  },
  {
    path: '/recommendationsDashboard',
    sidebarName: 'My Recommendations',
    navbarName: 'My Recommendations',
    icon: LightBulbOutline,
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