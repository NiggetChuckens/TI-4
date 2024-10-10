/**
 * @since 0.0.1
 */
export var BarcodeFormat;
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
})(BarcodeFormat || (BarcodeFormat = {}));
/**
 * @since 0.0.1
 */
export var BarcodeValueType;
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
})(BarcodeValueType || (BarcodeValueType = {}));
/**
 * @since 0.0.1
 */
export var LensFacing;
(function (LensFacing) {
    /**
     * @since 0.0.1
     */
    LensFacing["Front"] = "FRONT";
    /**
     * @since 0.0.1
     */
    LensFacing["Back"] = "BACK";
})(LensFacing || (LensFacing = {}));
/**
 * @since 5.1.0
 */
export var GoogleBarcodeScannerModuleInstallState;
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
})(GoogleBarcodeScannerModuleInstallState || (GoogleBarcodeScannerModuleInstallState = {}));
//# sourceMappingURL=definitions.js.map