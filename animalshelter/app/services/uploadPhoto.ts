import axios from 'axios';

export const uploadPhoto = async (file: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post<{ filePath: string }>(
            'https://localhost:7230/api/UploadPhoto/upload-photo',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response.data.filePath;
    } catch (error: any) {
        console.error('Ошибка загрузки фото:', error);
        throw error;
    }
}; 