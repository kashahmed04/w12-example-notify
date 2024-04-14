import './reset.css';
import './styles.css';

const notifyButton = document.querySelector('#notify') as HTMLButtonElement;

notifyButton.addEventListener('click', () => {
  // check for availability and permission

  // why do we have to make the notification a string is this part of the notification API
  // for any of the things on API (the web API it's build into the browser so we don't have to specify but libraries
  // and frameworks and third party API's we do have to specify we are using them)(get specified in package.JSON and gets pulled
  // into nodes folder when we do npm install and then the imports get the source code from the node modules folder for us
  // in out TS)
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
    //we could be in a browser that does not support the notification (an alert shows us as a system modal)
    //is createnotification build into the notification API does this just create the notification object
    //and display it (by default the notificiaton shows on the right bottom of screen but could we change where it 
    //shows up like the top right for example)
    //we have to do an operational system change for where notificaiton shows up 
  } else if (Notification.permission === 'granted') {
    // the user has previously granted permission to use Notifications
    createNotification();
    //not denied could also be default (we have not granted access but we have not denied either so we are in the default 
    //and requestpermission returns 
    //the promise then allows the user to choose to get notifications or not then we get granted then we show the notificaiton and 
    //if they deny then we are done and don't show the notification)
    //what does default, denied, and granted do again in terms of notifications 
    //default asks for permission to show a notificaiton or not
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        // the user gave permission
        createNotification();
      }
    });
  }
});

//this creates the notification object and we have to put
//the title is required for the first string and everything else is optional below the title for a notificaiton
//this creates the notificaion and displays it right whenever we create a new notification object (yes)
const createNotification = () => {
  //is this the title of the notificaiton (yes)
  new Notification('Achievement Unlocked!', {
    body: "You've successfully displayed a Web Notification from the browser. Congratulations!",
    icon: './assets/tiger_small.png',
    image: './assets/sentinel.png', // visible on Windows, not on Mac (does not break mac right just does not show the banner image)
    //does not show the notificaiton at all if it breaks in mac
    // requireInteraction: true, // works on Windows, breaks Mac (this breaks mac and does not display the notification at all right
    //so mac can't have the require interaction right)(yes)
  }); //there is no as unknown as any here but there is not red line or error (had to be used to build it to put it 
  //on banjo and we got a red line but if there is a redline then we cannot build it for npm build)
};

/**
 * NEW NOTES:
 * 
 * today we will talk about notifications and next week is web assembly and geolocation and next week will be an exam study guide 
 * (outline of things to know for the exam)
 * 
 * week 14 will be practical and written exam 
 * 
 * things from exam will be from midterm on and things from midterm that we messed up on (which questions from midterm)
 * focus on midterm and new content from midterm on (go over midterm exam and for margin and padding in general if we put
 * in 4 values, 3 values, or 2 values, which direciton it goes in to apply margin and padding)**
 * 
 * operatiaonl system means mac, windows, or linux and the user permission is going into settings for our browser
 * and OS level settings in our gear icon (I thought operaitonal system was the gear icon settings for our computer and the user
 * permission was on our browser)**
 * 
 * the OS level settings is going to our settings in our machine but the browser settings is navigating from the browser to our
 * browser settings
 * 
 * the display differences is for the mac and windows is the banner for windows and not for mac
 * and the property differences would be the closing button for the windows but not the mac
 * 
 * service worker is a technology that lets us load some JS into a background task and its useful for offline 
 * mode our sites and caching data on our sites and have our page do things when its not actively displayed on our
 * background (like sending notifications and push notifications when we are offline)(some aspects of notifications 
 * (like action bars, or renotifying, or any notifications on the android platform
 * only work when launched by a service worker)
 * 
 * the noticiaitons API displays an operation system level notificaion and there is variance from windows and mac
 * there are a lot of gotchas for notifications 
 * 
 * we need a service worker for notifications (its like a middleman server that runs in the background of our server and its useful for 
 * machine content and have an offline mode for noticatinos and doing notificaions and push notificaitons and they are tricky because
 * they run outside of the context of the webpage and we register them through our website and they run in the background and when using
 * this we should have a incognito window to clear them out and its a big mess)**    
 * 
 * our code should be run from a secure context https instead of http (if we make our link from banjo its already https for RIT)
 * vite plugin makes a local certificate and servers it so we can have this on our local host as well (has to be https though)
 * we need the vite plugin lets us be secure while laucnhing it locally otherwise vite launches out local browser
 * as being http instead of https
 * 
 * notifications icon and if there is a moon there then it means we have focus assist on so we also have to go an turn focus assisst
 * off so we can get notifications otherwise they won't show up at all (or can they still but we won't see them in real time
 * and they will just be in our list of notifications)(yes it shows up on the side panel if we are on focus mode)
 * 
 * for mac there is no banner but for windows there are for notificaition and the title shows in both systems as well for the body
 * and icons are different and windows emphasizes the icon and mac makes it smaller or the same size as the source (chrome) icon
 * require interaction to true puts the close button to press and close the notificaiton
 * otherwise the message will stay until we press close for windows (when we press close does 
 * the notificaiton show up in our notification hierarchy or does it get deleted from there as well for windows)**
 * what about the x button instead of close button for windows and mac do those still close the notification and
 * close it our of the notificaion hierarchy as well**
 * without require interaction or if we set it to false for windows if the notificaiton goes away automatically does it go to 
 * our notificaiton hierarchy or no (yes)
 * for mac does the message go away automatically if we don't press the x and go into our notificaiton hierarchy as well**
 * the url shows on both windows and mac (the browser url the notification came from)** (so what if we 
 * don't have something open and we get a notifiction how does it know the url)(it could have the program name instead) 
 * (slide 9)** and there is also the browser icon
 * for both systems to show where the source notification is from 
 * when we set the body to really long mac gives us option to expand and view the notification and we can't fuly see it expanded in
 * mac and its truncated for the message but for windows its the same thing but when we hover over 
 * the truncated text it shows the whole message with a hover whereas mac does not (yes)
 * 
 * we have a querysecltor that gets the button from the HTML and add an event listener to it and the whole point in this block of code
 * is to check if noticiation exists on the window object at all and if it does not we say that there is no 
 * support for notification API and there is default,
 * denied or granted and we can create the notificaiton immediately for default and for denied 
 * it returns a promise to allow or deny permission 
 * and if the permission comes back as granted then it says we can show the noitification** and create it otherwise do not show the permission and
 * don't show the user the notificaiton and it would not be seen by the user even though we try to create a notification object**
 * 
 * create notificaiton is a funciton to seperate the two peices from each other** (the first block of conditionals is checking if we
 * can send a notification and the function is to actually send the notificaiton based on the conditionals)**
 * all we need to do to show a notificiaon is to just
 * make a new notification object and we don't have to display it and by using the notifaiton
 * constructor it makes the notificaiton show up in the window automatically**
 * 
 * as unknown as any is put in there because TS complained about the image as well as when we tried to build to banjo because**
 * 
 * the body is the text, the icon is the tiger icon, and the image is for the banner in windows and TS leaves it out of TS 
 * definition of notificaitons because the banner does not show up in mac and when we build it as well the image gives an error so
 * we can't build it on banjo
 * 
 * we have a notify button and get a notificaiton and it runs a system level which means our whole computer itself
 * 
 * 
 * require interaction is true and it will require us to press close to close it otherwise it won't close and the notification will
 * remain on screen until we close it** and if we don't have require action or make it false 
 * then the notificaiton closes itself after a certian time**
 * (or we can press the x with no close button (for windows)** instead for windows and mac)**
 * 
 * for our vite config we use define config to use our plugin (what plugin)**
 * and say we are using a secure network otherwise notificaitons and notificaiton API 
 * would not work** (where)** (go over define config)**
 * 
 * the plugin does certificate creation and whatever else it needed to do to have secure browser to work (server
 * and plugin where the only things added to vite)
 * 
 */