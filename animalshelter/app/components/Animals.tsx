import Card from "antd/es/card/Card";
import { CardTitle } from "./Cardtitle";
import { Button } from "antd";
import { useEffect, useState } from "react";

interface Props {
    animals: Animal[];
    handleDelete: (id: string) => void;
    handleOpen: (animal: Animal) => void;
}

export const Animals = ({ animals, handleDelete, handleOpen }: Props) => {

    const [animalViews, setAnimalViews] = useState<AnimalView[]>([]);

    useEffect(() => {
        const fetchAnimalViews = async () => {
            try {
                const response = await fetch("https://localhost:7230/api/AnimalViews");
                const data = await response.json();
                setAnimalViews(data);
            } catch (error) {
                console.error("Error fetching animal views:", error);
            }
        };

        fetchAnimalViews();
    }, []);

    const getAnimalViewTitle = (animalViewId: string) => {
        const view = animalViews.find(v => v.id === animalViewId);
        return view?.title || "Неизвестный вид";
    };


    return (
        <div className="cards">
            {animals.map((animal: Animal) => (
                <Card
                    key={animal.id}
                    title={
                        <CardTitle
                            name={animal.name}
                            animalViewTitle={getAnimalViewTitle(animal.animalViewId)}
                        />
                    }
                    variant="borderless"
                >
                    <p>{animal.isMale ? "Самец" : "Самка"}</p>
                    <p>{animal.distinctiveFeatures}</p>
                    <p>{animal.animalBreedId}</p>
                    <p>{animal.animalStatusId}</p>
                    <p>{animal.photos}</p>
                    <p>{animal.animalViewId}</p>

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
