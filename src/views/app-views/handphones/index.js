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
        path={`${match.url}/compare/list`}
        component={lazy(() => import(`./compare`))}
      />
      <Route
        path={`${match.url}/compare/edit/:id/:id2`}
        component={lazy(() => import(`./compare-edit`))}
      />
      <Route
        path={`${match.url}/post`}
        component={lazy(() => import(`./post`))}
      />
      <Route
        path={`${match.url}/edit/:id`}
        component={lazy(() => import(`./edit`))}
      />
      <Route
        path={`${match.url}/full/:id`}
        component={lazy(() => import(`./full`))}
      />
      <Redirect from={`${match.url}`} to={`${match.url}/default`} />
    </Switch>
  </Suspense>
);

export default Handphones;
