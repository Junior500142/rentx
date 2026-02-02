import "reflect-metadata";
import "./infra/container";
import { app } from "./infra/http/app";

app.listen(3333, () => {
  console.log("🚀 Server is running on http://localhost:3333");
});