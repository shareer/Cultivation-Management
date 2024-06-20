export const randomColor = () => {
    const colors = [
      "#FEF1DC",
      "#E2EFE8",
      "#D9DACE",
      "#DFECFB",
      "#9ae6b4",
      "#68d391",
      "#fc8181",
      "#f6ad55",
      "#cbd5e0",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };