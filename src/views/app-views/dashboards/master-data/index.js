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
        <Route
          path={`${match.url}/color-depth`}
          component={lazy(() => import(`./color-depth`))}
        />
        <Route
          path={`${match.url}/sensor`}
          component={lazy(() => import(`./sensor`))}
        />
        <Route
          path={`${match.url}/cpu`}
          component={lazy(() => import(`./cpu`))}
        />
        <Route
          path={`${match.url}/operating-system`}
          component={lazy(() => import(`./os`))}
        />
        <Route
          path={`${match.url}/memory-card`}
          component={lazy(() => import(`./memory-card`))}
        />
        <Route
          path={`${match.url}/memory-capacity`}
          component={lazy(() => import(`./memory-capacity`))}
        />
        <Route
          path={`${match.url}/battery`}
          component={lazy(() => import(`./battery`))}
        />
        <Route
          path={`${match.url}/resolution`}
          component={lazy(() => import(`./resolution`))}
        />
        <Route
          path={`${match.url}/sim-card`}
          component={lazy(() => import(`./simcard`))}
        />
        <Route
          path={`${match.url}/mno-parent`}
          component={lazy(() => import(`./mobile-number-op`))}
        />
        <Route
          path={`${match.url}/mno-product`}
          component={lazy(() => import(`./mobile-number-op-prod`))}
        />
        <Route
          path={`${match.url}/media-portal`}
          component={lazy(() => import(`./media-portal`))}
        />
        <Route
          path={`${match.url}/province`}
          component={lazy(() => import(`./province`))}
        />
        <Route
          path={`${match.url}/city`}
          component={lazy(() => import(`./city`))}
        />
        <Route
          path={`${match.url}/district`}
          component={lazy(() => import(`./district`))}
        />
        <Route
          path={`${match.url}/sub-district`}
          component={lazy(() => import(`./subdistrict`))}
        />
        <Redirect from={`${match.url}`} to={`/dashboards/default`} />
      </Switch>
    </Suspense>
  );
};

export default MasterDataDashboard;
