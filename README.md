![image](https://user-images.githubusercontent.com/16103038/53172960-ea3b0f00-35e6-11e9-9f37-b80c58603eac.png)


To be able to use the following feature, My Domain needs to be turned on. If My Domain is not turned on, the lightning components will not be available for use.


First define a Platform Event. This can be done by going to Setup -> Platform Events -> click on “New Platform Event”.

![image](https://user-images.githubusercontent.com/16103038/53173078-371ee580-35e7-11e9-9013-84b48c71fbca.png)


Next, create the lightning component with the code given at the end of this document. The lightning component subscribes to the Platform Event that was previously created and receives a notification which is used and displayed on the utility bar.

To enable the utility bar, go to Setup -> App Manager - > Locate the application where the utility bar should be enable (must be Lightning-enabled) and click on the arrow on the right-hand side and select “Edit” -> click “Utility Items” -> click on “Add Utility Item”. Then select the lightning component as the item to be displayed on the utility bar.

![image](https://user-images.githubusercontent.com/16103038/53173211-82d18f00-35e7-11e9-9090-1d37fac5965d.png)

For the new Visit Report records to be saved in the platform events, they need to be published. For this purpose, an Apex Trigger is needed which is called every time a Visit Report is created or updated. The Trigger constructs the string that we want to have saved for displaying on the utility bar and then publishes the event on the EventBus. These notifications are being stored in the Platform Event for 24 hours and then they are automatically deleted.
