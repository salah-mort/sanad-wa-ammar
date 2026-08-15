// page-flip@2.0.7 ships no type declarations, so importing it fails tsc (TS2307).
// Minimal ambient types covering the API BookFlip.tsx actually uses.
declare module "page-flip" {
  export interface PageFlipSettings {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    showCover?: boolean;
    drawShadow?: boolean;
    maxShadowOpacity?: number;
    mobileScrollSupport?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startPage?: number;
    startZIndex?: number;
    autoSize?: boolean;
    swipeDistance?: number;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
  }

  export class PageFlip {
    constructor(element: HTMLElement, settings: PageFlipSettings);
    loadFromHTML(items: NodeListOf<Element> | HTMLElement[]): void;
    loadFromImages(images: string[]): void;
    on(event: "flip" | "changeOrientation" | "changeState" | "init" | "update", callback: (event: { data: never; object: PageFlip }) => void): void;
    flipNext(corner?: "top" | "bottom"): void;
    flipPrev(corner?: "top" | "bottom"): void;
    flip(page: number, corner?: "top" | "bottom"): void;
    turnToPage(page: number): void;
    turnToNextPage(): void;
    turnToPrevPage(): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    destroy(): void;
    update(): void;
  }
}
