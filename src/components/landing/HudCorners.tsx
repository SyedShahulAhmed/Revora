export function HudCorners() {
  return (
    <>
      {/* Top Left */}
      <div className="pointer-events-none absolute left-0 top-0">
        <div className="h-px w-12 bg-cyan-400" />
        <div className="absolute left-0 top-0 h-12 w-px bg-cyan-400" />
      </div>

      {/* Top Right */}
      <div className="pointer-events-none absolute right-0 top-0">
        <div className="ml-auto h-px w-12 bg-cyan-400" />
        <div className="absolute right-0 top-0 h-12 w-px bg-cyan-400" />
      </div>

      {/* Bottom Left */}
      <div className="pointer-events-none absolute bottom-0 left-0">
        <div className="absolute bottom-0 h-px w-12 bg-cyan-400" />
        <div className="absolute bottom-0 left-0 h-12 w-px bg-cyan-400" />
      </div>

      {/* Bottom Right */}
      <div className="pointer-events-none absolute bottom-0 right-0">
        <div className="absolute bottom-0 right-0 h-px w-12 bg-cyan-400" />
        <div className="absolute bottom-0 right-0 h-12 w-px bg-cyan-400" />
      </div>
    </>
  );
}