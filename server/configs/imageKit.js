// import ImageKit from "imagekit";
import 'dotenv/config';
import { Blob } from 'node:buffer';

const urlEndpoint = process.env.IMAGEKIT_URI_ENDPOINT || process.env.IMAGEKIT_URL_ENDPOINT;
const imagekitId = process.env.IMAGEKIT_ID || urlEndpoint?.split('/').filter(Boolean).pop();
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

const getFilePath = (response) => {
    if (response.filePath) return response.filePath;
    if (response.name) return `/${response.name}`;
    if (response.url) {
        const parsedUrl = new URL(response.url);
        return parsedUrl.pathname.replace(`/${imagekitId}`, '');
    }
    return '';
};

const assertImageKitConfig = () => {
    const missingKeys = [];

    if (!urlEndpoint) missingKeys.push('IMAGEKIT_URI_ENDPOINT');
    if (!privateKey) missingKeys.push('IMAGEKIT_PRIVATE_KEY');

    if (missingKeys.length) {
        throw new Error(`Missing ImageKit config: ${missingKeys.join(', ')}`);
    }
};

const toLegacyTransform = (transformation = []) => {
    return transformation.reduce((acc, item) => {
        if (item.width) acc.WIDTH = item.width;
        if (item.height) acc.HEIGHT = item.height;
        if (item.quality && item.quality !== 'auto') acc.QUALITY = item.quality;
        if (item.format) acc.FORMAT = item.format;
        return acc;
    }, {});
};

const getTransformPath = (transformation = []) => {
    const transform = toLegacyTransform(transformation);
    const parts = [];

    if (transform.FORMAT) parts.push(`f-${transform.FORMAT}`);
    if (transform.WIDTH) parts.push(`w-${transform.WIDTH}`);
    if (transform.HEIGHT) parts.push(`h-${transform.HEIGHT}`);
    if (transform.QUALITY) parts.push(`q-${transform.QUALITY}`);

    return parts.length ? `/tr:${parts.join(',')}` : '';
};

const imagekit = {
    upload: async ({ file, fileName, folder }) => {
        assertImageKitConfig();

        const formData = new FormData();
        formData.append('file', new Blob([file]), fileName);
        formData.append('fileName', fileName);
        formData.append('folder', folder || '/');
        formData.append('useUniqueFileName', 'true');

        const uploadResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`${privateKey}:`).toString('base64')}`,
            },
            body: formData,
        });

        const responseText = await uploadResponse.text();
        let response;

        try {
            response = JSON.parse(responseText);
        } catch {
            throw new Error(`ImageKit upload failed with a non-JSON response (${uploadResponse.status})`);
        }

        if (!uploadResponse.ok) {
            throw new Error(response?.message || response?.error?.message || 'ImageKit upload failed');
        }

        return {
            ...response,
            filePath: getFilePath(response),
        };
    },
    url: ({ path, transformation }) => {
        const filePath = path?.replace(/^\/+/, '') || '';
        return `${urlEndpoint}${getTransformPath(transformation)}/${filePath}`;
    },
};

export default imagekit
