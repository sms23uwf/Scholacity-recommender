import React from 'react';
import CreateSvgIcon from "@material-ui/icons/utils/createSvgIcon";
import { Home, DateRangeSharp, Info, Work, ShoppingCart, LocalLibrarySharp, ExitToApp } from '@material-ui/icons';
import DashboardPage from '../components/DashboardPage';
import OfferingsDashboard from '../components/OfferingsDashboard';
import DOWDashboard from '../components/DOWDashboard';
import SelectionsDashboard from '../components/SelectionsDashboard';
import RegisteredCoursesDashboard from '../components/RegisteredCoursesDashboard';
import AltAboutPage from '../components/AltAboutPage';
import LogoutPage from '../components/LogoutPage';

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

const PensiveFaceFill = CreateSvgIcon(
  <svg id="emoji" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <g id="color">
    <circle cx="36" cy="36.2" r="24" fill="#DCDCDC"/>
    <path fill="#DCDCDC" d="M19.1,62.3c-0.3-1.2-0.4-2.4-0.3-3.6c0.2-1.1,2.3-6.5,2.7-7.3s1.4-4.5,2.4-4.8c1-0.3,1.2,0.1,1.1,0.7 S24.4,55,24.4,55l9.4-2.8c0,0,7.7-1.9,7.9-1c2.1,2-5.4,4.5-7.5,4.4c0,0,1.1,0.6,0.9,1.3s-0.8,1.2-1,1.2s0.5,0.5,0.6,1.4 c0.9,1.8-2.8,2.3-2.8,2.3c1.3-0.2,3.3,2.1,0.1,2.7c-1,0.3-4.8,1.4-4.8,1.4s-3.3,1.2-5.2-0.1C20.8,65,19.7,63.8,19.1,62.3z"/>
  </g>
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
    icon: LightBulbOutline,
    component: SelectionsDashboard
  },
  {
    path: '/registeredCoursesDashboard',
    sidebarName: 'My Courses',
    navbarName: 'My Courses',
    icon: ShoppingCart,
    component: RegisteredCoursesDashboard
  },
  {
    path:'/altAboutPage',
    sidebarName: 'How To Use',
    navbarName: 'How To Use',
    icon: Info,
    component: AltAboutPage,
    showModal:true
  },
  {
    path: '/logoutPage',
    sidebarName: 'Log Out',
    navbarName: 'Log Out',
    icon: ExitToApp,
    component: LogoutPage,
    showModal: false
  }
  
];

export default SidebarRouterAlt;