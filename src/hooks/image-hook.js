export const fetchImage = async (filePath) => {
    const res = await fetch(
        `/api/img?filePath=${filePath}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )

    const pic = await res.blob()
    

    return URL.createObjectURL(pic);
}

export const uploadImage = async (file, path) => {
    try {
    // Create a FormData object
        const formData = new FormData();

        // Append the file and the additional field
        formData.append('image', file); // Append the file with the key 'image'
        formData.append('file_path', path); // Append the file path with the key 'file_path'   

        // Send the POST request
        const response = await fetch('/api/img/upload', {
            method: 'POST',
            body: formData, // Send the FormData object as the request body
        });
    
        if (!response.ok) {
            throw new Error('Failed to upload image');
        }
    
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error in uploadImage function:', error);
        throw error;
    }
};

export const deleteImage = async (filePath, imageName) => {
    try {
        //Send a DELETE request to the API to remove the image
        const res = await fetch('/api/img/delete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // Ensure that you're sending JSON
            },
            body: JSON.stringify({
                filePath,    // Pass the file path of the image
                imageName,   // Pass the image name
            }),
        });

        if (!res.ok) {
            throw new Error('Failed to delete image');
        }

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error in deleteImage function:', error);
        throw error;
    }
};

export const updateImage = async (file, filePath) => {
    try {
      // Create a FormData object to store the file
        const formData = new FormData();
        formData.append('image', file); // Append the image file

        // Make the API request to update the image
        const response = await fetch(`/api/img/update?filePath=${filePath}`, {
            method: 'POST',
            body: formData, // Send the form data with the file
        });

        if (!response.ok) {
            throw new Error('Failed to update image');
        }

        const result = await response.json(); // Get the updated image details or confirmation
        return result;
    } catch (error) {
        console.error('Error in updateImage function:', error);
        throw error;
    }
};