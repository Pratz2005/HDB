// Sample API Route - This is a template for creating API endpoints

// Export the GET function that will handle GET requests for this route
export async function GET(request) {
    // You can retrieve query parameters from the request URL (optional)
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name') || 'World'; // Default to 'World' if no 'name' is provided

    // Log the request for debugging purposes (optional)
    console.log(`GET request received at /api/sample with name: ${name}`);

    // Prepare a simple response
    const responseData = {
        message: `Hello, ${name}! Welcome to the API.`,
        timestamp: new Date().toISOString(),
    };

    // Return the response as JSON
    return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });

    // Optionally, you could add more methods like POST, PUT, DELETE as needed
    // export async function POST(request) {
    //   const data = await request.json();
    //   // Process the POST request
    //   return new Response(JSON.stringify({ message: "Data received", data }), { status: 200 });
    // }
}

/* Example frontend fetch call to fetch greeting message
fetch('/api/sample?name=John')
    .then(response => response.json())
    .then(data => {
        console.log(data.message);  // "Hello, John! Welcome to the API."
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
*/