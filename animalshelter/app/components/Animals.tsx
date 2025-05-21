import Card from "antd/es/card/Card";
import { Button } from "antd";
import { useEffect, useState } from "react";

// Сервисы
import { getAllAnimalBreeds } from "../services/animalBreeds";
import { getAllAnimalStatuses } from "../services/animalStatuses";
import { getAllAnimalViews } from "../services/animalsViews";

// Модели
import { AnimalView } from "../Models/AnimalView";
import { AnimalBreed } from "../Models/AnimalBreed";
import { AnimalStatus } from "../Models/AnimalStatus";

// Пропсы
interface Props {
    animals: Animal[];
    handleDelete: (id: string) => void;
    handleOpen: (animal: Animal) => void;
}

export const Animals = ({ animals, handleDelete, handleOpen }: Props) => {
    const [animalViews, setAnimalViews] = useState<AnimalView[]>([]);
    const [animalBreeds, setAnimalBreeds] = useState<AnimalBreed[]>([]);
    const [animalStatuses, setAnimalStatuses] = useState<AnimalStatus[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [views, breeds, statuses] = await Promise.all([
                    getAllAnimalViews(),
                    getAllAnimalBreeds(),
                    getAllAnimalStatuses()
                ]);
                setAnimalViews(views);
                setAnimalBreeds(breeds);
                setAnimalStatuses(statuses);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const getAnimalViewTitle = (animalViewId: string) => {
        const view = animalViews.find(v => v.id === animalViewId);
        return view?.title || "Неизвестный вид";
    };

    const getAnimalBreedTitle = (breedId: string) => {
        const breed = animalBreeds.find(b => b.id === breedId);
        return breed?.title || "Неизвестная порода";
    };

    const getAnimalStatusTitle = (statusId: string) => {
        const status = animalStatuses.find(s => s.id === statusId);
        return status?.title || "Неизвестный статус";
    };

    return (
        <div className="cards">
            {animals.map((animal: Animal) => (
                <Card
                    className="card"
                    key={animal.id}
                    cover={
                        <>
                            {animal.photos && (
                                <div style={{ position: 'relative', height: '200px' }}>
                                    <img
                                        className="card__img"
                                        src={`https://localhost:7230${animal.photos}`}
                                        alt={animal.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '6px'
                                        }}
                                    />
                                </div>
                            )}
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '16px',
                                    background: '#fafafa',
                                    borderBottom: '1px solid #f0f0f0',
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>{animal.name}</span>
                                <span>{animal.age} лет</span>
                            </div>
                        </>
                    }
                    variant="inner"
                >
                    <p>
                        <strong>Пол: </strong>
                        {animal.isMale ? "Самец" : "Самка"}
                    </p>
                    <p>
                        <strong>Особенности: </strong>
                        {animal.distinctiveFeatures}
                    </p>
                    <p>
                        <strong>Порода: </strong>
                        {getAnimalBreedTitle(animal.animalBreedId)}
                    </p>
                    <p>
                        <strong>Статус: </strong>
                        {getAnimalStatusTitle(animal.animalStatusId)}
                    </p>
                    <div className="card__buttons">
                        <Button
                            onClick={() => handleOpen(animal)}
                            style={{ flex: 1 }}
                        >
                            Редактировать
                        </Button>
                        <Button
                            onClick={() => handleDelete(animal.id)}
                            danger
                            style={{ flex: 1 }}
                        >
                            Удалить
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};
