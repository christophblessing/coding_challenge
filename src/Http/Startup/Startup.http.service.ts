import axios from "axios";
import { Startup, StartupDTO } from "../../Types/Startup";
import StartupMapper from "./Startup.mapper";

export class StartupHttpService {

  public static async getStartups(): Promise<Startup[]> {
    const response = await axios.get<StartupDTO[]>(`/api/startups`);
    const startups = response.data.map(item => StartupMapper.map(item));
    return startups;
  }

  public static async getStartupById(id: string | number): Promise<Startup> {
    const response = await axios.get<StartupDTO>(`/api/startups/${id}`);
    return StartupMapper.map(response.data);
  }
}
