import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const HandphonesPopuler = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Route path={`${match.url}/hp`} component={lazy(() => import(`./hp`))} />
      <Route
        path={`${match.url}/komparasi`}
        component={lazy(() => import(`./komparasi`))}
      />
      <Redirect from={`${match.url}`} to={`${match.url}/default`} />
    </Switch>
  </Suspense>
);

export default HandphonesPopuler;
