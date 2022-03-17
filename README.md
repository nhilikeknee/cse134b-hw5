# cse134b-hw5 
Nhi Nguyen      
A15971390   
[Porfolio Site](https://cse134b-hw5-d450a.web.app)    
[Method Test](https://cse134b-hw5-d450a.web.app/methodtest.html)    
[Blog](https://cse134b-hw5-d450a.web.app/crud.html)   


# discussion of good and bad points of approach      
In general, I authenticate every point of the way for each of the CRUD actions. This ensures that the user won't accidentally log out still be able to edit their post. I also have extra checks for the author to only edit their own post. While that is outside the scope of this project (to have multiple authors/contributors), it is good to check this just in case in the future we want to introduce this feature, being more strict now will make it easier later.      

Right now, I just set the visibility of the New Post button to hidden. While I do do authentication (so even if you reveal this button and try to submit a new post, it won't work), it is still somewhat unsafe to have HTML visible (even if the button itself isn't)