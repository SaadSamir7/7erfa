export function isValidPhoneNumber(phoneNumber, users) {
  const phoneNumbers = users?.map((user) => user?.phoneNumber);
  const egyptianPhoneRegex = /^(010|011|012|015)\d{8}$/;
  if (
    !egyptianPhoneRegex.test(phoneNumber) ||
    phoneNumbers?.includes(phoneNumber)
  ) {
    return false;
  }

  return true;
}

export function isValidPassword(password) {
  return password.length >= 8;
}

export function isValidEmail(email, users) {
  const emails = users?.map((user) => user.email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email) || emails?.includes(email)) {
    return false;
  }

  return true;
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString("en-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: date.toLocaleTimeString("en-EG", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

export const getAvailableStatuses = (currentStatus) => {
  switch (currentStatus) {
    case "pending":
      return ["pending", "in progress", "completed", "canceled"];
    case "in progress":
      return ["in progress", "completed"];
    case "completed":
      return ["completed"];
    case "canceled":
      return ["canceled"];
    default:
      return ["pending", "in progress", "completed", "canceled"];
  }
};
