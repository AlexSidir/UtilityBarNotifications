({
    onInit: function (component, event, helper) {
        component.set('v.subscription', null);
        component.set('v.notifications', []);

        const empApi = component.find('empApi');

        const errorHandler = function (message) {
            console.error('Received error ', JSON.stringify(message));
        };
        empApi.onError($A.getCallback(errorHandler));

        helper.subscribe(component, event, helper);
        helper.displayToast(component, 'success', 'Ready to receive notifications.');
        var utilityAPI = component.find("utilitybar");
        utilityAPI.getAllUtilityInfo().then(function (response) {
            var myUtilityInfo = response[1];
            var idd = myUtilityInfo.id;
            utilityAPI.onUtilityClick({
                utilityId: myUtilityInfo.id,
                eventHandler: function () {
                    var utilityAPI = component.find("utilitybar");
                    utilityAPI.getAllUtilityInfo().then(function (response) {
                        var myUtilityInfo = response[1];
                        utilityAPI.setUtilityHighlighted({
                            highlighted: false,
                            utilityId: myUtilityInfo.id
                        });
                    })
                }
            });
        })
    },

    onClear: function (component, event, helper) {
        component.set('v.notifications', []);
    },

    onToggleMute: function (component, event, helper) {
        const isMuted = !(component.get('v.isMuted'));
        component.set('v.isMuted', isMuted);
        if (isMuted) {
            helper.unsubscribe(component, event, helper);
        } else {
            helper.subscribe(component, event, helper);
        }
    },
})