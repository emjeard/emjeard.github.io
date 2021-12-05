import React from "react";
import Script from "react-load-script";

export default function GoogleTrends({
  type,
  keyword,
  url,
  geo,
  time,
  widget,category
}) {
  const handleScriptLoad = (_) => {
    window.trends.embed.renderExploreWidgetTo(
      document.getElementById(widget),
      type,
      {
        comparisonItem: [{ keyword, geo: geo, time: time }],
        category: category,
        property: "",
      },
      {
        exploreQuery: `q=${encodeURI(keyword)}&cat=${category}&geo=${geo}&date=now ${time}`,
        guestPath: "https://trends.google.com:443/trends/embed/",
      }
    );
  };

  const renderGoogleTrend = (_) => {
    return <Script url={url} onLoad={handleScriptLoad} />;
  };

  return <div className="googleTrend">{renderGoogleTrend()}</div>;
}
