import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import UploadImage from "./upload";

const ImagePage = ({ match }) => (
  <div>
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/default`} />
      <Route path={`${match.url}/upload`} component={UploadImage} />
    </Switch>
  </div>
);

export default ImagePage;
