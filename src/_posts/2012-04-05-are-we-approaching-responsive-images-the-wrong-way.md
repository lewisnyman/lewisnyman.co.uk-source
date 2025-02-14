---
layout: post
title: Are we Approaching Responsive Images the Wrong Way?
tags: responsive web design
created: 1333632783
---

<p>There's a lot of talk about responsive images right now. Some white knights in the web design community are rallying around this problem and fair play to them. It's a tough problem that needs solving. Responsive design is great in theory, but if we are forcing mobile users download ridiculous sized images and grinding their experience down to a halt who can blame some if they declare <a href="http://blog.cloudfour.com/css-media-query-for-mobile-is-fools-gold/">separate mobile sites</a> to be the best solution?</p>

<p>Our brightest hope for the future seems to be resting on the shoulders of the (currently fictional) <a href="http://www.w3.org/community/respimg/2012/03/07/14/">&lt;picture&gt; element.</a> Here's the html set-up:</p>

<pre><code>
   &lt;picture alt="A giant stone face at The Bayon temple in Angkor Thom, Cambodia"&gt;
        &lt;source src="small.jpg"&gt;
        &lt;source src="medium.jpg" media="(min-width: 400px)"&gt;
        &lt;source src="large.jpg" media="(min-width: 800px)"&gt;
    &lt;/picture&gt;
</code></pre>

<p>Simple enough right? Any browser width below 400 pixels will get served small.jpg. Any browser width between 400-800 pixels will get medium.jpg. Everything else will get large.jpg. A simple and front-end solution no doubt. There are some drawbacks with this method though.</p>

<h2>Rigid breakpoints</h2>

<p>Remember a technique we called <a href="http://csswizardry.com/2011/01/forget-responsive-web-design/">Adaptive Layouts?</a> Instead of using fluid, percentage based layouts it serves several fixed width layouts in pixels using media queries. Browser widths that fall <em>in between</em> each breakpoint would get an unoptimised layout, with space either side of the design.</p>

<p>Doesn't this feel lot like our proposed solution for the &lt;picture&gt; element? Any browser width that falls in between each specified breakpoint would still load unused and wasted pixels. What if my device width was 401 pixels? Using the example code above it would load the full 800 pixel image. Let's not forget that is <em>per image</em> so it could be adding up to a lot of wasted bandwidth.</p>

<p>Adaptive Layouts eventually receded, with the philosophy of Responsive Design advocating a design with layouts accessible to all kinds of devices, not just optimised for the devices you choose at the time of building.</p>

<p>Rigid pre-defined breakpoints based on current devices... how much does this solution feel like that Adaptive Layouts again?</p>

<h2>It does not scale</h2>

<p>Let's imagine, in the future, that we might need to adapt to other factors in our images. Factors like colour. No point wasting bandwidth on rgb colour values right? How about factors like network speed? Even if the device has a large screen, is there any point loading a massive image on a slow connection? Maybe we want to load an aggressively compressed JPEG?</p>

<p>Let's imagine the same code with just these two factors thrown in:</p>

<pre><code>
   &lt;picture alt="A giant stone face at The Bayon temple in Angkor Thom, Cambodia"&gt;
        &lt;source src="small_bw.jpg"&gt;
        &lt;source src="small_color.jpg" media="(color)"&gt;
        &lt;source src="medium_bw.jpg" media="(min-width: 400px)"&gt;
        &lt;source src="medium_bw_slow.jpg" media="(min-width: 400px and network: &lt;= 3g)"&gt;
        &lt;source src="medium.jpg" media="(min-width: 400px and color)"&gt;
        &lt;source src="medium_slow.jpg" media="(min-width: 400px and color and network: &lt;= 3g)"&gt;
        &lt;source src="large_bw.jpg" media="(min-width: 800px)"&gt;
        &lt;source src="large_bw_slow.jpg" media="(min-width: 800px and network: &lt;= 3g)"&gt;
        &lt;source src="large.jpg" media="(min-width: 800px and color)"&gt;
        &lt;source src="large_slow.jpg" media="(min-width: 800px and color and network: &lt;= 3g)"&gt;
    &lt;/picture&gt;
</code></pre>

<p>A futuristic example but not an unrealistic one. These factors already exist and affect people browsing the web. Imagine if we added yet another factor into the mix, like very real and very scary ppi variations? We just doubled our mark-up again, each factor combination is also going to need a hi-res copy.</p>

<h2>To hell and back</h2>

<p>All I've done is point out two major problems with the current, proposed concept. I want this conversation to continue, not die. Here's my proposal:</p>

<p>You know what's really good at handling complex logic and serving different types of content? Server side code. Programming code is very adept at handling complex logic with many variables. There are some very mature and robust image generators written in server side code that do all kinds of magic like dynamically resize, reformat, and modify. It's no surprise that the most <a href="http://www.sencha.com/learn/how-to-use-src-sencha-io/">robust solution so far</a> takes advantage of dynamic image generation on the server.</p>

<p>An algorithm could dynamically resize to the exact size required by the device visiting the site without any extra work from developers or clients. Just upload the largest size you have and let the server scale it down. We could also conditionally convert the image to greyscale and increase compression if we need to. Again with no extra work from us. It scales like a dream.</p>

<h2>What's the catch?</h2>

<p>Of course there's a problem with all this! The problem with moving all this logic into the is context. The server needs  to know the variables involved to make these decisions. Variables like color support, screen size, network speed, and pixel density are available on the front-end through Javascript APIs.</p>

<p>If we want this information to be available to  the server I see three options:</p>

<ol>
  <li>Write a cookie in Javascript to pass to the server. There are already <a href="http://tripleodeon.com/2010/10/modernizr-on-the-server-side/">libraries that do this.</a></li>
  <li>Use a user agent library like <a href="http://wurfl.sourceforge.net/">WURFL</a> to map the UA string to device capabilities.</li>
  <li>Pressure browser vendors to add more contextual information in a <a href="http://djce.org.uk/dumprequest">http request.</a></li>
</ol>

<p>With this article I'm trying to do the third. Client requests already contain information servers use to serve different content. Let's just add a bit more. <q>I'd like this content please. Oh and by the way here's some useful information to help you find the right format for me.</q></p>

<p>Is the server the holy grail? <a href="https://twitter.com/lewisnyman">Let me know what you think.</a></p>
