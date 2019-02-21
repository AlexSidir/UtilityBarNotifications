({
    subscribe: function (component, event, helper) {
        const empApi = component.find('empApi');
        const channel = component.get('v.channel');
        const replayId = -2; //Subscription option for getting all saved events   
       
        const callback = function (message) {
            helper.onReceiveNotification(component, message);
        };
        // Subscribe to the channel and save the returned subscription object.
        empApi.subscribe(channel, replayId, $A.getCallback(callback)).then($A.getCallback(function (newSubscription) {
            component.set('v.subscription', newSubscription);
        }));
    },
   
    unsubscribe: function (component, event, helper) {
        const empApi = component.find('empApi');
        const channel = component.get('v.subscription').channel;
        empApi.unsubscribe(component.get('v.subscription'), $A.getCallback(callback));
    },

    onReceiveNotification: function (component, message) {
        // Extract notification from platform event
        const newNotification = {
            time: $A.localizationService.formatDateTime(
                message.data.payload.CreatedDate, 'HH:mm DD/MM/YYYY'),
                message: message.data.payload.Message__c
        };

        const notifications = component.get('v.notifications');
        notifications.push(newNotification);
        component.set('v.notifications', notifications);

        if (notifications.length != null || notifications.length != "") {
            var utilityAPI = component.find("utilitybar");
            utilityAPI.getAllUtilityInfo().then(function (response) {
                var myUtilityInfo = response[1];
                utilityAPI.setUtilityHighlighted({
                    highlighted: true,
                    utilityId: myUtilityInfo.id
                });
            })
        }
        
        // Display notification in a toast
        //this.displayToast(component, 'info', newNotification.message);
    },
   
    // Displays the given toast message.
    displayToast: function (component, type, message) {
        const toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            type: type,
            message: message
        });
        toastEvent.fire();
    }
})