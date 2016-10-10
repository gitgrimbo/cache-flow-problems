# Build

[Browserify](http://browserify.org/) is used to build the client dist file and
the bookmarklet dist file to `dist/`.

    npm run build-client
    npm run build-bk

---

# Bookmarklet

The bookmarklet collects Resource Timing information and POSTs it to the
capture server.

E.g. running the bookmarklet for the page
[https://en.wikipedia.org/wiki/Main_Page](https://en.wikipedia.org/wiki/Main_Page)
on Chrome 53 will POST the results to the
[capture server](../capture-server/README.md), as well as outputting the
following to the console with an empty browser cache:

```
addScriptsUntilSuccessful.onload
resource count=30
                                                                  name     type  stTime   dur initType workSt redSt redEnd fetchSt  dnsSt dnsEnd connSt connEnd secureConnSt reqStart respSt respEnd
https://en.wikipedia.org/w/load.p...tor.styles&only=styles&skin=vector resource   51.69  26.4     link      0     0      0   51.69  51.69  51.69  51.69   51.69            0    52.63  73.62   78.08
https://en.wikipedia.org/w/load.p...s=startup&only=scripts&skin=vector resource   51.77  5.47   script      0     0      0   51.77  51.77  51.77  51.77   51.77            0    52.25  54.23   57.24
https://en.wikipedia.org/w/load.p...ite.styles&only=styles&skin=vector resource   60.15  7.59     link      0     0      0   60.15  60.15  60.15  60.15   60.15            0    60.63  65.52   67.73
https://upload.wikimedia.org/wiki...nneman_f9e_o_%28square_crop%29.jpg resource   60.25 32.98      img      0     0      0   60.25  60.25  60.25  60.25   60.25            0    67.92  91.19   93.22
https://upload.wikimedia.org/wiki...can_Germander_%282981720555%29.jpg resource   60.33 35.21      img      0     0      0   60.33  60.33  60.33  60.33   60.33            0    67.91  93.42   95.54
https://upload.wikimedia.org/wiki...thew_Geostationary_VIS-IR_2016.jpg resource   60.41 36.82      img      0     0      0   60.41  60.41  60.41  60.41   60.41            0    67.96  95.32   97.23
https://upload.wikimedia.org/wiki...4ch_mit_Christhard_L%C3%A4pple.jpg resource    60.5  39.1      img      0     0      0    60.5   60.5   60.5   60.5    60.5            0    68.03  98.52   99.59
https://upload.wikimedia.org/wiki...5px-Death_warrant_of_Charles_I.jpg resource   60.57 38.38      img      0     0      0   60.57  60.57  60.57  60.57   60.57            0    67.98  97.87   98.95
https://upload.wikimedia.org/wiki...flight_-_east_of_Port_Stephens.jpg resource   60.66 54.29      img      0     0      0   60.66  60.66  60.66  60.66   60.66            0    67.93  100.4  114.95
  https://upload.wikimedia.org/wikipedia/en/9/9d/Commons-logo-31px.png resource   60.73 40.36      img      0     0      0   60.73  60.73  60.73  60.73   60.73            0    67.97  99.38  101.09
https://upload.wikimedia.org/wiki...i-logo.png/35px-Mediawiki-logo.png resource   60.81 57.56      img      0     0      0   60.81  60.81  60.81  60.81   60.81            0    67.97 115.81  118.37
     https://upload.wikimedia.org/wikipedia/en/b/bc/Meta-logo-35px.png resource   60.88 60.51      img      0     0      0   60.88  60.88  60.88  60.88   60.88            0    68.99 118.95  121.39
https://upload.wikimedia.org/wikipedia/en/7/7f/Wikibooks-logo-35px.png resource   61.39 58.65      img      0     0      0   61.39  61.39  61.39  61.39   61.39            0    69.14 118.53  120.04
https://upload.wikimedia.org/wiki...ogo.svg/47px-Wikidata-logo.svg.png resource    61.5 60.08      img      0     0      0    61.5   61.5   61.5   61.5    61.5            0    69.09 119.19  121.57
 https://upload.wikimedia.org/wikipedia/en/6/60/Wikinews-logo-51px.png resource    61.6 63.12      img      0     0      0    61.6   61.6   61.6   61.6    61.6            0    69.06 121.16  124.72
https://upload.wikimedia.org/wikipedia/en/4/46/Wikiquote-logo-51px.png resource    61.7  63.2      img      0     0      0    61.7   61.7   61.7   61.7    61.7            0    69.08 121.43   124.9
https://upload.wikimedia.org/wiki...a/en/b/b6/Wikisource-logo-35px.png resource   61.79 63.29      img      0     0      0   61.79  61.79  61.79  61.79   61.79            0    69.06 121.66  125.08
https://upload.wikimedia.org/wiki.../en/b/bf/Wikispecies-logo-35px.png resource   61.89 65.27      img      0     0      0   61.89  61.89  61.89  61.89   61.89            0    68.95 124.43  127.16
https://upload.wikimedia.org/wiki.../en/e/e3/Wikiversity-logo-41px.png resource   61.99 65.35      img      0     0      0   61.99  61.99  61.99  61.99   61.99            0    68.67 124.33  127.34
https://upload.wikimedia.org/wiki...px-Wikivoyage-Logo-v3-icon.svg.png resource   62.07 65.45      img      0     0      0   62.07  62.07  62.07  62.07   62.07            0    68.62 124.49  127.52
https://upload.wikimedia.org/wiki...vg/35px-Wiktionary-logo-v2.svg.png resource   62.32 65.38      img      0     0      0   62.32  62.32  62.32  62.32   62.32            0    68.64 124.69  127.69
           https://en.wikipedia.org/static/images/wikimedia-button.png resource   62.44     0      img      0     0      0   62.44  62.44  62.44  62.44   62.44            0    62.44  62.44   62.44
  https://en.wikipedia.org/static/images/poweredby_mediawiki_88x31.png resource   62.53     0      img      0     0      0   62.53  62.53  62.53  62.53   62.53            0    62.53  62.53   62.53
https://en.wikipedia.org/w/load.p...cripts&skin=vector&version=10bvo5q resource   74.49  4.57   script      0     0      0   74.49  74.49  74.49  74.49   74.49            0    74.84  75.19   79.06
       https://en.wikipedia.org/static/images/project-logos/enwiki.png resource   95.85     0      css      0     0      0   95.85  95.85  95.85  95.85   95.85            0    95.85  95.85   95.85
https://meta.wikimedia.org/w/inde..._tou_cc_4_a&uselang=en&debug=false resource  561.63 24.42   script      0     0      0  561.63      0      0      0       0            0        0      0  586.05
https://upload.wikimedia.org/wiki...K.svg/70px-Wmf_logo_vert_K.svg.png resource  651.01     0      img      0     0      0  651.01 651.01 651.01 651.01  651.01            0   651.01 651.01  651.01
https://upload.wikimedia.org/wiki...le.svg/70px-Cc.logo.circle.svg.png resource  651.17     0      img      0     0      0  651.17 651.17 651.17 651.17  651.17            0   651.17 651.17  651.17
https://upload.wikimedia.org/wiki...a/commons/c/cb/Close_x_-_black.png resource  651.34     0      img      0     0      0  651.34 651.34 651.34 651.34  651.34            0   651.34 651.34  651.34
                   https://localhost:8081/dist/client.js?1475832035472 resource 8060.29  9.98   script      0     0      0 8060.29      0      0      0       0            0        0      0 8070.27
```

and the following after a revisit (note some of the `dur`ations are now zero,
implying the resource was retrieved from browser cache):

```
addScriptsUntilSuccessful.onload
resource count=30
                                                                  name     type  stTime   dur initType workSt redSt redEnd fetchSt  dnsSt dnsEnd connSt connEnd secureConnSt reqStart respSt respEnd
https://en.wikipedia.org/w/load.p...tor.styles&only=styles&skin=vector resource  103.85 28.23     link      0     0      0  103.85 103.85 103.85 103.85  103.85            0   107.23 130.87  132.07
https://en.wikipedia.org/w/load.p...s=startup&only=scripts&skin=vector resource  104.01 30.03   script      0     0      0  104.01 104.01 104.01 104.01  104.01            0   107.33 131.58  134.04
https://en.wikipedia.org/w/load.p...ite.styles&only=styles&skin=vector resource   115.4 28.48     link      0     0      0   115.4  115.4  115.4  115.4   115.4            0   117.54 143.33  143.87
https://upload.wikimedia.org/wiki...nneman_f9e_o_%28square_crop%29.jpg resource  115.58 25.35      img      0     0      0  115.58 115.58 115.58 115.58  115.58            0   118.18 140.38  140.94
https://upload.wikimedia.org/wiki...can_Germander_%282981720555%29.jpg resource  115.93     0      img      0     0      0  115.93 115.93 115.93 115.93  115.93            0   115.93 115.93  115.93
https://upload.wikimedia.org/wiki...thew_Geostationary_VIS-IR_2016.jpg resource  116.08 26.74      img      0     0      0  116.08 116.08 116.08 116.08  116.08            0   118.67 142.44  142.82
https://upload.wikimedia.org/wiki...4ch_mit_Christhard_L%C3%A4pple.jpg resource  116.25 27.36      img      0     0      0  116.25 116.25 116.25 116.25  116.25            0   119.71  142.9  143.61
https://upload.wikimedia.org/wiki...5px-Death_warrant_of_Charles_I.jpg resource  116.57     0      img      0     0      0  116.57 116.57 116.57 116.57  116.57            0   116.57 116.57  116.57
https://upload.wikimedia.org/wiki...flight_-_east_of_Port_Stephens.jpg resource  116.89     0      img      0     0      0  116.89 116.89 116.89 116.89  116.89            0   116.89 116.89  116.89
  https://upload.wikimedia.org/wikipedia/en/9/9d/Commons-logo-31px.png resource  117.18     0      img      0     0      0  117.18 117.18 117.18 117.18  117.18            0   117.18 117.18  117.18
https://upload.wikimedia.org/wiki...i-logo.png/35px-Mediawiki-logo.png resource  117.48     0      img      0     0      0  117.48 117.48 117.48 117.48  117.48            0   117.48 117.48  117.48
     https://upload.wikimedia.org/wikipedia/en/b/bc/Meta-logo-35px.png resource  117.78     0      img      0     0      0  117.78 117.78 117.78 117.78  117.78            0   117.78 117.78  117.78
https://upload.wikimedia.org/wikipedia/en/7/7f/Wikibooks-logo-35px.png resource  118.11     0      img      0     0      0  118.11 118.11 118.11 118.11  118.11            0   118.11 118.11  118.11
https://upload.wikimedia.org/wiki...ogo.svg/47px-Wikidata-logo.svg.png resource  118.43     0      img      0     0      0  118.43 118.43 118.43 118.43  118.43            0   118.43 118.43  118.43
 https://upload.wikimedia.org/wikipedia/en/6/60/Wikinews-logo-51px.png resource  118.73     0      img      0     0      0  118.73 118.73 118.73 118.73  118.73            0   118.73 118.73  118.73
https://upload.wikimedia.org/wikipedia/en/4/46/Wikiquote-logo-51px.png resource  119.02     0      img      0     0      0  119.02 119.02 119.02 119.02  119.02            0   119.02 119.02  119.02
https://upload.wikimedia.org/wiki...a/en/b/b6/Wikisource-logo-35px.png resource  119.33     0      img      0     0      0  119.33 119.33 119.33 119.33  119.33            0   119.33 119.33  119.33
https://upload.wikimedia.org/wiki.../en/b/bf/Wikispecies-logo-35px.png resource  119.66     0      img      0     0      0  119.66 119.66 119.66 119.66  119.66            0   119.66 119.66  119.66
https://upload.wikimedia.org/wiki.../en/e/e3/Wikiversity-logo-41px.png resource  119.96     0      img      0     0      0  119.96 119.96 119.96 119.96  119.96            0   119.96 119.96  119.96
https://upload.wikimedia.org/wiki...px-Wikivoyage-Logo-v3-icon.svg.png resource  120.31     0      img      0     0      0  120.31 120.31 120.31 120.31  120.31            0   120.31 120.31  120.31
https://upload.wikimedia.org/wiki...vg/35px-Wiktionary-logo-v2.svg.png resource  120.63     0      img      0     0      0  120.63 120.63 120.63 120.63  120.63            0   120.63 120.63  120.63
           https://en.wikipedia.org/static/images/wikimedia-button.png resource  120.92     0      img      0     0      0  120.92 120.92 120.92 120.92  120.92            0   120.92 120.92  120.92
  https://en.wikipedia.org/static/images/poweredby_mediawiki_88x31.png resource  121.21     0      img      0     0      0  121.21 121.21 121.21 121.21  121.21            0   121.21 121.21  121.21
       https://en.wikipedia.org/static/images/project-logos/enwiki.png resource  178.98     0      css      0     0      0  178.98 178.98 178.98 178.98  178.98            0   178.98 178.98  178.98
https://en.wikipedia.org/w/load.p...cripts&skin=vector&version=10bvo5q resource  275.73  4.21   script      0     0      0  275.73 275.73 275.73 275.73  275.73            0   276.13  276.6  279.94
https://meta.wikimedia.org/w/inde..._tou_cc_4_a&uselang=en&debug=false resource  517.56 25.35   script      0     0      0  517.56      0      0      0       0            0        0      0  542.91
https://upload.wikimedia.org/wiki...K.svg/70px-Wmf_logo_vert_K.svg.png resource  624.57     0      img      0     0      0  624.57 624.57 624.57 624.57  624.57            0   624.57 624.57  624.57
https://upload.wikimedia.org/wiki...le.svg/70px-Cc.logo.circle.svg.png resource   625.1     0      img      0     0      0   625.1  625.1  625.1  625.1   625.1            0    625.1  625.1   625.1
https://upload.wikimedia.org/wiki...a/commons/c/cb/Close_x_-_black.png resource  625.61     0      img      0     0      0  625.61 625.61 625.61 625.61  625.61            0   625.61 625.61  625.61
                   https://localhost:8081/dist/client.js?1475832254853 resource 5404.23 38.76   script      0     0      0 5404.23      0      0      0       0            0        0      0 5442.99
```

## Content Security Policy

The bookmarklet is limitied in its use to sites that don't have a strict
[Content Security Policy](https://en.wikipedia.org/wiki/Content_Security_Policy).

E.g., running the bookmarklet on https://github.com/:

```
VM127:1 Refused to load the script 'https://localhost:8081/dist/client.js?1475831876624' because it violates the following Content Security Policy directive: "script-src assets-cdn.github.com".
t @ VM127:1n @ VM127:1o @ VM127:1t @ VM127:1t.3.../shared/entries-utils @ VM127:1o @ VM127:1e @ VM127:1(anonymous function) @ VM127:1
VM127:1 addScriptsUntilSuccessful.onerror
VM127:1 Refused to load the script 'http://localhost:8080/dist/client.js?1475831876624' because it violates the following Content Security Policy directive: "script-src assets-cdn.github.com".
t @ VM127:1n @ VM127:1onerror @ VM127:1t @ VM127:1n @ VM127:1o @ VM127:1t @ VM127:1t.3.../shared/entries-utils @ VM127:1o @ VM127:1e @ VM127:1(anonymous function) @ VM127:1
VM127:1 addScriptsUntilSuccessful.onerror
VM127:1 Refused to load the script 'https://github.com/undefined' because it violates the following Content Security Policy directive: "script-src assets-cdn.github.com".
t @ VM127:1n @ VM127:1onerror @ VM127:1t @ VM127:1n @ VM127:1onerror @ VM127:1t @ VM127:1n @ VM127:1o @ VM127:1t @ VM127:1t.3.../shared/entries-utils @ VM127:1o @ VM127:1e @ VM127:1(anonymous function) @ VM127:1
VM127:1 addScriptsUntilSuccessful.onerror
```

---

# Data Format

The data is POSTed to the [capture server](../capture-server/README.md) in the
following format:

````json
{
  "userAgent": "string: The user agent of the browser the data was captured from.",
  "url": "string: The URL of the site the data was captured from.",
  "timestamp": "number: When the capture was made (as taken from new Date().getTime() on the browser).",
  "session": "string: A session id. Used to associate captures together.",
  "tag": "string: Free-format text to associate with the capture.",
  "scriptOrigin": "string: The scheme, host and port of the client JS that captured the data",
  "entries": {
    "keys": "string[]. The keys of the data items.",
    "data": "(string|number)[][]. The data in an array-of-arrays format,
      where item[i] corresponds to key[i]."
  }
}
````

The `keys`/`data` approach is an attempt at basic compression of the payload.
Because the `Performance.getEntries` data is all the same 'shape', we convert
each [`PerformanceResourceTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming)
into an array, where each element of the array maps to the corresponding element of the keys.
