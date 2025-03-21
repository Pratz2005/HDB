const authToken = process.env.ACCESS_TOKEN;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const x = searchParams.get('x');
    const y = searchParams.get('y');
    const url = `https://www.onemap.gov.sg/api/common/convert/3857to4326?Y=${y}&X=${x}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': authToken,
            }
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("convertCoordinates error:", error);
        
        return new Response(JSON.stringify({ error: "Failed to convert coordinates" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

/*
// Example frontend fetch call to convert coordinates
const x = 11559656.16;
const y = 146924.54;

fetch(`/api/dashboard/convert-coordinates?x=${x}&y=${y}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Do something with the converted coordinates
    })
    .catch(error => {
        console.error("Error converting coordinates:", error);
    });
*/