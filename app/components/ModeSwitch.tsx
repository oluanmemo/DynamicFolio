"use client";

import { useEffect, useRef } from "react";
import { useMode } from "../context/ModeContext";
import { trackEvent } from "../lib/analytics";
import { usePathname } from "next/navigation";
import { stripLocalePrefix } from "../lib/locale";
import LaneIcon from "./LaneIcon";

export default function ModeSwitch() {
    const pathname = usePathname();
    const { mode, setMode } = useMode();
    const switchRef = useRef<HTMLDivElement | null>(null);
    const normalizedPathname = stripLocalePrefix(pathname ?? "/");
    const isHomeRoute = normalizedPathname === "/";
    const isRiffmakerRoute = normalizedPathname.startsWith("/riffmaker");
    const isDevPortfolioRoute = normalizedPathname === "/dev";

    const handleModeChange = (nextMode: "dev" | "editor") => {
        if (mode === nextMode) {
            return;
        }

        trackEvent("preference_change", {
            eventCategory: "preferences",
            preference: "mode",
            from: mode,
            to: nextMode,
        });
        setMode(nextMode);
    };

    useEffect(() => {
        if (isRiffmakerRoute || isHomeRoute) {
            return;
        }

        const updateSwitchState = () => {
            const switchElement = switchRef.current;
            const aboutSection = document.getElementById("sobre");
            const projectsSection = document.getElementById("projetos");

            if (!switchElement || !aboutSection) {
                return;
            }

            const rect = aboutSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const isAroundAboutSection = rect.top < viewportHeight * 0.85;
            const sectionCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight / 2;
            const isAboutActive = Math.abs(sectionCenter - viewportCenter) <= Math.min(120, viewportHeight * 0.16);
            const projectsRect = projectsSection?.getBoundingClientRect();
            const isPastProjectsStart = Boolean(isDevPortfolioRoute && projectsRect && projectsRect.top < viewportHeight * 0.72);

            switchElement.classList.toggle("collapsed", isAroundAboutSection);
            switchElement.classList.toggle("minimal", isAboutActive);
            switchElement.classList.toggle("is-past-projects", isPastProjectsStart);
        };

        updateSwitchState();
        window.addEventListener("scroll", updateSwitchState, { passive: true });
        window.addEventListener("resize", updateSwitchState);

        return () => {
            window.removeEventListener("scroll", updateSwitchState);
            window.removeEventListener("resize", updateSwitchState);
        };
    }, [isDevPortfolioRoute, isHomeRoute, isRiffmakerRoute]);

    if (isRiffmakerRoute || isHomeRoute) {
        return null;
    }

    return (
        <div className="mode-switch" id="modeSwitch" ref={switchRef}>
            <div className="switch-topline">
                <span className="switch-topline-dot"></span>
                <span className="switch-topline-label">Skills</span>
            </div>
            <button
                className={`switch-btn${mode === "dev" ? " active" : ""}`}
                id="btnDev"
                type="button"
                aria-pressed={mode === "dev"}
                onClick={() => handleModeChange("dev")}
            >
                <span className="switch-icon-wrap">
                    <span className="switch-icon"><LaneIcon lane="dev" size={18} /></span>
                </span>
                <span className="switch-copy">
                    <span className="switch-label">Dev</span>
                </span>
            </button>
            <div className="switch-divider"></div>
            <button
                className={`switch-btn${mode === "editor" ? " active" : ""}`}
                id="btnEditor"
                type="button"
                aria-pressed={mode === "editor"}
                onClick={() => handleModeChange("editor")}
            >
                <span className="switch-icon-wrap">
                    <span className="switch-icon"><LaneIcon lane="editing" size={18} /></span>
                </span>
                <span className="switch-copy">
                    <span className="switch-label">Editor</span>
                </span>
            </button>
        </div>
    );
}
