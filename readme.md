1) how to use the app, if you are looking for an artist all you have to do is click what type of media you are looking for in the radios, you then click search. the media that you have chosen will come up below the search bar, you can then click your favorite songs etc which will then be sent to the bottom of the page in your own favorite section, you can also delete the media from this section 

2) to start the app you must open up the terminal and cd to the front end and the backend respectivly, from here all you have to is type in yarn start, this will start the server and the front end of the app fro you, to test you must type in yarn test and this will run the tests for you.

3) the app has helmet installed which helps the following:
By default, Helmet sets the following headers:

Content-Security-Policy: A powerful allow-list of what can happen on your page which mitigates many attacks
Cross-Origin-Opener-Policy: Helps process-isolate your page
Cross-Origin-Resource-Policy: Blocks others from loading your resources cross-origin
Origin-Agent-Cluster: Changes process isolation to be origin-based
Referrer-Policy: Controls the Referer header
Strict-Transport-Security: Tells browsers to prefer HTTPS
X-Content-Type-Options: Avoids MIME sniffing
X-DNS-Prefetch-Control: Controls DNS prefetching
X-Download-Options: Forces downloads to be saved (Internet Explorer only)
X-Frame-Options: Legacy header that mitigates clickjacking attacks
X-Permitted-Cross-Domain-Policies: Controls cross-domain behavior for Adobe products, like Acrobat
X-Powered-By: Info about the web server. Removed because it could be used in simple attacks
X-XSS-Protection: Legacy header that tries to mitigate XSS attacks, but makes things worse, so Helmet disables it