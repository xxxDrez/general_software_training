/**
 * This is global variables, main page.
 */

 let database = new Database(support.getUserID());
 let dialog = null;
 let task = new Tasks(support.taskContainerZeroing(),database.onGetUserId());