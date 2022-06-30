//Creates routes for different pages of the website
//https://stackoverflow.com/questions/51977355/loading-different-pages-while-keeping-the-same-header
app.get('/', (request, response) => {
    response.sendFile(path.join(initial_path, 'index.html'));
})

app.get('/journal', (request, response) => {
    response.sendFile(path.join(initial_path, 'index.html'));
})

app.get('/aboutus', (request, response) => {
    response.sendFile(path.join(initial_path, 'index.html'));
})

app.get('/resources', (request, response) => {
    response.sendFile(path.join(initial_path, 'index.html'));
})

app.listen("5500", () => {
    console.log("listening...");
})
