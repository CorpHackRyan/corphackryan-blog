<!DOCTYPE html>
<html lang="en">


<head>
    <meta name="viewport" content="width=device-width, initial-scale=0,maximum-scale=1">
    <meta charset="UTF-8">
    <title>Welcome to Ryan's Blog</title>
    <link rel="stylesheet" type="text/css" href="./css/blog.css">
    <link rel="icon" type="image/x-icon" href="./coding.ico">
    <meta property="og:title" content="Ryan O'Connors Blog" />
    <meta property="og:description" content="Read about my projects, ideas, and whatever I am exploring." />
    <meta property="og:image" content="http://www.ryaninthecloud.com/cpu.jpg" />
    <script src="./js/main.js"></script>
</head>


<body>

<h2>Welcome to Ryan's Blog!<br><br>
    Here, I document random projects and thoughts. Enjoy!<br><br>
    If you have anything you wish to say, feel free to <a href="mailto:ryanoconnor.dev@gmail.com">email me.</a> <br>
</h2>

<h2 class="update">(last update: 6/3/22 @ 09:08:16)</h2><br>

<?php
         $dbhost = 'localhost';
         $dbuser = 'blog';
         $dbpass = 'Blog1234!';
         $dbname = 'blogentrys';

         //Create connection
         $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

        //Check connection
         if(! $conn ) {
            die('Could not connect: ' . mysqli_error());

         }
         echo  '<center>Connected successfully to mySQL server via PHP ' . PHP_VERSION .  ' at ' . date("h:i:sa") . ' on ' . date("l m/d/Y") . '</center>';

         $query = mysqli_query($conn, "SELECT * FROM actionitems");

         echo '<div class="action-items">';
         echo '<h3>Actionable items to work on</h3>';
         echo '<ul>';

         while ($row = mysqli_fetch_array($query)) {
             echo "<li>" . $row['description'] . "</li>";
         }

         echo '</ul>';
         echo '</div>';

         mysqli_close($conn);
?>

<div class="blog-entry" id="legacy-entry-11">
<h3>Friday June 3rd, 2022 - 09:13:31 (E.S.T.) - 11th Blog entry</h3>
<h2>React, Linux and some other stuff</h2>
<p>Whoa it's been almost 2 months since I posted an entry in here. I've been fairly active according to my <a href="https://github.com/corphackryan">GitHUb</a>. So, let's see, since my
last push here on this site I've worked on a tutorial for building a tic-tac-toe game in React, a take home assessment for Oracle building a GUI app in Java Swing, some PHP coding around
JSON files, experimenting with Jupyter notebook and learning about all the wonderful features of NumPy.<br><br>Guess I'll start with React. I'm following a few different tutorials that
I've found online. It seems like everywhere I look when applying to jobs has some sort of React involved in it. So I figured why not, let's get some exposure to it. I do have a goal in mind
to eventually change this page over into React. It probably doesn't make much sense to do that but for learning purposes, that's why I'd be doing it. I have probably only spent about 4 hours
total from getting the stuff required to get it running installed to having a working app. Setup and configuration seemed ok. I ran into some issues installing node.js on my system but a
few quick google searches I was able to overcome all of the minor issues. Being on linux certainly is a little more challenging when installing software compared to Windows. You don't just
double click an .exe file, choose a path and voila! Successful install of said application. No, it's definitely a little more complicated than that. I find myself struggling with path stuff in
linux. I'm about 15 months into using Linux full time as my primary OS, and while I'd never go back to Windows, I still find myself having to researching how to do things quite a bit. That was
the whole point actually in making the switch - to force myself to learn how to navigate linux - and I'm still way behind the curve. But,
</div>


<div class="blog-entry" id="legacy-entry-10">
    <h3>Friday April 8th, 2022 - 08:22:18 (E.S.T.) - 10th Blog Entry</h3>
    <h2>SQL, Python and regex</h2>
    <p>I am becoming  very comfortable with moving between programming languages now. I was programming a lot of HTML/CSS for a while, then moved back into Python. I'm becoming
    somewhat competent now in setting up the different environments for each language. It's pretty exciting actually. I was doing a lot of SQL work last week.  I actually had
    mySQL workbench installed a couple months ago as recommended by a mentor, but hadn't actually used it extensively until recently. After having gone through a week long mySQL fundamentals class now,
    I'm happy to report how awesome this app actually is. I love how it lets me execute SQL queries and displays graphically what I'm executing. Normally, I'd have to either print
    out the results or manually run SELECT statements within the mariaDB shell. <br><br>
    Anyhow, I just finished up a Python side project for a company. I can't really talk about what it's about
    in details, but  I can talk about some of the different methods I've been using. First one is OS.walk(). This function let's you traverse through unlimited (well, I believe it's unlimited)
    amounts of directories, within sub directories until it gets to the  lowest directory. Once I get to the lowest  directory, I'm seeking out any file that's a Ruby (*.rb) file. Once found,
    I'm adding to a list to return to my main function. I then pass that list off to another function which will process all of the Ruby files it found in the system. Here, I bring in
    the regular expression library, and seek through each file scraping for any data that's contained between quotation marks or apostrophes (' or  ""). I just run a for loop to iterate through
    the file list, then another for loop to read each file, then read in each line and apply: re.findall(r"['\"](.*?)['\"]", index). I just run a if statement on whether what's returned is
    'None' or a  match is found. If match is found, then we add append this data to a newly created list which contains all matches found.<br><br>
    Once I have a traversed through all folders and files,  and scraped each file line by line for specific data, I then do a set() difference between two lists. The first list I'm using
    is the one I built from all the Ruby files, and the other list I'm using is a list built from a CSV file which contains particular data of interest. Long story short, I do a set difference
    between the two, and whatever is missing from the Ruby files that doesn't exist in the list built from the CSV file, I then return back that final set of data. This is the data that will
    be used for reporting which security measures are missing from the system. This was a really fun project! It was estimated to take around 8 hours total and I ended up taking around 16.75 hours
    to complete it. <br><br>
    I have two other projects that I'm working on right now as well. One isn't that interesting so I won't bother going into it. But the other is a take home technical assessment which I'm having
    to build in Java. The scope is to use the <a href="https://openaq.org/#/">OpenAQ</a> API to send requests and retrieve the results. Once the results have been retrieved, store them in some
    sort of data structure that can be used to pass off to a front-end developer who will then be able to write to code to process that data to generate a heat map. I've actually got the API
    requests working, and receiving the data back and storing them in <a href="https://www.infoworld.com/article/3222851/what-is-json-a-better-format-for-data-exchange.html">JSON</a> format. Let me tell you,
    parsing JSON data in Java is a huge technical pain compared to Python. It's night and day. I'd say what takes 4-6 lines in Java to parse JSON can be done done in 1-2 lines in Python. And it's much cleaner
    looking in Python in my opinion. Maybe I'm just Python biased, but I really think for this type of solution, Python is the clear winner.
    </p>
    </div>

<div class="blog-entry" id="legacy-entry-9">
    <h3>Monday - March 14th, 2022 - 17:03:33 (E.S.T.) - 9th Blog Entry</h3>
    <p>Wow time flies. It's been a few weeks since I have been able to make an update here. First, I'll just say where I've been spending most of my time. Mostly I've been working
    in Python experimenting with different libraries and analyzing data. I have also been applying extensively to software developer positions. I took some  time, actually I paid for
    a resume creation service called BeamJobs and they are 100% worth it. I've already had a few interviews in the last 2 weeks from this resume alone. Granted, I had to revamp my
    entire resume and remove the last 8 years of jobs since they didn't have anything to do with software development. So I had to get creative. Anyway, the service is super easy to
    use and creates a professional looking resume in minutes. If you want to see what it looks like, you can check mine out <a href=./assets/RyanOConnor_resume.pdf>here.</a> I can't
    promise this will be updated in the future as I'll probably forget this hyper link exists as time goes on.<br><br>
    So two of the companies I interviewed for gave me take home assignments. One assignment is a very complicated assignment which doesn't have a deadline. It's for a pretty high profile
    firm who works for the government and handles ciphers, encryption and steganography. I had put it on the back burner temporarily waiting to get some free time. However, a second
    company I spoke with gave me a simpler task which took roughly ~9 hours over 8 days. I chipped away at it little by little. The goal of the task was to take some given datasets, whether
    they be in <a href="https://www.howtogeek.com/348960/what-is-a-csv-file-and-how-do-i-open-it/">CSV</a> or <a href="https://www.canto.com/blog/xlsx-document-file/">XLSX</a>
    format, and convert them to <a href="https://www.redhat.com/en/topics/automation/what-is-yaml">YAML</a> format. I've done this sort of stuff before. In fact, it was taking CSV files and
    converting them into <a href="https://opensource.com/article/21/7/what-xml">XML</a> documents. You can see my source code <a href="https://github.com/CorpHackRyan/PoppuluTask/blob/master/main.py">here</a> on how I did that.
    Actually, this particular task had a really cool feature in it - I had to embed a base64 encoded file into the actual XML document itself. Anyway, back to the other task regarding
    converting CSV/XLSX to YAML.<br><br>
    I ended up going way over scope on this task. Mainly because I like to seek out as many edge cases as possible and then learn how to make sure they are
    covered. A few different cases I came up with was ensuring the passed in 2 arguments from the command line. If it was less than 2, then program execution would halt. If a user
    did pass 2 arguments, then I would check both paths to ensure they existed in the system. If they didn't, execution would halt. I used the csv reader library that's native to Python
    to parse the CSV files. It's a little more difficult than using pandas which is why I chose to do it. I was trying to keep the script light weight. However, to parse the XLSX input
    required an additional library that's not native to Python, called <a href="https://openpyxl.readthedocs.io/en/stable/">openpyxl</a>. I've used this before so I had some familiarity with
    it. Again, I could have used pandas and probably simplified the entire process but I like to make my own life difficult for learning sake. <br><br>
    I have taken a breather from doing any more web development, just mainly because my free time is limited. I think though, between doing this cipher/steganography assignment and potentially
    making this site a little prettier, I should be able to commit some more time relatively soon. I did get the mariaDB database finally working. That was fun trying to diagnose why I couldn't
    connect to my mariaDB server via PHP. Come to find out, I needed to actually renamed this website's extension to .php from .html. I guess there's a way to get the .html to have PHP code
    executed inside it but it wasn't worth trying to figure that out since literally changing the extension allowed the connection to my server to work.
</div>


<div class="blog-entry" id="legacy-entry-8">
    <h3>Thursday - February 24, 2022 - 08:46:02 (E.S.T.) - 8th Blog Entry</h3>
    <p>A quick note on web development. Learned how to get that cool link preview when you send a link to a friend or post a link to facebook. There's a thing called
        Open Graph meta tags, which you use to specify the requirements for your tag. For instance, your title, description and image are the typical use scenario. They
        look like this:<br><br>
        &lt;meta property="og:title" content="Ryan O'Connors Blog" />
        <br>
        &lt;meta property="og:description" content="Read about my projects, ideas, and whatever I am exploring." />
        <br>
        &lt;meta property="og:image" content="http://(website_here)" />
        <br><br>
        You plug these right into the &lt;head/> section of your website, and it will populate whenever you send or post a link to your buddy. Pretty cool! You can read more
        about Open Graph Meta Tags <a href="https://ahrefs.com/blog/open-graph-meta-tags/">here</a>. Upon testing out my open graph link on Facebook, I found
        <a href="https://developers.facebook.com/tools/debug/">this</a> cool site for developers. It will scrape your website, and also give you a preview of your open graph
        to verify it works.</p></div>


<div class="blog-entry" id="legacy-entry-7">
    <h3>Wednesday - February 23, 2022 - 18:06:02 (E.S.T.) - 7th Blog Entry</h3>
    <p>
    My latest things that I've been doing have been working on labs through the Cloud Academy for my architect solutions certification. It was kind of funny because
        one of the latest labs I was working in was using AWS's DynamoDB to setup a database server through their console, and then accessing via the instance terminal
        and executing SQL commands once connected to the DB server. I ended up setting all this up last week for my own personal website for a weight loss competition that
        I'm currently running, but I've yet to get the database to work with my website via PHP. I'm getting some strange errors that I haven't had much time to debug lately,
        but I see myself ramping back up into that as I made some more updates to that website earlier today. You can find that live server running <a href="http://www.nonemoreplump.com">here</a>
        if you're interested in taking a peek. <br><br>
        Some things that I'm trying to understand is why everytime I make an update to my .html or .php files, do I have to continually hit hard refresh in order for it to actually
        reload properly on my mobile. For instance, if I make some edits to my website, it will not properly reflect on my mobile device unless I hard refresh on my desktop pc. Very
        strange indeed. I'm sure there's a reason for it. I'm also working on responsive design for mobile on my site as well. In fact, the desktop version of my website looks like crap
        compared to the mobile version. I just haven't committed enough time yet to tweaking both of them. I do have some wonderful ideas, but I'll continue to just chip away at it slowy
        along with all the other things going on in my life. <br><br>
        So right now, I guess my next steps would be to add all of the data that I've been manually been storing in tables on my html site into an actual database, and then
        start figuring out how to bring that data into my website via PHP. It sounds a lot easier on paper than it is or else I would have it done already. LOL. <br><br>
        In other news, my buddy sent me a screen shot last night of him booting up an old PC that's been sitting for 20 years. It had Windows XP on it. It took about 25 minutes for the system
        to boot, and then he got this <a href="./bsod.jpg">error</a>. Needless to say, he didn't mess around to long. He ended up switching over to a laptop from the same time frame
        and booting up that. He was trying to burn some Dreamcast games. Yeah we go back that far! I never actually heard back if he got it to work or not out. <br><br>
        Because of that, somehow it reminded me of middle school when we used to play Glider on the old macs the school provided. I think this is around 1995-96 time frame? So,
        I was motivated to see if I could get a copy up and running on my local machine. Since I had to reinstall Linux about a month ago, I didn't have a use for virtual box up
        until this time, so I did a: sudo apt install virtualbox and fired it up. I found <a href="https://www.scuzzstuff.org/glider/">this</a> link to download a copy of Glider. They
        say there's a Linux version available; but there isn't. Hence why I had to reinstall virtual box and snag a virtual disk image (.vdi) of Windows. I started with Windows 98 since
        this file I downloaded looked super old. I was able to boot up into Windows98 but there was all sorts of errors relating to dll files. I found out some people online had very
        similar issues and I found some fixes, but it still wasn't perfect. Rather than try and waste my time to figure out how to fix all this, I moved up to WindowsXP. Boy, this brought
        back so many memories! I actually really enjoyed WindowsXP. Probably my favorite operating system historically out of all the Windows versions. Anyway, this one fired up
        seamlessly, and I was able to install guest additions into virtualbox which was also installed within WindowsXP so I could accesss my local hard drive to install the files
        that I had downloaded for Glider. <br><br>Long story short, it installed rather quickly, and I was able to execute the game. You can find a video of it running
        <a href="./windowsxp.mp4">here</a>.
 </p>
</div>


<div class="blog-entry" id="legacy-entry-6">
    <h3>Wednesday - February 09, 2022 - 19:14:02 (E.S.T.) - Sixth Blog Entry</h3>
<p>So in sticking with my goal of pushing daily to GitHub, I decided to push my locally hosted website as a start. I skipped using the
GitHub command line tool for the sake of time. I'm used to enabling the version control (VCS) within my IDE and then committing/pushing from
there. Never had an issue with it in the past. But for some reason, this time I did. The error that I got when attempting to push was: <br><br>
    error: RPC failed; curl 55 Failed sending data to the peer<br>
    send-pack: unexpected disconnect while reading sideband packet<br><br>
    So upon further inspection, I copied this error, did a quick google and the first suggestion was to switch the git config to http version 1.1,
    push, then revert to version 2. So, the command was: <br><br>
    git config --global http.version HTTP/1.1 <br>
    (push initial commit)<br>
    git config --global http.version HTTP/2 <br><br>
    But that didn't work. I still got the same error. So onto the next search. Another solution was to increase the buffer size due to the nature
    of the error, which I'm not really sure about at this point still. Maybe it's timing out, and we need to increase the timeout? But that's not what
    this command is doing. We're increasing the buffer size, so apparently something to do with size. At this point I'm thinking the packets might be to
    big that Webstorm is trying to send with git, so maybe that's why we are increasing the buffer. I don't know. Anyway, we execute the following command: <br><br>
    git config http.postBuffer 524288000<br><br>
    And what do we get? Well, we get a little further. Also, it took roughly around 60-70 seconds for this to finish, which seemed like an awful
    long time to commit just a bunch of text files. I am on a 1GBit connection, and I consistently get 40-45kb/s upstream. Anywhow,
    the error that I get is that the file 'ryans_drumming.mp4' is too large. Message I got from git cli was: <br><br>
    remote: error: File fatloss/ryan_drums.mp4 is 506.09 MB; this exceeds GitHub's file size limit of 100.00 MB<br><br>
    Ha! I forgot I stuck a video of myself drumming in there to share with a friend. The file size was >500MB. No wonder I was getting wacky errors.
    I also learned that GitHub only supports files up to 100MB so that's interesting. Good thing to know. Anyway, after some serious issues
    trying to remove the file from the directory via the command line (I ended up specifying the new location as ~/home/krete77 instead of
    just using /home without the ~, it took me about 6-7 tries to figure that out. Now that I've removed the file, I'm still sitting here waiting
    for my push to go through. It seems to take a long time no matter what. Now, we get yet another error: <br><br>
    'Push rejected Push master to origin/master was rejected by the remote'<br>
    'refs/heads/master:refs/heads/master	[remote rejected] (pre-receive hook declined)'<br><br>
    So, after more reading, I find an issue that says that I'm trying to do a non-fast-forward push and the hooks are
    blocking it. Code suggestion to run was 'git pull --rebase' to rebase my local changes on the newest codebase.
    So, we try this and again, it failed. I've been working through this now for over 2 hours and have NEVER had this kind
    of issue when trying to push to GitHUb, so I'm going to retire and leave it for tomorrow.
</p>
</div>

<div class="blog-entry" id="legacy-entry-5">
    <h3>Tuesday - February 08, 2022 - 20:13:02 (E.S.T.) - Fifth Blog Entry</h3>
    <p>It has been a good while since I've updated this blog. Kind of not happy about it but I have made a lot of progress since I last
    made an update. Lately, I've been working on learning MariaDB (mySQL) and the entry level stuff that goes along with it. I messed around
    in the shell and learned how to create & delete logins, assign passwords, the use of privileges, create/delete tables, various sql execution statements such as
    select, and also how to join tables with a query. I also installed mySQL Workbench, and even though it's a bit buggy, it has given me some deeper understanding
    of database administration on the front end. I'm pleased with my progress. <br><br> I've also been scouring craigslist for computer gigs for my mentor and myself, and I'm
    getting close to thinking about tackling a project. It's not that I'm afraid to do it, I just dont need anymore added pressure at this time, so being under the
    gun for an additional project at this time in my life isn't to smart. The flip side of that is, I'm learning new technologies and growing as a developer, and I think
    to really improve on what I'm learning, I need to step it up and see a project through to completion. I do have 3 ongoing personal projects right now which I'm more
    than ever motivated to do, even if I'm making slow progress. Progress is progress.
    <br><br>
    I also learned there's a Github command line tool today, which I hadn't know about previously. But of course there is. There's a cli tool for everything the deeper I go.
    I'm very pleased with that actually. I haven't had any luck getting it to work but I also didn't put much effort into it.
    <br><br>
    Other things I've been working through is AWS Cloud Practitioner course. I have the certification exam coming up next week. I've passed some of the trial exams, so we'll
        see how I do there. I'm loving Cloud Academy right now. I'm very comfortable moving around the AWS console - creating EC2 instances, implementing DynamoDB, Billing,
        Cloudwatch, Lamdba, API Gateway, S3. It's a hell of a beast and I've only scratched the surface. I'm currently taking the Architect solutions class right now,
        and will be going into SySOPS after that. I think I finish out the year with Developer (sometime in September). <br><br>It's exhausting to say the least but once I'm done
        I think I'll be a well rounded individual with tech. I'm still trying to find my passion though where I can work every day in the tech world and be stimulated and
        not bored, and also enjoy what I'm doing every day. Time will reveal that to me soon enough. I have no doubts whatsoever.


    </p>


</div>



<div class="blog-entry" id="legacy-entry-4">
    <h3>Sunday - Jan 02, 2022 - 22:55:02 (E.S.T.) - Fourth Blog Entry</h3>
    <p>Continuing on here from the previous post as I had to step aside for a moment:

        Need to set permissions in my home directory to -la for 600 and 700. I will probably need to revisit with my
        mentor again.
        Now that we've got documentRoot set for apache, it's time to make routine use of Git from the CLI. Webstorm provides
        the terminal from directly within the IDE for quick access, so I should become a Git master in no time. <br><br>Like I mentioned before,
        I' will be foregoing the use of the integrated git system to really understand the inner workings of git.
        I think the term 'cookies' was a blanket term that I threw out to my mentor. I was thinking I would use it for my
        online ordering system for storing data. But I think this is wrong. In fact, I know it is. I will revisit this once I start
        building the cart to hold the items being added.
        My mentor has mentioned that I should consider using section over div. I'm brand new to div, and it makes sense to me. I do
        think there is a part on my ordering page that has 'section' in it. I can't recall why I used that. <br><br>But I also am learning, so
        knowing HTML5 over older versions of html, is basically brand new to me. But point noted.
        Other important points to take note of: -moz, -webkit and -ms properties, use of 'empsp' as a tab versus css styling,  console errors
        coming from my app page (this is actually due to the cart features popup page that I added, which I got sick around this time so wasn't
     able to fix).</p>
</div>

<div class="blog-entry" id="legacy-entry-3">
    <h3>Sunday - Jan 02, 2022 - 22:40:30 (E.S.T.) - Third Blog Entry</h3>
    <p>After coming down with Covid-19, I have been extremely sick the past 5 days making zero progress here on this blog
    and the website. I haven't been able to fully sit down on my computer for more than 5 minutes at times without getting aggravated
    or angry for no apparent reason. Did I mention I don't do well when I get sick? Anyway, I'm probably about 70% recovered at this
    point, and I'm really anxious to get back to work and continue my momentum on building and learning.<br><br>
    I've gone through Kwynn's <a href="https://kwynn.com/t/7/11/blog.html">Blog</a> as he's been mentoring me quite a bit on
    stuff that I've been asking him and this is sort of a list in no particular order of things that I need to either play catch
    up on, or at least complete.<br><br>
    <ul>
        <li>Examine the access log for Apache and analyze the hits from certain IPs. For example, if I know a particular IP is hitting me,
        I want to store that on server side and keep a counter of how many times that individual has visited my site.</li>
        <li>Understand what kwutils and kwas() is. I've got a local copy but no idea what to do. This is for future reference for myself. </li>
        <li>Coding without a debugger is NOT GOOD. I get it. I was going to write that I wasn't using console.log() as a debug tool, but now
        that I think back on it, I actually have been. Not sure how to get around this as I like to see what variables values are right away,
        and it seems the log does that fast and efficiently. But I must trust what my mentor says in that a debugger is the way to go. More
        learning to follow for sure.</li>
        <li>Regarding corporations & legal protection: I've dabbled in my own business stuff for a while. I've done my own landscaping stuff.
        I always compare it to that. If I work under myself, and do landscape work for someone, and I accidentally damage there property, I am
        held accountable. I've been under the assumption that if I ever created a company under a LLC or CORP, then I couldn't be sued for
        personal property. Just whatever assets are in the company. I like to think it's the same with a software product that I would sell
        to individuals. Regardless, I do have a few good reliable sources for small businesses. I have had them on my contact list for a couple of years
        now and basically won't be reaching out to them until the time is right. But they will be able to answer any and all questions related to
        legalities. Bottom line, I just want myself (as in, my actual assets protected) so that someone can't just take everything away because
        a bug caused their company to shut down for X amount of hours/days/weeks etc. Maybe I am paranoid, but I'd prefer to err on the side of caution.</li>

    </ul></p>
</div>

<div class="blog-entry" id="legacy-entry-2">
    <h3>Tuesday - Dec 28th, 2021 - 23:10:04 (E.S.T.) - Second Blog Entry</h3>
    <p>
    Well, that was cool. I need more data for a second blog entry to see how the styling effects each individual
    div class with respect to each other. Meaning, I need to test the margins and paddings to make sure it looks good enough
    for me to like it. I discovered a cool trick on transitioning colors linearly when the blog item is hovered over. Obviously,
    this serves no purpose here but as is with everything I'm doing with this site currently is  helping me learn more and more.
    Also, who doesn't think animation is cool??<br><br>
    Also, now that I've got a second entry in here, I can now see what they look like paired up against each other. I may adjust
    the margins a little later but for now it's just fine. Now, I can work on prettying up the blog for experimentation fun :)
    Since it's 45 minutes in, I still got 15 mins left. So I'll use that to add a picture and add some CSS styling to it.
    One thing I did notice about this text blog though - it seems that the same effect that is used on the flex-box grid seems
    to apply here to the text automatically. I don't have any display: wrap settings set in my CSS but when you resize the browser,
    the text automatically wraps and adjusts accordingly. That's pretty nifty. That makes me wonder if it does it on mobile.
        <br><br>Which leads me to the next thing that's on my mind: webdev for mobile. I'm not to concerned with it at this point as I'm
    still in the building phase and learning of web development. However, I may end up practicing with this blog when I get tired
    of banging my head trying to solve problems and use it to continue learning.
    A few other ideas I have are: adding likes, comment section. Who knows where it will take me.
   One final note, I was unable to center the image I had here within a div container. I did find a hack way to do it,
    but I was not satisfied with it. So I removed it. Not a big deal but something to revisit later. That'll do for now as my time is
    up and I am exhausted!</p>

</div>


<div class="blog-entry" id="legacy-entry-1">
    <h3>Tuesday - Dec 28th - 22:00:35 (E.S.T.) - First Blog Entry</h3>

    <p>This has been quite a fun little journey to get to this point in web development. I'm applying all the skills I have
        learned along the way over the many, many years in the past with some guidance from a good mentor who's cheering me along.
        There's nothing else I'd rather be doing right now than learning how to become a strong developer. I never for once thought
        I'd be a web developer, but it seems to be my cup of tea. Don't get me wrong, I love all sorts of programming. But with the
        way the world is today, everyone is on the cloud and needs everything at their fingertips instantaneously. Because of that,
        I've decided to capitalize on that movement and hopefully at some point down the road it will become my full time job.
    <br><br>I've decided to build this blog for many reasons. One being a place to just jot down my thoughts. I don't actually expect
        anyone to read this. But I love to journal, and I really believe that expressing your thoughts whether with classic pen/paper,
        or on computer, eventually will have a profound effect on my psyche in many positive ways. I feel it allows other parts of my brain
        to open up and allow more creativity and understanding to flow through.
    <br><br>The other main reason for this is to just practice my html skills in building a blog site. I have I think enough experience now
        to code this thing from scratch, including the CSS styling, which is what I really am going for. I told my mentor that I would
        be able to build this in under an hour. I think I'm about 20 minutes in right now. So I've got the data here. I've also created
        a /div id for each blog entry. I'm using the /p tag to separate these paragraphs. I will now hunt down some generic image for the top,
        apply some cool background effects and apply styling to the p tags & div tags to my liking. Let's see how it goes. In addition,
        I just learned how to insert TABs into the paragraph using the & emsp; command.
    <br><br>One last entry here - I am close to where I wanted to get it. However, I ran into some weird bug where my changes were not
        being reflected in the browser from my CSS styling. I ended up creating a new div, and individually copying each paragraph
        as I went along and checked each one to ensure the styling were being applied. There is literally NO difference between what I have
        coded now and what I had coded previously. However, it is working now. Not sure what the issue was. </p>
</div>









</body>





</html>
