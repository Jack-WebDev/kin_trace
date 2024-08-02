export const dateStringToIso = (dateString: string) => {
  if (!dateString) {
    return "";
  }
  const newIsoDate = new Date(dateString).toISOString();

  return newIsoDate;
};
