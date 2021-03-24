import { jsonEqual } from './equality';

function isMatch(s, d) {
  if (s && d) {
    const result = s.filter((item) => item.Id === d.Id)[0];
    if (result) return jsonEqual(result, d);
    return true;
  }
}

export default isMatch;
