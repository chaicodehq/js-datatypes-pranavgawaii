export function generateLocalPass(passenger) {
  if (!passenger || !passenger.name || !passenger.from || !passenger.to || !passenger.classType) {
    return "INVALID PASS";
  }

  const { name, from, to, classType } = passenger;
  const lowerClass = classType.toLowerCase();

  if (lowerClass !== 'first' && lowerClass !== 'second') {
    return "INVALID PASS";
  }

  const passId = lowerClass.charAt(0).toUpperCase() +
    from.slice(0, 3).toUpperCase() +
    to.slice(0, 3).toUpperCase();

  const toTitleCase = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return `MUMBAI LOCAL PASS
---
Name: ${name.toUpperCase()}
From: ${toTitleCase(from)}
To: ${toTitleCase(to)}
Class: ${lowerClass.toUpperCase()}
Pass ID: ${passId}`;
}
