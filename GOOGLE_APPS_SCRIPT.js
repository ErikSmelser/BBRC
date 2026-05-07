/*
  GOOGLE APPS SCRIPT FOR GOOGLE SHEETS
  1. Open a Google Sheet.
  2. Go to Extensions > App Script.
  3. Delete the default 'myFunction' and paste this code.
  4. Click 'Deploy' > 'New Deployment'.
  5. Select type 'Web App'.
  6. Execute as 'Me', Who has access: 'Anyone'.
  7. Copy the Web App URL and paste it into the React App's GOOGLE_SHEET_URL constant.
*/

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    let data = {};
    
    // Try to parse JSON from postData
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        // Fallback for form-encoded data in contents
        data = e.parameter;
      }
    } else {
      // Fallback for standard form parameters
      data = e.parameter;
    }
    
    // Extract fields with fallbacks
    const firstName = data.firstName || data.first_name || '';
    const lastName = data.lastName || data.last_name || '';
    const email = data.email || '';
    const zip = data.zip || data.zip_code || '';
    const message = data.message || '';
    const source = data.formSource || 'Landing Page';
    
    // Add row: Timestamp, First, Last, Email, ZIP, Message, Source
    sheet.appendRow([
      new Date(),
      firstName,
      lastName,
      email,
      zip,
      message,
      source
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Add doGet for testing
function doGet(e) {
  return ContentService.createTextOutput("Script is active. Use POST to submit data.")
    .setMimeType(ContentService.MimeType.TEXT);
}
