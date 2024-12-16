export const generatePastelColor = () => {
  const r = Math.floor(Math.random() * 127 + 127);
  const g = Math.floor(Math.random() * 127 + 127);
  const b = Math.floor(Math.random() * 127 + 127);
  return `rgba(${r}, ${g}, ${b}, 0.4)`;
};
