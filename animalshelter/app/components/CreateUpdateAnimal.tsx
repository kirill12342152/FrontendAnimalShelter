import Modal from "antd/es/modal/Modal";
import { AnimalRequest } from "../services/animals"
import Input from "antd/es/input/Input";
import { useEffect, useState, ChangeEvent } from "react";
import TextArea from "antd/es/input/TextArea";
import { Radio, Select, Button, Space, Upload, message } from "antd";
import { WomanOutlined, ManOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { uploadPhoto } from '../services/uploadPhoto';
import Image from 'next/image';

// Сервисы
import { getAllAnimalStatuses } from "../services/animalStatuses";
import { getAllAnimalBreeds } from "../services/animalBreeds";
import { getAllAnimalViews } from "../services/animalsViews";

// Модели
import { AnimalStatus } from "../Models/AnimalStatus";
import { AnimalBreed } from "../Models/AnimalBreed";
import { AnimalView } from "../Models/AnimalView";

// Пропсы
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
    // Инициализация состояний с значениями из props
    const [name, setName] = useState<string>("");
    const [animalViewId, setAnimalViewId] = useState<string>("");
    const [isMale, setIsMale] = useState<boolean>(false);
    const [age, setAge] = useState<number>(1);
    const [animalBreedId, setAnimalBreedId] = useState<string>("");
    const [distinctiveFeatures, setDistinctiveFeatures] = useState<string>("");
    const [weight, setWeight] = useState<number>(1);
    const [photos, setPhotos] = useState<string>("");
    const [animalStatusId, setAnimalStatusId] = useState<string>("");
    const [uploading, setUploading] = useState<boolean>(false);

    const [animalViews, setAnimalViews] = useState<AnimalView[]>([]);
    const [animalBreeds, setAnimalBreeds] = useState<AnimalBreed[]>([]);
    const [filteredBreeds, setFilteredBreeds] = useState<AnimalBreed[]>([]);
    const [animalStatuses, setAnimalStatuses] = useState<AnimalStatus[]>([]);

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // Обновление значений при изменении props
    useEffect(() => {
        setName(values.name || "");
        setAnimalViewId(values.animalViewId || "");
        setIsMale(values.isMale ?? false);
        setAge(values.age || 1);
        setAnimalBreedId(values.animalBreedId || "");
        setDistinctiveFeatures(values.distinctiveFeatures || "");
        setWeight(values.weight || 1);
        setPhotos(values.photos || "");
        setAnimalStatusId(values.animalStatusId || "");

        // Устанавливаем файл, если есть путь к фото
        if (values.photos) {
            setFileList([{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: values.photos,
                'aria-label': 'Фото животного',
                'aria-labelledby': 'photo-label'
            }]);
        } else {
            setFileList([]);
        }
    }, [values]);

    // Фильтрация пород при изменении вида животного
    useEffect(() => {
        if (animalViewId) {
            const breeds = animalBreeds.filter(breed => breed.animalViewId === animalViewId);
            setFilteredBreeds(breeds);
            // Сбрасываем выбранную породу, если она не соответствует новому виду
            if (!breeds.some(breed => breed.id === animalBreedId)) {
                setAnimalBreedId("");
            }
        } else {
            setFilteredBreeds([]);
            setAnimalBreedId("");
        }
    }, [animalViewId, animalBreeds]);

    // Получение данных из API
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

    const handleRemovePhoto = () => {
        setPhotos('');
    };

    const handleUpload = async (file: File) => {
        setUploading(true);
        try {
            const filePath = await uploadPhoto(file);
            setPhotos(filePath);
            message.success('Фото успешно загружено');
        } catch (error: any) {
            message.error(error.response?.data || 'Ошибка при загрузке фото');
            console.error('Ошибка загрузки:', error);
        } finally {
            setUploading(false);
        }
        return false;
    };

    const handleOnOk = async () => {
        if (!photos) {
            message.warning('Пожалуйста, загрузите фото животного');
            return;
        }

        if (age === null) {
            message.warning('Пожалуйста, укажите возраст животного');
            return;
        }

        const animalRequest: AnimalRequest = {
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

        mode === Mode.Create
            ? handleCreate(animalRequest)
            : handleUpdate(values.id, animalRequest);

        handleCancel();
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
            afterClose={() => {
                // Сбрасываем все значения при закрытии модального окна
                setName("");
                setAnimalViewId("");
                setIsMale(false);
                setAge(1);
                setAnimalBreedId("");
                setDistinctiveFeatures("");
                setWeight(1);
                setPhotos("");
                setAnimalStatusId("");
                setFileList([]);
            }}
        >
            <div className="animal__modal">
                <Input
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    placeholder="Имя животного"
                />

                <Select
                    value={animalViewId}
                    onChange={(value: string) => setAnimalViewId(value)}
                    placeholder="Выберите вид животного"
                    style={{ width: '100%' }}
                    options={animalViews.map((view) => ({
                        value: view.id,
                        label: view.title
                    }))}
                />

                <Radio.Group
                    value={isMale}
                    onChange={(e: any) => setIsMale(e.target.value)}
                    style={{ width: '100%', display: 'flex', gap: '20px' }}
                >
                    <Radio.Button value={false}>
                        <Space>
                            <WomanOutlined />
                            Самка
                        </Space>
                    </Radio.Button>
                    <Radio.Button value={true}>
                        <Space>
                            <ManOutlined />
                            Самец
                        </Space>
                    </Radio.Button>
                </Radio.Group>

                <Input
                    value={age}
                    min={0}
                    max={100}
                    inputMode="numeric"
                    type="number"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                            setAge(value);
                        }
                    }}
                    placeholder="Возраст животного"
                />

                <Select
                    value={animalBreedId}
                    onChange={(value: string) => setAnimalBreedId(value)}
                    placeholder="Выберите породу животного"
                    style={{ width: '100%' }}
                    options={filteredBreeds.map((breed) => ({
                        value: breed.id,
                        label: breed.title
                    }))}
                    disabled={!animalViewId}
                />

                <TextArea
                    value={distinctiveFeatures}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDistinctiveFeatures(e.target.value)}
                    autoSize={{ minRows: 3, maxRows: 3 }}
                    placeholder="Особенности и приметы"
                />

                <Input
                    value={weight}
                    min={0.1}
                    max={100}
                    inputMode="numeric"
                    type="number"
                    step="any"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const value = parseFloat(e.target.value);
                        if (!isNaN(value)) {
                            setWeight(value);
                        }
                    }}
                    placeholder="Вес животного"
                />

                <div style={{ margin: '16px 0' }}>
                    {photos ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{ position: 'relative', width: '100%', height: 200 }}>
                                <img
                                    src={`https://localhost:7230${photos}`}
                                    alt="Фото животного"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: 8
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <Upload
                                    accept="image/*"
                                    showUploadList={false}
                                    beforeUpload={handleUpload}
                                    disabled={uploading}
                                >
                                    <Button icon={<UploadOutlined />}>Заменить фото</Button>
                                </Upload>
                                <Button
                                    danger
                                    onClick={handleRemovePhoto}
                                    icon={<DeleteOutlined />}
                                >
                                    Удалить фото
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Upload
                            accept="image/*"
                            showUploadList={false}
                            beforeUpload={handleUpload}
                            disabled={uploading}
                        >
                            <Button icon={<UploadOutlined />} loading={uploading}>
                                Загрузить фото
                            </Button>
                        </Upload>
                    )}
                </div>

                <Select
                    value={animalStatusId}
                    onChange={(value: string) => setAnimalStatusId(value)}
                    placeholder="Выберите статус животного"
                    style={{ width: '100%' }}
                    options={animalStatuses.map((status) => ({
                        value: status.id,
                        label: status.title
                    }))}
                />
            </div>
        </Modal>
    )
};