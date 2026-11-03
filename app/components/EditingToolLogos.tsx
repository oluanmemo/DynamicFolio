import Image from "next/image";

// Adobe assets: https://www.adobe.com/cc-shared/assets/img/product-icons/svg/{premiere,after-effects,photoshop}.svg
// Resolve: https://commons.wikimedia.org/wiki/File:DaVinci_Resolve_Studio.png
// CapCut: https://github.com/homarr-labs/dashboard-icons/blob/main/svg/cap-cut.svg
// ElevenLabs: https://github.com/simple-icons/simple-icons/blob/15.0.0/icons/elevenlabs.svg
function BrandLogo({file, monochrome = false}: {file: string; monochrome?: boolean}) {
    return <Image src={`/icons/${file}`} alt="" aria-hidden="true" width={24} height={24} style={{objectFit: "contain", filter: monochrome ? "invert(1)" : undefined}} />;
}

export const PremiereLogo = () => <BrandLogo file="premiere.svg" />;
export const AfterEffectsLogo = () => <BrandLogo file="aftereffects.svg" />;
export const PhotoshopLogo = () => <BrandLogo file="photoshop.svg" />;
export const DaVinciLogo = () => <BrandLogo file="davinci-resolve.png" />;
export const CapCutLogo = () => <BrandLogo file="capcut.svg" monochrome />;
export const ElevenLabsLogo = () => <BrandLogo file="elevenlabs.svg" monochrome />;
export const GPTLogo = () => <BrandLogo file="openai.svg" monochrome />;
