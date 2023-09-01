import { lomiAPI } from './lib/api';
declare global {
   interface Window {
        lomiAPI: lomiAPI;
        showSnackbar: (message: string, duration?: number) => void;
    }
}

window.lomiAPI = new lomiAPI()
