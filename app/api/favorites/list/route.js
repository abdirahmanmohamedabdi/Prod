import { connectDB } from '@/app/lib/mongo';
import { User } from '@/app/model/user';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId'); 

    try {
        await connectDB(); 

        const user = await User.findById(userId).populate('favorites'); // Fetch user and populate favorites
        
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(user.favorites), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch favorites' }), { status: 500 });
    }
}
