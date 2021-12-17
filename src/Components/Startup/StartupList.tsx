import { ReactElement, useEffect, useState } from "react";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import { Startup } from "../../Types/Startup";

export default function StartupList(): ReactElement {
  const [data, setData] = useState<Startup[]>([]);

  useEffect(()=> {
    StartupHttpService.getStartups().then(response => {
      setData(response);
    }).catch(reason => {
      console.log(reason.response.data);
    });
  }, []);
  
  return (
    <ul>
      {
        data.map(item => <li key={item.id}>{item.name}</li>)
      }
    </ul>
  );
}
