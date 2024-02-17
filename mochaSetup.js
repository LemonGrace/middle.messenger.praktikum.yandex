import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<div id="app"></div>', {
	url: 'http://127.0.0.1:5173',
});

global.window = window;
global.Event = window.Event;
global.MouseEvent = window.MouseEvent;
global.document = window.document;
global.DocumentFragment = window.document;
global.FormData = window.FormData;
global.location = window.location;
global.XMLHttpRequest = window.XMLHttpRequest;
global.WebSocket = window.WebSocket;
