import './reset.css';
import './styles.css';

const notifyButton = document.querySelector('#notify') as HTMLButtonElement;

notifyButton.addEventListener('click', () => {
  // check for availability and permission

  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    // the user has previously granted permission to use Notifications
    createNotification();
  } else if (Notification.permission !== 'denied') {
    // we need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        // the user gave permission
        createNotification();
      }
    });
  }
});

const createNotification = () => {
  new Notification('Achievement Unlocked!', {
    body: "You've successfully displayed a Web Notification from the browser. Congratulations!",
    icon: './assets/tiger_small.png',
    image: './assets/sentinel.png', // visible on Windows, not on Mac
    // requireInteraction: true, // works on Windows, breaks Mac
  });
};
