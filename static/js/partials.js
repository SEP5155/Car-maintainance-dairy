document.addEventListener('partialsLoaded', async ()=> {
    try {
        const sortingModule = await import("./sorting");
    } catch (error) {
        console.error("error loading module:", error);
    }
    
})