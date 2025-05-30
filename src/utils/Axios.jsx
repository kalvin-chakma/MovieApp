import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTI1ZTk5MGEwYmQ2Yjc5MjU5YTFjMzA4NzBhOTRiNyIsIm5iZiI6MTcyNDI3OTI2MS42MzcxMSwic3ViIjoiNjZjMzU4YTA0NmRjOTI3YzdkZDBlNjNhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.GmLGRXJtZ2bRnOZ0GM9-Aw6MQrHLOqevCZVvPfe8yHU",
  },
});

export default instance;
