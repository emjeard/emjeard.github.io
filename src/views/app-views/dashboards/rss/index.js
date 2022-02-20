import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import EditRSS from "./edit";
import RSSListApp from "./list";
import CreateRSSApp from "./create";

const RSSApp = ({ match }) => (
  <div>
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/create`} component={CreateRSSApp} />
      <Route path={`${match.url}/list`} component={RSSListApp} />
      <Route path={`${match.url}/edit/:id`} component={EditRSS} />
    </Switch>
  </div>
);

export default RSSApp;
