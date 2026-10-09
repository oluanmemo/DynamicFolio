// Loaded only after a visitor chooses a video.
export interface YouTubePlayer {
  destroy(): void;
  getIframe(): HTMLIFrameElement;
}

interface PlayerOptions {
  host: string;
  videoId: string;
  width: string;
  height: string;
  playerVars: { autoplay: number; playsinline: number; rel: number; origin: string };
  events: {
    onReady: (event: { target: YouTubePlayer }) => void;
    onError: () => void;
    onAutoplayBlocked: () => void;
  };
}

interface YouTubeAPI {
  Player: new (element: HTMLElement, options: PlayerOptions) => YouTubePlayer;
}

type YouTubeWindow = Window & { YT?: YouTubeAPI; onYouTubeIframeAPIReady?: () => void };
let apiPromise: Promise<YouTubeAPI> | undefined;

export function loadYouTubeAPI(): Promise<YouTubeAPI> {
  const ytWindow = window as YouTubeWindow;
  if (ytWindow.YT?.Player) return Promise.resolve(ytWindow.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YouTubeAPI>((resolve, reject) => {
    const script = document.createElement("script");
    const previousReady = ytWindow.onYouTubeIframeAPIReady;
    const cleanup = () => {
      window.clearTimeout(timeout);
      script.onerror = null;
      ytWindow.onYouTubeIframeAPIReady = previousReady;
    };
    const fail = () => {
      cleanup();
      script.remove();
      reject(new Error("YouTube player unavailable"));
    };
    const timeout = window.setTimeout(fail, 15000);
    ytWindow.onYouTubeIframeAPIReady = () => {
      cleanup();
      previousReady?.();
      if (ytWindow.YT?.Player) resolve(ytWindow.YT);
      else reject(new Error("YouTube player unavailable"));
    };
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = fail;
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    apiPromise = undefined;
    throw error;
  });

  return apiPromise;
}
