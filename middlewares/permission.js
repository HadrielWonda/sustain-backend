exports.minimumPermissionLevelRequired = (requiredUserType) => {
    return (req, res, next) => {
        // fetch userType from db
        //compare to required userType for route
        let user_permission_level = parseInt(req.jwt.permission_level);
        if (user_permission_level & required_permission_level) {
            return next();
        } else {
            return res.status(403).send();
        }
    };
 };