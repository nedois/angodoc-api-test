export const canEditDocument = (documentAgencyId, user) =>
    user.agency && parseInt(documentAgencyId) === user.agency.id || user.role === "administrador";
