// Game logic functions for the tank game
export const animateShot = (
  x0: number,
  y0: number,
  vx: number,
  vy: number,
  projectileRef: React.RefObject<SVGCircleElement | null>,
  hitCastle: (x: number, y: number) => boolean,
  spawnBoom: (x: number, y: number) => void,
  spawnPuff: (x: number, y: number) => void,
  endShot: (hit: boolean, x: number, y: number) => void,
  setIsFlying: (isFlying: boolean) => void
) => {
  if (!projectileRef.current) return;

  setIsFlying(true);
  
  let t0: number | null = null;
  const g = 500; // gravity
  const GROUND_Y = 420;

  const step = (ts: number) => {
    if (!t0) t0 = ts;
    const dt = (ts - t0) / 1000;
    
    const x = x0 + vx * dt;
    const y = y0 + vy * dt + 0.5 * g * dt * dt;

    if (projectileRef.current) {
      projectileRef.current.setAttribute('cx', x.toString());
      projectileRef.current.setAttribute('cy', y.toString());
      projectileRef.current.setAttribute('opacity', '1');
    }

    // Hit castle?
    if (hitCastle(x, y)) {
      spawnPuff(x, y);
      endShot(true, x, y);
      return;
    }

    // Hit ground?
    if (y >= GROUND_Y - 2) {
      spawnBoom(x, GROUND_Y - 4);
      endShot(false, x, GROUND_Y - 4);
      return;
    }

    // Out of bounds?
    if (x > 910 || x < -10 || y < -20) {
      endShot(false, x, y);
      return;
    }

    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

export const calculateBarrelTip = (tankX: number, angle: number) => {
  const rad = angle * Math.PI / 180;
  const pivot = { x: 0, y: -6 };
  const L = 52;
  const localTip = {
    x: pivot.x + L * Math.cos(rad),
    y: pivot.y - L * Math.sin(rad)
  };
  const TANK_Y = 388;
  return {
    x: tankX + localTip.x,
    y: TANK_Y + localTip.y
  };
};

export const calculateVelocity = (angle: number, power: number) => {
  const rad = angle * Math.PI / 180;
  const v0 = 150 + (power / 100) * 250;
  return {
    vx: v0 * Math.cos(rad),
    vy: -v0 * Math.sin(rad)
  };
};
