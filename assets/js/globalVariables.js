/**
 * This is global variables, main page.
 */

let database = new Database(support.getUserID());
let searchStatus = -1;
let searchString = '';
let dialog = null;
let task = new Tasks(support.taskContainerZeroing(),database.onGetUserId());