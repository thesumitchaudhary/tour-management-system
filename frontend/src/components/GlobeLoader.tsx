import { createPortal } from "react-dom";
import "./GlobeLoader.css";

type GlobeLoaderProps = { progress: number; label?: string };

export default function GlobeLoader({ progress, label = "Loading" }: GlobeLoaderProps) {
  return createPortal(
    <div className="globe-loader-overlay">
      <div className={`globe-loader${progress === 100 ? " globe-loader-done" : ""}`}
        role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100}
        aria-valuenow={progress} aria-valuetext={progress === 100 ? "Complete" : `${label}, please wait`}>
        <div className="globe-loader-icon">
          <svg className="globe-loader-globe" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="m5 6 3 2 1 3-2 2-3-1" />
            <path d="m12 3-1 4 3 2 3-1 3 2" />
            <path d="m12 11 4 1 1 3-3 2-1 4" />
            <path d="m7 16 3 1 1 4" />
          </svg>
        </div>
        <div className="globe-loader-percentage" aria-hidden="true">{progress}%</div>
        <div className="globe-loader-track" aria-hidden="true">
          <div className="globe-loader-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
