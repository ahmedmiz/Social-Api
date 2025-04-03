const Messages = {
  SUCCESS: {
    CREATED: (resource: string) => `${resource} created successfully.`,
    UPDATED: (resource: string) => `${resource} updated successfully.`,
    DELETED: (resource: string) => `${resource} deleted successfully.`,
    FETCHED: (resource: string) => `${resource} retrieved successfully.`,
    GENERAL: (resource: string) => `${resource} succeeded.`,
    
  },
  ERROR: {
    NOT_FOUND: (resource: string) => `${resource} not found.`,
    SERVER_ERROR: "An unexpected server error occurred.",
    UNAUTHORIZED: "Unauthorized access.",
    FORBIDDEN: "You do not have permission to perform this action.",
    VALIDATION_ERROR: "Invalid input data.",
  }
};

export default Messages;
