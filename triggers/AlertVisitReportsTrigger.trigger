trigger AlertVisitReportsTrigger on Visit_Report__c (after insert, after update) {
    
    Set<Id> visitRepostIds = new Set<Id>();
    for (Visit_Report__c vr : Trigger.new){
            visitRepostIds.add(vr.Id);
    }
    Map<Id,Visit_Report__c> accounts = new Map<Id,Visit_Report__c>([SELECT Name FROM Visit_Report__c WHERE Id IN :visitRepostIds]);

    User user = [SELECT Name FROM User WHERE Id =: UserInfo.getUserId() LIMIT 1];

    List<String> messages = new List<String>();
    for (Visit_Report__c vr : [SELECT Id, Name FROM Visit_Report__c WHERE Id IN : Trigger.new ]) {  
        if(Trigger.isInsert){     
            messages.add('Visit Report "' + vr.Name + '" has been created by "' + user.Name + '"');
        } else if(Trigger.isUpdate){
            messages.add('Visit Report "' + vr.Name + '" has been updated by "' + user.Name + '"');
        }
    }
    List<Notification__e> notifications = new List<Notification__e>();
    for (String message: messages) {
        notifications.add(new Notification__e(Message__c = message));
    }
    List<Database.SaveResult> results = EventBus.publish(notifications);
    
    // Inspect publishing results
    for (Database.SaveResult result : results) {
        if (!result.isSuccess()) {
            for (Database.Error error : result.getErrors()) {
                System.debug('Error returned: ' + error.getStatusCode() +' - '+ error.getMessage());
            }
        }
    }
}