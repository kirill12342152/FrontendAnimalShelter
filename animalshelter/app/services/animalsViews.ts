export interface AnimalViewRequest{
    title: string;
}

export const getAllAnimalViews = async () => {
    const response = await fetch("https://localhost:7230/api/AnimalViews");

    return response.json();
}
