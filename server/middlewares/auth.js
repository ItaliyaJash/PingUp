import User from '../models/User.js';

export const protect = async (req, res, next) => {
    try {
        const auth = await req.auth();
        const { userId, sessionClaims } = auth;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'not authenticated' });
        }

        const existingUser = await User.findById(userId);

        if (!existingUser) {
            const email =
                sessionClaims?.email ||
                sessionClaims?.email_address ||
                sessionClaims?.primary_email_address ||
                `${userId}@pingup.local`;

            const fullName =
                sessionClaims?.name ||
                sessionClaims?.full_name ||
                [sessionClaims?.first_name, sessionClaims?.last_name].filter(Boolean).join(' ') ||
                'PingUp User';

            await User.create({
                _id: userId,
                email,
                full_name: fullName,
                username: email.split('@')[0],
                profile_picture: sessionClaims?.picture || sessionClaims?.image_url || '',
            });
        }

        next();
    } catch (error) {
        if (error?.code === 11000) {
            return next();
        }

        res.status(401).json({ success: false, message: error.message });
    }
}
