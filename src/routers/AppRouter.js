import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PlannerDashboard from '../components/PlannerDashboard';
import OfferingsDashboard from '../components/OfferingsDashboard';
import RecommendationsDashboard from '../components/RecommendationsDashboard';
import SelectionsDashboard from '../components/SelectionsDashboard';
import PortfolioDashboard from '../components/PortfolioDashboard';
import AdminDashboard from '../components/AdminDashboard';
import AboutPage from '../components/AboutPage';

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
        <PrivateRoute path="/recommendationsDashboard" component={RecommendationsDashboard}/>
        <PrivateRoute path="/selectionsDashboard" component={SelectionsDashboard}/>
        <PrivateRoute path="/portfolioDashboard" component={PortfolioDashboard}/>
        <PrivateRoute path="/adminDashboard" component={AdminDashboard}/>
        <PrivateRoute path="/aboutPage" component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
