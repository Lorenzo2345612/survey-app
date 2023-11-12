export const getInitialData = async (url: string) => {
    try {
        console.log(url);
        const response = await fetch(url);
        if (!response.ok){
            throw new Error('Could not fetch data');
        }
        const data = await response.json();
        console.log(url);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const sendVote = async (id: string, url: string) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    id: id
                }
            )
        });
        if (!response.ok){
            throw new Error('Could not send data');
        }
        const data = await response.json();
        return data;
    } catch (err){
        console.log(err);
        return null;
    }
}