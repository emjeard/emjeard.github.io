import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import EditCustomPage from "./edit";
import ListCustomPage from "./list";

const CustomPageApp = ({ match }) => (
  <div>
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={ListCustomPage} />
      <Route path={`${match.url}/edit/:id`} component={EditCustomPage} />
    </Switch>
  </div>
);

export default CustomPageApp;
