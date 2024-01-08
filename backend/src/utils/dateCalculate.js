

const dateCompare = (date) => {
  // Get the current date
  const currentDate = new Date();

  // Assuming updatedAt is a string in the given format
  const updatedAtString = date;

  // Convert updatedAt to a Date object
  const updatedAt = new Date(updatedAtString);

  // Calculate the difference in milliseconds between the current date and updatedAt
  const oneMonthInMillis = 30 * 24 * 60 * 60 * 1000; // One month in milliseconds
  const differenceInMillis = currentDate - updatedAt;

  // Check if the difference is greater than or equal to one month
  if (differenceInMillis >= oneMonthInMillis) {
    return true;
  } else {
    return false;
  }
};

export {dateCompare}