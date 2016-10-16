# Build

[Browserify](http://browserify.org/) is used to build the client dist file and
the bookmarklet dist file to `dist/`.

    npm run build-all

You can watch the source files and do auto-builds by:

    npm run watch

The built files will appear in the `./dist` folder.

---

# Bookmarklet

The bookmarklet collects Resource Timing information and POSTs it to the
capture server.

To use a bookmarket, copy its content from the `./dist/` folder after a build
and create a new bookmark in your browser, with a `javascript:` prefix.  E.g.:

`javascript:COPIED_CONTENTS`

Running the bookmarklet for the page
[https://en.wikipedia.org/wiki/Main_Page](https://en.wikipedia.org/wiki/Main_Page)
on Chrome 54 with an empty cache, will POST the results to the
[capture server](../capture-server/README.md), as well as outputting the
following to the console (Wikipedia is a good example as it includes the
`Timing-Allow-Origin` HTTP response header):

```
addScriptsUntilSuccessful.onload: https://localhost:8081/dist/client.js?1476619788286
resource count=31
                                                                  name type  stTime    dur initType workSt redSt redEnd fetchSt   dnsSt  dnsEnd  connSt connEnd secConnSt reqStart  respSt respEnd  txSz encBdSz decBdSz
https://en.wikipedia.org/w/load.p...tor.styles&only=styles&skin=vector  res  206.05 175.26     link      0     0      0  206.05  206.05  206.05  206.05  206.05         0   209.86  378.25  381.31 12209   11568   51580
https://en.wikipedia.org/w/load.p...s=startup&only=scripts&skin=vector  res  206.18 182.18   script      0     0      0  206.18  206.18  206.18  206.18  206.18         0   210.34  385.99  388.37 26019   25364   72214
https://en.wikipedia.org/w/load.p...ite.styles&only=styles&skin=vector  res  206.31 176.33     link      0     0      0  206.31  206.31  206.31  206.31  206.31         0   210.42  381.53  382.63  6016    5391   20392
https://upload.wikimedia.org/wiki...jpg/100px-Bobby_Robson_Cropped.jpg  res  217.19 334.68      img      0     0      0  217.19  217.19  217.19  217.19  217.19         0   385.04  550.57  551.87  6276    5639    5639
https://upload.wikimedia.org/wiki...Khairul_Fahmi%27s_Wedding_2013.jpg  res   217.4 337.35      img      0     0      0   217.4   217.4   217.4   217.4   217.4         0   385.17   554.1  554.75  6431    5774    5774
https://upload.wikimedia.org/wiki...g_Bhumibol_Adulyadej_2010-9-29.jpg  res  217.55 339.21      img      0     0      0  217.55  217.55  217.55  217.55  217.55         0    385.6  554.36  556.76  4985    4265    4265
https://upload.wikimedia.org/wiki...x-MargaretSanger-Underwood.LOC.jpg  res  217.69 342.76      img      0     0      0  217.69  217.69  217.69  217.69  217.69         0   385.93  559.13  560.46  4405    3733    3733
https://upload.wikimedia.org/wiki...s_and_jar_-_Google_Art_Project.jpg  res  217.83 346.99      img      0     0      0  217.83  217.83  217.83  217.83  217.83         0   386.27  559.62  564.81 33193   32384   32384
  https://upload.wikimedia.org/wikipedia/en/9/9d/Commons-logo-31px.png  res  217.95 351.45      img      0     0      0  217.95  217.95  217.95  217.95  217.95         0   386.66  568.43   569.4  2340    1694    1694
https://upload.wikimedia.org/wiki...i-logo.png/35px-Mediawiki-logo.png  res  218.07 504.58      img      0     0      0  218.07  218.07  218.07  218.07  218.07         0   552.43  722.02  722.65  6423    5718    5718
     https://upload.wikimedia.org/wikipedia/en/b/bc/Meta-logo-35px.png  res  218.21 507.11      img      0     0      0  218.21  218.21  218.21  218.21  218.21         0   555.59  724.88  725.32  2267    1611    1611
https://upload.wikimedia.org/wikipedia/en/7/7f/Wikibooks-logo-35px.png  res  218.34 510.06      img      0     0      0  218.34  218.34  218.34  218.34  218.34         0   557.77  727.58  728.39  2370    1722    1722
https://upload.wikimedia.org/wiki...ogo.svg/47px-Wikidata-logo.svg.png  res  218.46 510.75      img      0     0      0  218.46  218.46  218.46  218.46  218.46         0   561.75  728.72   729.2  1134     436     436
 https://upload.wikimedia.org/wikipedia/en/6/60/Wikinews-logo-51px.png  res  218.58 517.93      img      0     0      0  218.58  218.58  218.58  218.58  218.58         0   568.36  735.87  736.51  3560    2921    2921
https://upload.wikimedia.org/wikipedia/en/4/46/Wikiquote-logo-51px.png  res  218.71    518      img      0     0      0  218.71  218.71  218.71  218.71  218.71         0   570.48  736.13  736.71  2034    1388    1388
https://upload.wikimedia.org/wiki...a/en/b/b6/Wikisource-logo-35px.png  res  218.83    671      img      0     0      0  218.83  218.83  218.83  218.83  218.83         0   723.12  889.39  889.84  2930    2280    2280
https://upload.wikimedia.org/wiki.../en/b/bf/Wikispecies-logo-35px.png  res  218.96 674.67      img      0     0      0  218.96  218.96  218.96  218.96  218.96         0   727.38  893.15  893.63  4296    3629    3629
https://upload.wikimedia.org/wiki.../en/e/e3/Wikiversity-logo-41px.png  res  219.08 676.47      img      0     0      0  219.08  219.08  219.08  219.08  219.08         0   729.02  894.96  895.55  1874    1227    1227
https://upload.wikimedia.org/wiki...px-Wikivoyage-Logo-v3-icon.svg.png  res  219.22 676.52      img      0     0      0  219.22  219.22  219.22  219.22  219.22         0   730.08   895.2  895.74  1520     814     814
https://upload.wikimedia.org/wiki...vg/35px-Wiktionary-logo-v2.svg.png  res  219.36 683.19      img      0     0      0  219.36  219.36  219.36  219.36  219.36         0   737.44  902.17  902.55  2247    1542    1542
           https://en.wikipedia.org/static/images/wikimedia-button.png  res  219.49  350.4      img      0     0      0  219.49  219.49  219.49  219.49  219.49         0   386.73  569.02  569.89  3010    2426    2426
  https://en.wikipedia.org/static/images/poweredby_mediawiki_88x31.png  res  219.61 350.03      img      0     0      0  219.61  219.61  219.61  219.61  219.61         0    386.8  568.68  569.63  2161    1585    1585
       https://en.wikipedia.org/static/images/project-logos/enwiki.png  res  410.23 174.48      css      0     0      0  410.23  410.23  410.23  410.23  410.23         0   411.19  580.89  584.71 21242   20616   20616
https://en.wikipedia.org/w/load.p...cripts&skin=vector&version=0f3xo9s  res  504.94 183.33   script      0     0      0  504.94  504.94  504.94  504.94  504.94         0   505.66  675.06  688.26 50783   50057  176338
https://en.wikipedia.org/w/load.p...kibits&skin=vector&version=1hsthyo  res  746.56 170.64   script      0     0      0  746.56  746.56  746.56  746.56  746.56         0   747.27  916.65  917.21  5925    5317   17433
https://en.wikipedia.org/w/load.p...faults&skin=vector&version=0c4iw0c  res  749.18 181.95   script      0     0      0  749.18  749.18  749.18  749.18  749.18         0   750.24  919.82  931.13 53342   52619  174955
https://en.wikipedia.org/w/load.p...lector&skin=vector&version=0iyf74z  res  752.23 191.67   script      0     0      0  752.23  752.23  752.23  752.23  752.23         0   753.75  933.07   943.9 50926   50217  190868
https://login.wikimedia.org/wiki/...e=script&wikiid=enwiki&proto=https  res  996.87 171.15   script      0     0      0  996.87       0       0       0       0         0        0       0 1168.02     0       0       0
https://en.wikipedia.org/w/load.p...istory&skin=vector&version=0odikha  res 1095.36 170.04   script      0     0      0 1095.36 1095.36 1095.36 1095.36 1095.36         0  1097.98 1264.92 1265.39   861     253     471
                 https://en.wikipedia.org/static/favicon/wikipedia.ico  res 1329.24 177.54               0     0      0 1329.24 1329.24 1329.24 1329.24 1329.24         0  1338.32 1506.25 1506.78  1638    1035    2734
                   https://localhost:8081/dist/client.js?1476619788286  res  9417.1   7.26   script      0     0      0  9417.1       0       0       0       0         0        0       0 9424.37     0       0       0
```

and the following after a revisit (note some of the `dur`ations are now zero,
implying the resource was retrieved from browser cache):

```
addScriptsUntilSuccessful.onload: https://localhost:8081/dist/client.js?1476619855246
resource count=28
                                                                  name type  stTime    dur initType workSt redSt redEnd fetchSt  dnsSt dnsEnd connSt connEnd secConnSt reqStart respSt respEnd txSz encBdSz decBdSz
https://en.wikipedia.org/w/load.p...tor.styles&only=styles&skin=vector  res  182.98   9.03     link      0     0      0  182.98 182.98 182.98 182.98  182.98         0   186.97 189.48     192    0   11568   51580
https://en.wikipedia.org/w/load.p...s=startup&only=scripts&skin=vector  res  183.14  11.86   script      0     0      0  183.14 183.14 183.14 183.14  183.14         0   187.28 191.67     195    0   25364   72214
https://en.wikipedia.org/w/load.p...ite.styles&only=styles&skin=vector  res  183.31 176.34     link      0     0      0  183.31 183.31 183.31 183.31  183.31         0   190.14 359.09  359.66  602    5391   20392
https://upload.wikimedia.org/wiki...jpg/100px-Bobby_Robson_Cropped.jpg  res  183.49  179.2      img      0     0      0  183.49 183.49 183.49 183.49  183.49         0   195.84 362.32  362.69  588    5639    5639
https://upload.wikimedia.org/wiki...Khairul_Fahmi%27s_Wedding_2013.jpg  res  183.65 344.61      img      0     0      0  183.65 183.65 183.65 183.65  183.65         0   361.89 527.96  528.25  608    5774    5774
https://upload.wikimedia.org/wiki...g_Bhumibol_Adulyadej_2010-9-29.jpg  res   183.8 344.93      img      0     0      0   183.8  183.8  183.8  183.8   183.8         0   361.98 528.38  528.72  671    4265    4265
https://upload.wikimedia.org/wiki...x-MargaretSanger-Underwood.LOC.jpg  res  185.81      0      img      0     0      0  185.81 185.81 185.81 185.81  185.81         0   185.81 185.81  185.81    0    3733    3733
https://upload.wikimedia.org/wiki...s_and_jar_-_Google_Art_Project.jpg  res  198.26      0      img      0     0      0  198.26 198.26 198.26 198.26  198.26         0   198.26 198.26  198.26    0   32384   32384
  https://upload.wikimedia.org/wikipedia/en/9/9d/Commons-logo-31px.png  res  198.55      0      img      0     0      0  198.55 198.55 198.55 198.55  198.55         0   198.55 198.55  198.55    0    1694    1694
https://upload.wikimedia.org/wiki...i-logo.png/35px-Mediawiki-logo.png  res  198.84      0      img      0     0      0  198.84 198.84 198.84 198.84  198.84         0   198.84 198.84  198.84    0    5718    5718
     https://upload.wikimedia.org/wikipedia/en/b/bc/Meta-logo-35px.png  res  199.12      0      img      0     0      0  199.12 199.12 199.12 199.12  199.12         0   199.12 199.12  199.12    0    1611    1611
https://upload.wikimedia.org/wikipedia/en/7/7f/Wikibooks-logo-35px.png  res  199.54      0      img      0     0      0  199.54 199.54 199.54 199.54  199.54         0   199.54 199.54  199.54    0    1722    1722
https://upload.wikimedia.org/wiki...ogo.svg/47px-Wikidata-logo.svg.png  res  200.02      0      img      0     0      0  200.02 200.02 200.02 200.02  200.02         0   200.02 200.02  200.02    0     436     436
 https://upload.wikimedia.org/wikipedia/en/6/60/Wikinews-logo-51px.png  res  200.49      0      img      0     0      0  200.49 200.49 200.49 200.49  200.49         0   200.49 200.49  200.49    0    2921    2921
https://upload.wikimedia.org/wikipedia/en/4/46/Wikiquote-logo-51px.png  res  200.96      0      img      0     0      0  200.96 200.96 200.96 200.96  200.96         0   200.96 200.96  200.96    0    1388    1388
https://upload.wikimedia.org/wiki...a/en/b/b6/Wikisource-logo-35px.png  res  201.44      0      img      0     0      0  201.44 201.44 201.44 201.44  201.44         0   201.44 201.44  201.44    0    2280    2280
https://upload.wikimedia.org/wiki.../en/b/bf/Wikispecies-logo-35px.png  res  201.91      0      img      0     0      0  201.91 201.91 201.91 201.91  201.91         0   201.91 201.91  201.91    0    3629    3629
https://upload.wikimedia.org/wiki.../en/e/e3/Wikiversity-logo-41px.png  res  202.38      0      img      0     0      0  202.38 202.38 202.38 202.38  202.38         0   202.38 202.38  202.38    0    1227    1227
https://upload.wikimedia.org/wiki...px-Wikivoyage-Logo-v3-icon.svg.png  res  202.86      0      img      0     0      0  202.86 202.86 202.86 202.86  202.86         0   202.86 202.86  202.86    0     814     814
https://upload.wikimedia.org/wiki...vg/35px-Wiktionary-logo-v2.svg.png  res  203.32      0      img      0     0      0  203.32 203.32 203.32 203.32  203.32         0   203.32 203.32  203.32    0    1542    1542
           https://en.wikipedia.org/static/images/wikimedia-button.png  res  203.72      0      img      0     0      0  203.72 203.72 203.72 203.72  203.72         0   203.72 203.72  203.72    0    2426    2426
  https://en.wikipedia.org/static/images/poweredby_mediawiki_88x31.png  res  204.05      0      img      0     0      0  204.05 204.05 204.05 204.05  204.05         0   204.05 204.05  204.05    0    1585    1585
https://en.wikipedia.org/w/load.p...cripts&skin=vector&version=0f3xo9s  res   236.1 129.09   script      0     0      0   236.1  236.1  236.1  236.1   236.1         0    360.4 362.04  365.19    0   50057  176338
       https://en.wikipedia.org/static/images/project-logos/enwiki.png  res   382.9      0      css      0     0      0   382.9  382.9  382.9  382.9   382.9         0    382.9  382.9   382.9    0   20616   20616
https://en.wikipedia.org/w/load.p...kibits&skin=vector&version=1hsthyo  res  524.87   1.45   script      0     0      0  524.87 524.87 524.87 524.87  524.87         0   525.37 525.81  526.32    0    5317   17433
https://en.wikipedia.org/w/load.p...faults&skin=vector&version=0c4iw0c  res  528.03   9.61   script      0     0      0  528.03 528.03 528.03 528.03  528.03         0   529.11 531.18  537.64    0   52619  174955
https://en.wikipedia.org/w/load.p...lector&skin=vector&version=0iyf74z  res  531.49   7.21   script      0     0      0  531.49 531.49 531.49 531.49  531.49         0   532.15 534.06   538.7    0   50217  190868
                   https://localhost:8081/dist/client.js?1476619855246  res 4380.15   4.61   script      0     0      0 4380.15      0      0      0       0         0        0      0 4384.76    0       0       0
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
