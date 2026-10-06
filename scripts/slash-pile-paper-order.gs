/**
 * Google Apps Script for the slash pile paper group order form.
 *
 * Setup (once):
 *   1. Create a new, private Google Sheet (sharing: Restricted).
 *   2. Extensions → Apps Script, replace the contents with this file, Save.
 *   3. Deploy → New deployment → type "Web app"
 *        Execute as:     Me
 *        Who has access: Anyone
 *      Approve the permissions prompt, then copy the Web app URL.
 *   4. Set that URL as SLASH_PILE_PAPER_SCRIPT_URL in Vercel (and .env.local).
 *
 * "Anyone" only lets the website send orders in. It does not make the sheet
 * readable — the sheet's own sharing setting controls that.
 *
 * After editing this script, use Deploy → Manage deployments → Edit → New
 * version, so the URL stays the same.
 */

var SHEET_NAME = "Orders";
var HEADERS = ["Submitted", "Name", "Email", "Phone", "Rolls", "Wants to join NCPBA", "Notes"];
var JOIN_COLUMN = 6;

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getOrdersSheet();

    sheet.appendRow([
      new Date(),
      asText(data.name),
      asText(data.email),
      asText(data.phone),
      Number(data.rolls) || 0,
      data.joinNcpba === true,
      asText(data.notes),
    ]);
    sheet.getRange(sheet.getLastRow(), JOIN_COLUMN).insertCheckboxes();

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Returns only the total rolls ordered — never names or contact details.
function doGet() {
  var sheet = getOrdersSheet();
  var rows = sheet.getLastRow() - 1;
  var rolls = 0;
  if (rows > 0) {
    sheet.getRange(2, 5, rows, 1).getValues().forEach(function (r) {
      rolls += Number(r[0]) || 0;
    });
  }
  return json({ ok: true, rolls: rolls });
}

function getOrdersSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Sheets treats text starting with = + - @ as a formula; force it to plain text.
function asText(value) {
  var s = String(value == null ? "" : value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
