/*src/utils/imageCache.ts*/

export const imageCache = new Map<string, HTMLImageElement>();

export const cacheImage = (url: string): Promise<void> => {
    
    if(imageCache.has(url)){
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        
        const img = new Image();
        img.src = url;

        img.onload = () => {

            if (imageCache.size > 30) {

                const firstKey = imageCache.keys().next().value;

                if(firstKey) {
                    imageCache.delete(firstKey);
                };
            };

            imageCache.set(url, img);
            resolve();
        };

        img.onerror = () => reject();
    })
}