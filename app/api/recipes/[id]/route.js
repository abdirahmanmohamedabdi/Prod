import { MongoClient, ObjectId } from 'mongodb';

export const config = {
    api: {
        bodyParser: false, 
    },
};

export async function GET(req, { params }) {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect(); 
        const database = client.db('Pishipoa'); 
        const collection = database.collection('recipes');

        const { id } = params; 

       
        const result = await collection.findOne({ _id: new ObjectId(id) });

        if (result) {
            return new Response(JSON.stringify(result), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return new Response(JSON.stringify({ message: 'No recipe found with that ID' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        console.error('Error fetching recipe by ID:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } finally {
        await client.close(); 
    }
}
