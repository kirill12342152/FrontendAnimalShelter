import Modal from "antd/es/modal/Modal";
import { AnimalRequest } from "../services/animals"
import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { Switch } from "antd";


interface Props {
    mode: Mode;
    values: Animal;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: AnimalRequest) => void;
    handleUpdate: (id: string, request: AnimalRequest) => void;
}

export enum Mode {
    Create,
    Edit,
}

export const CreateUpdaeteAnimal = ({
    mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate,

}: Props) => {
    const [name, setName] = useState<string>("");
    const [animalViewId, setAnimalViewId] = useState<string>("");
    const [isMale, setIsMale] = useState<boolean>(true);
    const [age, setAge] = useState<number>(1);
    const [animalBreedId, setAnimalBreedId] = useState<string>("");
    const [distinctiveFeatures, setDistinctiveFeatures] = useState<string>("");
    const [weight, setWeight] = useState<number>(1);
    const [photos, setPhotos] = useState<string>("");
    const [animalStatusId, setAnimalStatusId] = useState<string>("");

    

    useEffect(() => {
        setName(values.name);
        setAnimalViewId(values.animalViewId);
        setIsMale(values.isMale);
        setAge(values.age);
        setAnimalBreedId(values.animalBreedId);
        setDistinctiveFeatures(values.distinctiveFeatures);
        setWeight(values.weight);
        setPhotos(values.photos);
        setAnimalStatusId(values.animalStatusId);
    }, [values]);

    const handleOnOk = async () => {
        const animalRequest = {
            name,
            animalViewId,
            isMale,
            age,
            animalBreedId,
            distinctiveFeatures,
            weight,
            photos,
            animalStatusId
        };
        mode == Mode.Create
            ? handleCreate(animalRequest)
            : handleUpdate(values.id, animalRequest)
    };

    return (
        <Modal
            title={
                mode === Mode.Create ? "Добавить животное" : "Редактировать животное"
            }
            open={isModalOpen}
            onOk={handleOnOk}
            onCancel={handleCancel}
            cancelText={"Отмена"}
        >
            <div className="animal__modal">
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя животного"
                />

                <Input
                    value={animalViewId}
                    onChange={(e) => setAnimalViewId(e.target.value)}
                    placeholder="Айди вида животного"
                />

                <Switch
                    checked={isMale}
                    onChange={(checked) => setIsMale(checked)}
                    checkedChildren="Самец"
                    unCheckedChildren="Самка"
                />

                <Input
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    placeholder="Возраст животного"
                />

                <Input
                    value={animalBreedId}
                    onChange={(e) => setAnimalBreedId(e.target.value)}
                    placeholder="Айди породы животного"
                />

                <TextArea
                    value={distinctiveFeatures}
                    onChange={(e) => setDistinctiveFeatures(e.target.value)}
                    autoSize={{ minRows: 2, maxRows: 3 }}
                    placeholder="Особенности и приметы"
                />

                <Input
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    placeholder="Вес животного"
                />

                <Input
                    value={photos}
                    onChange={(e) => setPhotos(e.target.value)}
                    placeholder="Фото животного"
                />

                <Input
                    value={animalStatusId}
                    onChange={(e) => setAnimalStatusId(e.target.value)}
                    placeholder="Айди статуса животного"
                />
            </div>
        </Modal>
    )
};