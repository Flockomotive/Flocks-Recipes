const paths = {
  starter: <><path d="M4 13h16a8 8 0 0 1-16 0z" /><path d="M9 9c0-2 2-2 2-4M14 9c0-2 2-2 2-4" /></>,
  main: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /></>,
  dessert: <><path d="M5 11h14l-1 9H6z" /><path d="M7 11a5 5 0 0 1 10 0" /></>,
  snack: <><path d="M4 8h16M6 8l1 12h10l1-12" /><path d="M9 8l1-4h4l1 4" /></>,
  veggie: <><path d="M12 21c0-8 2-13 8-16-1 7-3 12-8 16z" /><path d="M12 21c0-5-2-8-7-10 0 5 2 8 7 10z" /></>,
  bake: <><rect x="4" y="9" width="16" height="10" rx="2" /><path d="M8 9V6M12 9V5M16 9V6" /></>,
  pasta: <><path d="M4 12h16a8 8 0 0 1-16 0z" /><path d="M8 12c0-3 2-5 2-8M13 12c0-3 2-5 2-8" /></>,
  meat: <><path d="M5 15c0-5 4-9 9-9a5 5 0 0 1 0 10c-3 0-4 2-6 3a3 3 0 0 1-3-4z" /></>,
  fish: <><path d="M3 12c4-6 11-6 15 0-4 6-11 6-15 0z" /><path d="M18 12l3-3v6z" /></>,
  soup: <><path d="M4 11h16a8 8 0 0 1-16 0z" /><path d="M8 7c0-2 2-2 2-4M13 7c0-2 2-2 2-4" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  party: <><path d="M4 20l5-12 7 7z" /><path d="M14 5l1 2M19 9l-2 1M17 4v2" /></>,
  dish: <><path d="M3 18h18" /><path d="M5 18a7 7 0 0 1 14 0" /><path d="M12 8V6" /></>,
  pot: <><path d="M5 10h14v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" /><path d="M3 10h2M19 10h2M9 10V8h6v2" /><path d="M10 5c0-1 1-1 1-2M14 5c0-1 1-1 1-2" /></>,
  coffee: <><path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" /><path d="M16 11h2a2 2 0 0 1 0 4h-2" /><path d="M8 3c0 1 1 1 1 2M12 3c0 1 1 1 1 2" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
};

const colors = {
  starter: '#3f7d1f',
  main: '#b45f0a',
  dessert: '#b0316a',
  snack: '#8a6d00',
  veggie: '#2e7d32',
  bake: '#8f5a1f',
  pasta: '#a86b00',
  meat: '#b02a2a',
  fish: '#1d6fa5',
  soup: '#b3471d',
  globe: '#1d63b0',
  party: '#7b3fa8',
  dish: '#5f6b3a',
  pot: '#a8501c',
  coffee: '#7a4a2a',
  sun: '#a86800',
  clock: '#1a7f88',
};

export default function Icon({ name, size = 18 }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      stroke={colors[name] ?? colors.dish}
    >
      {paths[name] ?? paths.dish}
    </svg>
  );
}
