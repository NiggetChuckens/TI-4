import { WebPlugin } from '@capacitor/core';
import type { BarcodeScannerPlugin, GetMaxZoomRatioResult, GetMinZoomRatioResult, GetZoomRatioResult, IsGoogleBarcodeScannerModuleAvailableResult, IsSupportedResult, IsTorchAvailableResult, IsTorchEnabledResult, PermissionStatus, ReadBarcodesFromImageOptions, ReadBarcodesFromImageResult, ScanResult, SetZoomRatioOptions, StartScanOptions } from './definitions';
export declare class BarcodeScannerWeb extends WebPlugin implements BarcodeScannerPlugin {
    startScan(_options?: StartScanOptions): Promise<void>;
    stopScan(): Promise<void>;
    readBarcodesFromImage(_options: ReadBarcodesFromImageOptions): Promise<ReadBarcodesFromImageResult>;
    scan(): Promise<ScanResult>;
    isSupported(): Promise<IsSupportedResult>;
    enableTorch(): Promise<void>;
    disableTorch(): Promise<void>;
    toggleTorch(): Promise<void>;
    isTorchEnabled(): Promise<IsTorchEnabledResult>;
    isTorchAvailable(): Promise<IsTorchAvailableResult>;
    setZoomRatio(_options: SetZoomRatioOptions): Promise<void>;
    getZoomRatio(): Promise<GetZoomRatioResult>;
    getMinZoomRatio(): Promise<GetMinZoomRatioResult>;
    getMaxZoomRatio(): Promise<GetMaxZoomRatioResult>;
    openSettings(): Promise<void>;
    isGoogleBarcodeScannerModuleAvailable(): Promise<IsGoogleBarcodeScannerModuleAvailableResult>;
    installGoogleBarcodeScannerModule(): Promise<void>;
    checkPermissions(): Promise<PermissionStatus>;
    requestPermissions(): Promise<PermissionStatus>;
    private createUnavailableException;
}
