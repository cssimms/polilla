/**
 * Might be a bit squiggly...
 */

import { useEffect } from "react";

export default function Asteroids() {
  useEffect(() => {
    const asteroidsScript = document.createElement("script");
    asteroidsScript.src =
      "./frontend/src/components/asteroids/bootstrap-asteroids.js";
    asteroidsScript.async = true;
    document.body.appendChild(asteroidsScript);

    return () => {
      document.body.removeChild(asteroidsScript); // Cleanup on unmount
    };
  }, []);
  return (
    <div>
      <div id="asteroids-runner"></div>
      <script src="./bootstrap-asteroids.js"></script>
    </div>
  );
}
