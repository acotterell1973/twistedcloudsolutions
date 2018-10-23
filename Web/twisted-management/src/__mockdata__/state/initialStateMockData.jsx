import assistantsMockData from "./assistantsMockData";
import { navigationDetail } from "./navigationDetail";
import Chance from 'chance';

        let chance = new Chance();
        let z = chance.zip();
        
const initialStateMockData = {
    applicationSettings: {
        pageSize: 10
    },
    navigationDetail: { ...navigationDetail },
    assistants: [...assistantsMockData.assistants]
}

export default initialStateMockData;