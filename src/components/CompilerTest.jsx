import React, { useEffect } from "react";
import $ from "jquery";

function CompilerTest({submittedCode}) {
  useEffect(() => {
    const SEC_HTTPS = true;
    const SEC_BASE = "compilers.widgets.sphere-engine.com";

    const beforeSendSubmission = (data) => {
      $("#result")
        .html("")
        .append(
          "> submissionSource: <br>" + data.submissionSource + "<br><br>"
        );
      const testCode = data.submissionSource;
      submittedCode(testCode);

      return {
        customData:
          data.customData + ";timestamp=" + Math.floor(Date.now() / 1000),
      };
    };

    const js = document.createElement("script");
    js.id = "sphere-engine-compilers-jssdk";
    js.src =
      (SEC_HTTPS ? "https" : "http") + "://" + SEC_BASE + "/static/sdk/sdk.js";
    js.onload = () => {
      const SECWidget = window.SEC.widget("example-widget");
      SECWidget.events.subscribe("beforeSendSubmission", beforeSendSubmission);
    };
    const fjs = document.getElementsByTagName("script")[0];
    fjs.parentNode.insertBefore(js, fjs);
  }, []);

  return (
    <div id="board">
      <h1>테스트 페이지</h1>
      <div
        data-id="example-widget"
        className="sec-widget"
        data-widget="7ec2c1d1a075cf56ec2f9ef8f205db1b"
      />



    </div>
  );
}

export default CompilerTest;
