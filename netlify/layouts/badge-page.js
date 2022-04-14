const page = require('./base.js');


module.exports = (data) => {
  const badge = `
  <div class="badge-pane">
    <h1 class="logo"><img src="/badge/img/nx-conf-lite-logo.png" alt="nx conf / lite"></h1>
    <div class="donut"></div>
    <div class="card">
      <div class="top-bar">2022</div>
      <div class="badge-label">
        <p class="badge-name">${data.DisplayName}</p>
        <p class="badge-twitter">${data.TwitterHandle}</p>
      </div>
      <div class="bottom-bar">
        <span class="date">April 29 / 12-3pm ET</span>
        <span class="cta"><a href="https://nx.dev/conf">nx.dev/conf <svg width="29" height="11" viewBox="0 0 29 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.1105 6.00885H0V4.99115H27.1105L22.9676 0.719626L23.6656 0L29 5.5L23.6656 11L22.9676 10.2804L27.1105 6.00885Z" fill="white"/>
          </svg></a></span>
      </div>
    </div>
    <div class="pyramid"></div>
  </div>

  <div class="info-pane">
    <p><a class="primary-cta" href></a></p>
    <p class="tout-register">Learn more about Nx Conf Lite at <a href="https://nx.dev/conf">nx.dev/conf</a></p>
  </div>  
  `;

  return page({
    "title" : "Customize your conference badge",
    "content" : badge,
    "badgeNumber" : data.Path,
    "preloadImages": ["/badge/img/nx-conf-lite-logo.png","/badge/img/donut.png","/badge/img/pyramid.png","/badge/img/grid.png"],
    "scripts": ["badge-cta.js"]
  });

}
