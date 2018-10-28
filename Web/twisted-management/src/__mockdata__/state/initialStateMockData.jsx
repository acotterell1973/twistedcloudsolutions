import assistantsMockData from "./assistantsMockData";
import { navigationDetail } from "./navigationDetail";

const initialStateMockData = {
    navigationDetail: { ...navigationDetail },
    assistants: [...assistantsMockData.assistants]
}

export default initialStateMockData;