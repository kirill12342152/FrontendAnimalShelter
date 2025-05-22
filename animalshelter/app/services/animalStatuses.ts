export interface AnimalStatusRequest{
    title: string;
}

export const getAllAnimalStatuses = async () => {
    const response = await fetch("https://localhost:7230/api/AnimalStatuses");

    return response.json();
}
