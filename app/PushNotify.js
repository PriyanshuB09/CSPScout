const PRIVATEVAPIDKEY = 'vIURdcWarJr0pOyrq8xUnGtfIP-ReOBHLZtFNeAB8Mg';

const requestNotificationPermission = async () => {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      alert('Push notifications not supported');
      return;
    }

    if ('Notification' in window && 'serviceWorker' in navigator) {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          console.log('Notification permission granted');
        } else {
          console.log('Notification permission denied');
        }
      } else {
        console.log('Push notifications not supported');
    }
  
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      const registration = await navigator.serviceWorker.ready;
  
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BBvdMvK9SDCsYZ2herIbLTxGb-Gq7-50r_JAufYy4lU148VVIk3-CC-1_KhDF42eJO_1fArjfCkZ8avOzTHyEAc'  // Replace with your VAPID key
      });
  
      console.log('Push Subscription:', JSON.stringify(subscription));
      alert('You are subscribed!');
    } else {
      alert('Notification permission denied.');
    }
  };

  const sendLocalNotification = async (header, body) => {
    if ('serviceWorker' in navigator) {
        console.log('i\'m alone and desperate...');
      const registration = await navigator.serviceWorker.ready;
  
      registration.showNotification(header, {
        body: body,
        icon: '/icon.png',  // Add your own icon
      });
    }
  };

export { requestNotificationPermission, sendLocalNotification };