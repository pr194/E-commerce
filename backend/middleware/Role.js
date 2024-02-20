const Role = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        sucsses: false,
        Message: "Resource is not accessible",
      });
    }
    next();
  };
};
export default Role;
