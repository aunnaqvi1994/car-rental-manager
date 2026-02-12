// ====================================================
// GOOGLE SHEETS INTEGRATION LAYER
// ====================================================
// Add this to the TOP of your app.js file, before any other code

// IMPORTANT: Replace this URL with your deployed Apps Script Web App URL
const GOOGLE_SHEETS_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';

// Google Sheets API wrapper
class GoogleSheetsAPI {
    constructor(webAppUrl) {
        this.url = webAppUrl;
    }

    async getAllData(sheetName) {
        try {
            const response = await fetch(`${this.url}?action=getAll&sheet=${sheetName}`);
            const result = await response.json();
            if (result.success) {
                return result.data;
            } else {
                console.error('Error fetching data:', result.error);
                return [];
            }
        } catch (error) {
            console.error('Network error:', error);
            return [];
        }
    }

    async addData(sheetName, data) {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'add',
                    sheet: sheetName,
                    data: data
                })
            });
            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error('Error adding data:', error);
            return false;
        }
    }

    async deleteData(sheetName, id, password) {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'delete',
                    sheet: sheetName,
                    data: { id, password }
                })
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error deleting data:', error);
            return { success: false, error: error.toString() };
        }
    }
}

// Initialize the API
const sheetsAPI = new GoogleSheetsAPI(GOOGLE_SHEETS_URL);
