export default function isValidJson(value: any) {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
}
