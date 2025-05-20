export interface AnimalRequest{
    name: string;
    animalViewId: string;
    isMale: boolean;
    age: number;
    animalBreedId: string;
    distinctiveFeatures: string;
    weight : number;
    photos : string;
    animalStatusId : string;
}

// методы для взаимодействия с api

export const getAllAnimals = async () => {
    const response = await fetch("https://localhost:7230/api/Animals");

    return response.json();
}

export const createAnimal = async (animalRequest: AnimalRequest) => {
    await fetch("https://localhost:7230/api/Animals", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(animalRequest),
    });    
};

export const updateAnimal = async (id: string, animalRequest: AnimalRequest) => {
    await fetch(`https://localhost:7230/api/Animals/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(animalRequest),
    }); 
}

export const deleteAnimal = async (id: string) => {
    await fetch(`https://localhost:7230/api/Animals/${id}`, {
        method: "DELETE",
    }); 
}