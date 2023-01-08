export const swap = <T>(arr: T[], i: number, j: number) => {
  const copy = [...arr];
  const tmp = copy[i];
  copy[i] = copy[j];
  copy[j] = tmp;
  return copy;
};
