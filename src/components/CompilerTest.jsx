import React, { useEffect } from 'react';
import $ from 'jquery';


function App() {

  useEffect(() => {
    const SEC_HTTPS = true;
    const SEC_BASE = "compilers.widgets.sphere-engine.com";
    
    const beforeSendSubmission = (data) => {
      $('#result').html('').append('> submissionSource: <br>' + data.submissionSource + '<br><br>');
      const testCode = data.submissionSource;
      console.log('테스트코드?', testCode)

      return {
        customData: data.customData + ';timestamp=' + Math.floor(Date.now() / 1000),
      }
    };

    const js = document.createElement('script');
    js.id = "sphere-engine-compilers-jssdk";
    js.src = (SEC_HTTPS ? "https" : "http") + "://" + SEC_BASE + "/static/sdk/sdk.js";
    js.onload = () => {
      const SECWidget = window.SEC.widget('example-widget');
      SECWidget.events.subscribe('beforeSendSubmission', beforeSendSubmission);
    };
    const fjs = document.getElementsByTagName('script')[0];
    fjs.parentNode.insertBefore(js, fjs);
}, []);


  return (
    <div id="board">
      <h1>테스트중</h1>

      <div data-id="example-widget" className="sec-widget" data-widget="71018ef2073563d3edb9a241b7c03ae3"></div>
      <button id="submitButton">제출하기</button>

      <pre id="result" style={{ height: '300px' }}>Submit submission to see the result</pre>
    </div>
  );
}

export default App;
