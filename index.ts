import http from 'http';
import routes from "./routes";

routes.listen(3000, () => {
    console.log(`Server running at http://localhost:3000/`);
});