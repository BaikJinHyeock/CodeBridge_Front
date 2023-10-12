import React, { useEffect } from "react";

const WidgetComponent = () => {
  const SEC_HTTPS = true;
  const SEC_BASE = "compilers.widgets.sphere-engine.com";

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "sphere-engine-compilers-jssdk";
    script.src =
      (SEC_HTTPS ? "https" : "http") + "://" + SEC_BASE + "/static/sdk/sdk.js";
    document.body.appendChild(script);

    return () => {
      document.getElementById("sphere-engine-compilers-jssdk").remove();
    };
  }, []);

  return (
    <div
      className="sec-widget"
      data-widget="71018ef2073563d3edb9a241b7c03ae3"
    ></div>
  );
};

export default WidgetComponent;
