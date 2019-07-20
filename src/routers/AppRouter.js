import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import EditCourseRecommendationPage from '../components/EditCourseRecommendationPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PlannerDashboard from '../components/PlannerDashboard';
import RecommendationsDashboard from '../components/RecommendationsDashboard';
import PortfolioDashboard from '../components/PortfolioDashboard';
import ScholacityModal from '../components/ScholacityModal';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/plannerDashboard" component={PlannerDashboard}/>
        <PrivateRoute path="/recommendationsDashboard" component={RecommendationsDashboard}/>
        <PrivateRoute path="/portfolioDashboard" component={PortfolioDashboard}/>
        <PrivateRoute path="/edit/:id" component={EditCourseRecommendationPage} />
        <PrivateRoute path="/scholacityModal" component={ScholacityModal} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
