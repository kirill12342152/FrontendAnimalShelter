export interface AnimalBreedsRequest{
    title: string;
    animalViewId: string;
}

export const getAllAnimalBreeds = async () => {
    const response = await fetch("https://localhost:7230/api/AnimalBreeds");

    return response.json();
}
