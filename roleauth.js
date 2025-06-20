const roleAuth = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const user = req.user;

           const isManager=allowedRoles.includes(user.role)
           const isSelf=allowedRoles.includes('self')&&user.id==req.params.id
           if(isManager||isSelf){
            return next()
           }
           return res.status(403).json({error:'Access Denied'})
        } catch (err) {
            console.error('Error in roleAuth middleware:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
};

module.exports = roleAuth;
