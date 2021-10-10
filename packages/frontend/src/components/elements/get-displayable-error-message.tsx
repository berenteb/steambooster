export function getDisplayableErrorMessage(error?: Error | null) {
  if (!error) return "Unknown error occurred.";
  return error.message;
}
