export function formatCitizenId(value) {
  const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = val.match(/\d{1,15}/g); // เปลี่ยนจาก \d{4,16} เป็น \d{1,15}
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i++) {
    if (i === 1 || i === 5 || i === 11 || i === 14) {
      parts.push("-");
    }
    parts.push(match[i]);
  }

  return parts.join("");
}

export function numberFormat(value) {
  const val = value.replace(/\s+/g, "").replace(/[^0-9]/g, "");
  return val;
}
