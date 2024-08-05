function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
}
function enableScroll() {
  window.onscroll = function () { };
}
function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
function openProofs() {
  if (inIframe())
    return;
  // do not open hoare logic proofs
  if (location.href.includes("corr-hoare"))
    return;
  disableScroll();
  $(".proof-knowl:not(.active)").click();
  this.setTimeout(enableScroll, 500);
}


window.addEventListener("load", function (event) {
  $('#ptx-toc ul li:has(a.active)').addClass('expand');
  openProofs();
  this.setTimeout(openProofs, 1000);

  $(".toggle").each(function (idx) { $(this).prop("checked", !darkmode); });
  $(".toggle").change(applyDarkmodeToggle);
});


$("body").on("click", "*[data-knowl]", function (evt) {
  setTimeout(
    function () {
      Prism.highlightAll();
    }, 500);
});


// set up Matomo
if (location.href.includes("prog2.de/book")) {
  console.log("Setting up Matomo");
  var _paq = window._paq = window._paq || []; /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function () {
    var u = "https://epica.cs.uni-saarland.de/";
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', '49']);
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
    g.async = true;
    g.src = u + 'matomo.js';
    s.parentNode.insertBefore(g, s);
  })();
}



const Request_orig = Request;

const proxy_forward = "https://cors-proxy.fringe.zone/";
// // https://github.com/RunestoneInteractive/RunestoneServer/blob/be92eff7ebf35d860ee4d6f06b8738a40297f7f3/controllers/proxy.py
var Request_overwrite = function (url, options) {
  console.log("Request: " + url);
  // return new Request_orig(url, options);
  if (url == "/runestone/proxy/pytutor_trace") {
    console.log("Request: " + url);
    var myVars = JSON.parse(options.body);
    var code = myVars.code;
    var lang = myVars.lang;
    var stdin = myVars.stdin;
    var targetDiv = options.targetDiv;

    var url = proxy_forward + "http://tracer.runestone.academy:5000/trace" + lang;

    // let data = encodeURI("src=" + code);
    let data = "src=" + encodeURIComponent(code);
    if (stdin) {
      data += "&stdin=" + encodeURIComponent(stdin);
    }

    var request = new Request_orig(url, {
      method: "POST",
      body: data,
      // headers: this.jsonHeaders,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "python-requests/2.25.1",
        "Connection": "keep-alive",
        "Accept-Encoding": "gzip, deflate",
        "Accept": "*/*",
      },
      // mode: "no-cors"
    });

    return request;
  } else {
    return new Request_orig(url, options);
  }
};

window.Request = Request_overwrite;
