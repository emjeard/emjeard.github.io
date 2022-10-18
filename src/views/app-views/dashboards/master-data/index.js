import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const MasterDataDashboard = ({ match }) => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${match.url}/form-factor`}
          component={lazy(() => import(`./umu-model`))}
        />
         <Route
          path={`${match.url}/device-status`}
          component={lazy(() => import(`./device-status`))}
        />
        <Redirect from={`${match.url}`} to={`/dashboards/default`} />
      </Switch>
    </Suspense>
  );
};

export default MasterDataDashboard;
