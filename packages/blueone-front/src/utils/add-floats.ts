export default function addFloats(...floats: number[]) {
  return floats.reduce((acc, curr) => _addFloats(acc, curr), 0);
}

/**
 * add without floating point issue
 */
function _addFloats(a: number, b: number) {
  const MAX_FLOATING_POINT = 2;
  const tempNumber = 10 * MAX_FLOATING_POINT;

  return (a * tempNumber + b * tempNumber) / tempNumber;
}
