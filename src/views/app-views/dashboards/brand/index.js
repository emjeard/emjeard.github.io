import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const BrandApp = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Route
        path={`${match.url}/list`}
        component={lazy(() => import(`./list`))}
      />
      <Route
        path={`${match.url}/edit/:id`}
        component={lazy(() => import(`./edit`))}
      />
       <Route
        path={`${match.url}/create`}
        component={lazy(() => import(`./add`))}
      />
      <Redirect from={`${match.url}`} to={`${match.url}/list`} />
    </Switch>
  </Suspense>
);

export default BrandApp;
