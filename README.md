# project.me
Idea #1
The ocean has always been a mystery to me.
 What incredible creatures live in its depths? How does something so vast help balance our climate?

For my capstone project, I want to dive into the hidden wonders of the sea, uncovering fascinating facts, exploring unique species, and sharing the little-known details that make the ocean one of Earth’s greatest marvels.

I'm planning to use three main APIs:
OBIS to gather detailed information about marine life and species data,
Unsplash to source high-quality ocean animal images, and
LibreTranslate to offer multilingual support by translating content into different languages.
Together, these APIs will help bring ocean facts, visuals, and accessibility together in one immersive experience.\

Idea #2 and final project.

Capstone Interview Questions
1. Capstone Project Overview
 "Can you walk us through your capstone project? What problem were you aiming to solve, and how does your project address that problem?"

 My capstone project is a data visualization website that focuses on raising awareness about marine pollution and overfishing. These are global environmental issues, and my goal was to make real data more accessible and visually engaging for users.

To do this, I integrated public APIs like OBIS to show species sightings over time, and used Chart.js to display those changes in bar charts. I also included a slideshow of ocean-related images from Unsplash and pulled in Wikipedia facts to help educate users interactively. My site allows users to select a range of years and instantly see how marine life has changed, making data more understandable and impactful. It’s built with HTML, CSS, JavaScript, and Node.js using Express.

2. Code Functionality and Use
 "How does the code you wrote support the functionality of your project? Can you point out a specific section of your code that you are particularly proud of or that was challenging to implement?"

 One section I’m particularly proud of is the fetchOBISData(from, to) function. It uses dynamic input from the user to build a request to the server, retrieves the filtered species data, and displays it in a Chart.js bar graph. Making the chart update based on user input was challenging because I had to manage async data, clean up the previous chart, and ensure everything refreshed smoothly.

3. Future Plans and Reflection
 "Reflecting on your experience with Code:You, what’s one key skill or lesson you’ve learned that you’ll carry forward into future projects or your career?" 
 
 The biggest lesson I’m taking with me is how to break down big problems into small, manageable pieces, especially when things get overwhelming. Through this project, I’ve learned how to work with APIs, dynamically update the DOM, and use external libraries like Chart.js — but more importantly, I learned how to research, troubleshoot, and keep improving my code even when something didn’t work right away.


My project is base in overfishing and marine pollution i wanted to shine a light in the issue we have being facing for a while now and there being a lot of progress on it but its never to much if it help our planet. i wanted to have a sliceshow to display img since i'm a visual learning so i like pitcures.i integrated a litle information box just to give an explained of what exacty is overfishing and marine pollution. I also add a chart just to display the overfishing and marine pollution over the years to have a visual on how we have progess.   

I came acros this documentarie  <a href="https://www.youtube.com/watch?v=v5J7aP2FYH4&ab_channel=NationalGeographic" target="_blank">David Attenborough: Ocean</a>  looking for information about my original idea but after watching it it gave me this idea and i loved the messege and i felt like it need to be shared. 


Next i have a list of the youtube videos i watch to make the sliceshow and chart happend, i also had helped from my mentor to make sure everything is running with no error.
<!--https://www.youtube.com/watch?v=Pnlt1NiBt68&ab_channel=CodeBlessYou-->
<!--https://www.youtube.com/watch?v=2dsU-j8albM&t=54s&ab_channel=NsquaredCoding-->
<!-- https://www.youtube.com/watch?v=gQRNYIRZMmA&ab_channel=VincePolston -->
<!-- https://www.youtube.com/watch?v=FtZwJZB0xb8&t=336s&ab_channel=TheCodeAngle  -->

requarements i choose 
Analyze data in arrays, objects, sets, or maps and display info

Create a function with 2+ input parameters and return a value

Visualize data in a user-friendly way (e.g. using Chart.js)

Use external data and calculate a result based on it (e.g. current date, remaining days)

Persist data using internal API/local storage (reload-safe)

Implement modern UI (e.g. dropdowns, autocomplete, drag/drop)

Create a Node.js server with Express