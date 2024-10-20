'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

/**
 * @since 0.0.1
 */
exports.BarcodeFormat = void 0;
(function (BarcodeFormat) {
    /**
     * Only available on Android and iOS.
     *
     * @since 0.0.1
     */
    BarcodeFormat["Aztec"] = "AZTEC";
    /**
     * Only available on Android and iOS.
     *
     * @since 0.0.1
     */
    BarcodeFormat["Codabar"] = "CODABAR";
    /**
     * Only available on Android and iOS.
     *
     * @since 0.0.1
     */
    BarcodeFormat["Code39"] = "CODE_39";
    /**
     * Only available on Android and iOS.
     *
     * @since 0.0.1
     */
    BarcodeFormat["Code93"] = "CODE_93";
    /**
     * Only available on Android and iOS.
     *
     * @since 0.0.1
     */
    BarcodeFormat["Code128"] = "CODE_128";
    /**
     * Only available on Android and iOS.
     *
     * @since 0.0.1
     */
    BarcodeFormat["DataMatrix"] = "DATA_MATRIX";
    /**
     * Only available on Android and iOS.
     *
     * @since 0.0.1
     */
    BarcodeFormat["Ean8"] = "EAN_8";
    /**
     * Only available on Android and iOS.
     *
     * @since 0.0.1
     */
    BarcodeFormat["Ean13"] = "EAN_13";
    /**
     * Only available on Android and iOS.
     *
     * @since 0.0.1
     */
    BarcodeFormat["Itf"] = "ITF";
    /**
     * Only available on Android and iOS.
     *
     * @since 0.0.1
     */
    BarcodeFormat["Pdf417"] = "PDF_417";
    /**
     * Only available on Android and iOS.
     *
     * @since 0.0.1
     */
    BarcodeFormat["QrCode"] = "QR_CODE";
    /**
     * Only available on Android and iOS.
     *
     * @since 0.0.1
     */
    BarcodeFormat["UpcA"] = "UPC_A";
    /**
     * Only available on Android and iOS.
     *
     * @since 0.0.1
     */
    BarcodeFormat["UpcE"] = "UPC_E";
})(exports.BarcodeFormat || (exports.BarcodeFormat = {}));
/**
 * @since 0.0.1
 */
exports.BarcodeValueType = void 0;
(function (BarcodeValueType) {
    /**
     * @since 0.0.1
     */
    BarcodeValueType["CalendarEvent"] = "CALENDAR_EVENT";
    /**
     * @since 0.0.1
     */
    BarcodeValueType["ContactInfo"] = "CONTACT_INFO";
    /**
     * @since 0.0.1
     */
    BarcodeValueType["DriversLicense"] = "DRIVERS_LICENSE";
    /**
     * @since 0.0.1
     */
    BarcodeValueType["Email"] = "EMAIL";
    /**
     * @since 0.0.1
     */
    BarcodeValueType["Geo"] = "GEO";
    /**
     * @since 0.0.1
     */
    BarcodeValueType["Isbn"] = "ISBN";
    /**
     * @since 0.0.1
     */
    BarcodeValueType["Phone"] = "PHONE";
    /**
     * @since 0.0.1
     */
    BarcodeValueType["Product"] = "PRODUCT";
    /**
     * @since 0.0.1
     */
    BarcodeValueType["Sms"] = "SMS";
    /**
     * @since 0.0.1
     */
    BarcodeValueType["Text"] = "TEXT";
    /**
     * @since 0.0.1
     */
    BarcodeValueType["Url"] = "URL";
    /**
     * @since 0.0.1
     */
    BarcodeValueType["Wifi"] = "WIFI";
    /**
     * @since 0.0.1
     */
    BarcodeValueType["Unknown"] = "UNKNOWN";
})(exports.BarcodeValueType || (exports.BarcodeValueType = {}));
/**
 * @since 0.0.1
 */
exports.LensFacing = void 0;
(function (LensFacing) {
    /**
     * @since 0.0.1
     */
    LensFacing["Front"] = "FRONT";
    /**
     * @since 0.0.1
     */
    LensFacing["Back"] = "BACK";
})(exports.LensFacing || (exports.LensFacing = {}));
/**
 * @since 5.1.0
 */
exports.GoogleBarcodeScannerModuleInstallState = void 0;
(function (GoogleBarcodeScannerModuleInstallState) {
    /**
     * @since 5.1.0
     */
    GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["UNKNOWN"] = 0] = "UNKNOWN";
    /**
     * @since 5.1.0
     */
    GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["PENDING"] = 1] = "PENDING";
    /**
     * @since 5.1.0
     */
    GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["DOWNLOADING"] = 2] = "DOWNLOADING";
    /**
     * @since 5.1.0
     */
    GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["CANCELED"] = 3] = "CANCELED";
    /**
     * @since 5.1.0
     */
    GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["COMPLETED"] = 4] = "COMPLETED";
    /**
     * @since 5.1.0
     */
    GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["FAILED"] = 5] = "FAILED";
    /**
     * @since 5.1.0
     */
    GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["INSTALLING"] = 6] = "INSTALLING";
    /**
     * @since 5.1.0
     */
    GoogleBarcodeScannerModuleInstallState[GoogleBarcodeScannerModuleInstallState["DOWNLOAD_PAUSED"] = 7] = "DOWNLOAD_PAUSED";
})(exports.GoogleBarcodeScannerModuleInstallState || (exports.GoogleBarcodeScannerModuleInstallState = {}));

const BarcodeScanner = core.registerPlugin('BarcodeScanner', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.BarcodeScannerWeb()),
});

class BarcodeScannerWeb extends core.WebPlugin {
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
        return new core.CapacitorException('This Barcode Scanner plugin method is not available on this platform.', core.ExceptionCode.Unavailable);
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BarcodeScannerWeb: BarcodeScannerWeb
});

exports.BarcodeScanner = BarcodeScanner;
//# sourceMappingURL=plugin.cjs.js.map
