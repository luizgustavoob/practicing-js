const app = require("./src/server")
const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})