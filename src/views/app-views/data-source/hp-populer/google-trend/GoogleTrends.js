import React from "react";
import Script from "react-load-script";

export default function GoogleTrends({
  type,
  keyword,
  url,
  geo,
  time,
  widget,
  category,
  property,
}) {
  const handleScriptLoad = (_) => {
    window.trends.embed.renderExploreWidgetTo(
      document.getElementById(widget),
      type,
      {
        comparisonItem: [{ keyword, geo: geo, time: time }],
        category: category,
        property: property,
      },
      {
        exploreQuery: `q=${encodeURI(
          keyword
        )}&cat=${category}&geo=${geo}&gprop=${property}&date=${time}`,
        guestPath: "https://trends.google.com:443/trends/embed/",
      }
    );
  };

  const renderGoogleTrend = (_) => {
    return <Script url={url} onLoad={handleScriptLoad} />;
  };

  return <div className="googleTrend">{renderGoogleTrend()}</div>;
}
