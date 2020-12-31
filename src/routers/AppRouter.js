import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import LogoutPage from '../components/LogoutPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PlannerDashboard from '../components/PlannerDashboard';
import OfferingsDashboard from '../components/OfferingsDashboard';
import DOWDashboard from '../components/DOWDashboard';
import RecommendationsDashboard from '../components/RecommendationsDashboard';
import SelectionsDashboard from '../components/SelectionsDashboard';
import PortfolioDashboard from '../components/PortfolioDashboard';
import RegisteredCoursesDashboard from '../components/RegisteredCoursesDashboard';
import AdminDashboard from '../components/AdminDashboard';
import AdminLearningObjectiveDashboard from '../components/AdminLearningObjectiveDashboard';
import MaintenanceDashboard from '../components/MaintenanceDashboard';
import AboutPage from '../components/AboutPage';
import AdminAboutPage from '../components/AdminAboutPage';
import AdminOfferingsDashboard from '../components/AdminOfferingsDashboard';
import AdminDOWDashboard from '../components/AdminDOWDashboard';
import AltAboutPage from '../components/AltAboutPage';

export const history = createHistory();

const AppRouter = () => (

  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/cancel" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/plannerDashboard" component={PlannerDashboard}/>
        <PrivateRoute path="/offeringsDashboard" component={OfferingsDashboard}/>
        <PrivateRoute path="/dowDashboard" component={DOWDashboard}/>
        <PrivateRoute path="/recommendationsDashboard" component={RecommendationsDashboard}/>
        <PrivateRoute path="/selectionsDashboard" component={SelectionsDashboard}/>
        <PrivateRoute path="/portfolioDashboard" component={PortfolioDashboard}/>
        <PrivateRoute path="/registeredCoursesDashboard" component={RegisteredCoursesDashboard}/>
        <PrivateRoute path="/adminDashboard" component={AdminDashboard}/>
        <PrivateRoute path="/adminLearningObjectiveDashboard" component={AdminLearningObjectiveDashboard}/>
        <PrivateRoute path="/maintenanceDashboard" component={MaintenanceDashboard}/>
        <PrivateRoute path="/aboutPage" component={AboutPage} />
        <PrivateRoute path="/loginPage" component={LoginPage}/>
        <PrivateRoute path="/logoutPage" component={LogoutPage}/>
        <PrivateRoute path="/adminOfferingsDashboard" component={AdminOfferingsDashboard}/>
        <PrivateRoute path="/adminDOWDashboard" component={AdminDOWDashboard}/>
        <PrivateRoute path="/adminAboutPage" component={AdminAboutPage}/>
        <PrivateRoute path="/altAboutPage" component={AltAboutPage}/>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
