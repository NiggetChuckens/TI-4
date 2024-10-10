import { CapacitorException, ExceptionCode, WebPlugin } from '@capacitor/core';
export class BarcodeScannerWeb extends WebPlugin {
    async startScan(_options) {
        throw this.createUnavailableException();
    }
    async stopScan() {
        throw this.createUnavailableException();
    }
    async readBarcodesFromImage(_options) {
        throw this.createUnavailableException();
    }
    async scan() {
        throw this.createUnavailableException();
    }
    async isSupported() {
        throw this.createUnavailableException();
    }
    async enableTorch() {
        throw this.createUnavailableException();
    }
    async disableTorch() {
        throw this.createUnavailableException();
    }
    async toggleTorch() {
        throw this.createUnavailableException();
    }
    async isTorchEnabled() {
        throw this.createUnavailableException();
    }
    async isTorchAvailable() {
        throw this.createUnavailableException();
    }
    async setZoomRatio(_options) {
        throw this.createUnavailableException();
    }
    async getZoomRatio() {
        throw this.createUnavailableException();
    }
    async getMinZoomRatio() {
        throw this.createUnavailableException();
    }
    async getMaxZoomRatio() {
        throw this.createUnavailableException();
    }
    async openSettings() {
        throw this.createUnavailableException();
    }
    async isGoogleBarcodeScannerModuleAvailable() {
        throw this.createUnavailableException();
    }
    async installGoogleBarcodeScannerModule() {
        throw this.createUnavailableException();
    }
    async checkPermissions() {
        throw this.createUnavailableException();
    }
    async requestPermissions() {
        throw this.createUnavailableException();
    }
    createUnavailableException() {
        return new CapacitorException('This Barcode Scanner plugin method is not available on this platform.', ExceptionCode.Unavailable);
    }
}
//# sourceMappingURL=web.js.map