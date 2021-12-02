import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Handphones = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Route
        path={`${match.url}/populer`}
        component={lazy(() => import(`./populer`))}
      />
      <Route
        path={`${match.url}/list`}
        component={lazy(() => import(`./list`))}
      />
      <Route
        path={`${match.url}/post`}
        component={lazy(() => import(`./post`))}
      />
      <Redirect from={`${match.url}`} to={`${match.url}/default`} />
    </Switch>
  </Suspense>
);

export default Handphones;
